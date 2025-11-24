import {
  databases,
  userCartId,
  databaseId,
} from '../appwrite/AppWriteAccount';
import { Query } from "appwrite";
import { Bike, BikeInstance, BikeAreaSummary } from "../types";

interface BikesInfoResponse {
  rows: BikeInstance[];
}

export const combineMultipleInstances = (bikesInfo: BikesInfoResponse | null): { [key: string]: BikeInstance[] } => {
  const combinedBikes: { [key: string]: BikeInstance[] } = {};
  if (bikesInfo && bikesInfo.rows) {
    bikesInfo.rows.forEach((bike: BikeInstance) => {
      if (!combinedBikes[bike.bike_slug]) {
        combinedBikes[bike.bike_slug] = [];
      }
      combinedBikes[bike.bike_slug].push(bike);
    });
  }

  return combinedBikes;
};

interface BikeDetailsResponse {
  rows: Bike[];
}

export const attachBikeDetailsWithBike = (combinedBikes: { [key: string]: BikeInstance[] }, bikesDetail: BikeDetailsResponse | null): Bike[] => {
  if (!bikesDetail?.rows) return [];

  const bikeDetailsAttached = bikesDetail.rows.map((bikeInfo) => {
    return {
      ...bikeInfo,
      instances: summarizeByArea(combinedBikes[bikeInfo.slug]) || {},
    };
  });

  return bikeDetailsAttached;
};

export const summarizeByArea = (instances: BikeInstance[]): { [areaSlug: string]: BikeAreaSummary } => {
  if (!instances) return {};
  return instances.reduce((acc: { [areaSlug: string]: BikeAreaSummary }, curr: BikeInstance) => {
    const { area_slug, pricePerDay } = curr;

    if (!acc[area_slug]) {
      acc[area_slug] = {
        lowestInstance: curr,
        highestInstance: curr,
        vehicleCount: 1,
      };
    } else {
      acc[area_slug].lowestInstance =
        acc[area_slug].lowestInstance.pricePerDay <= pricePerDay
          ? acc[area_slug].lowestInstance
          : curr;

      acc[area_slug].highestInstance =
        acc[area_slug].highestInstance.pricePerDay >= pricePerDay
          ? acc[area_slug].highestInstance
          : curr;

      acc[area_slug].vehicleCount += 1;
    }

    return acc;
  }, {});
};

interface BikeFilters {
  makers: string[];
  categories: string[];
  locations: string[];
  sortSelected: string;
}

export const applyFilters = (filters: BikeFilters, fullBikesInfo: Bike[]) => {
  const filteredBikes = fullBikesInfo
    .map((bike) => {
      const isMakerMatch =
        filters.makers.length === 0 || (bike.maker && filters.makers.includes(bike.maker));

      const isCategoryMatch =
        filters.categories.length === 0 ||
        (bike.category && filters.categories.includes(bike.category));

      const instances = bike.instances || {};
      const matchingAreas = Object.keys(instances).filter((loc) =>
        filters.locations.includes(loc)
      );

      const isLocationMatched =
        filters.locations.length === 0 || matchingAreas.length > 0;

      const selectedArea = matchingAreas[0] || Object.keys(instances)[0];

      return isMakerMatch && isCategoryMatch && isLocationMatched
        ? { ...bike, selectedArea }
        : null;
    })
    .filter(Boolean) as Bike[];
  return sort(filters.sortSelected, filteredBikes, filters.locations);
};

const sort = (sortValue = "hotseller", bikesToSort: Bike[] = [], locations: string[] = []) => {
   if (!Array.isArray(bikesToSort)) return [];

  const bikes = [...bikesToSort];

  if (sortValue === "hotseller") {
    return bikes.sort((a, b) => {
      const aTags = JSON.parse(
        a?.instances[a?.selectedArea]?.highestInstance?.tags || "[]"
      );
      const bTags = JSON.parse(
        b?.instances[b.selectedArea]?.highestInstance?.tags || "[]"
      );

      const isHotellerA = aTags.includes("hoteller");
      const isHotellerB = bTags.includes("hoteller");

      if (isHotellerA && !isHotellerB) return -1;
      if (!isHotellerA && isHotellerB) return 1;
      return 0;
    });
  }

  if (sortValue === "price-LtH") {
    const getMinPrice = (bike:Bike) => {
      const prices = Object.entries(bike?.instances)
        .filter(([area]) => locations.length === 0 || locations.includes(area))
        .map(([_, val]) => val.lowestInstance?.pricePerDay ?? Infinity);
      return Math.min(...prices);
    };

    return bikes.sort((a, b) => getMinPrice(a) - getMinPrice(b));
  }

  if (sortValue === "price-HtL") {
    const getMaxPrice = (bike:Bike) => {
      const prices = Object.entries(bike?.instances)
        .filter(([area]) => locations.length === 0 || locations.includes(area))
        .map(([_, val]) => val.highestInstance?.pricePerDay ?? 0);
      return Math.max(...prices);
    };

    return bikes.sort((a, b) => getMaxPrice(b) - getMaxPrice(a));
  }

  return bikes;
};

interface CityDataResponse {
  rows: Array<{
    areas: string[];
    [key: string]: unknown;
  }>;
}

export const extractLabel = (cityData: CityDataResponse) => {
  return cityData.rows[0].areas.map((area: string) => ({
    value: area,
    label: area
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" "),
  }));
};

import { User, Vehicle } from "../types";

export const getUserCart = async (user: User) => {
  return await databases.listRows(
    databaseId,
    userCartId,
    [Query.equal("userId", user.$id)]
  );
};

export const parseJsonCart = (items: unknown[]): Vehicle[] =>
  Array.isArray(items)
    ? items
        .map((i) => {
          try {
            return typeof i === "string" ? JSON.parse(i) : i;
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    : [];

export const findCartEntry = (list: Vehicle[], target: Vehicle) =>
  list.find(
    (i) =>
      i.areaSlug === target.areaSlug &&
      i.bikeSlug === target.bikeSlug &&
      Array.isArray(i.pickupDate) &&
      Array.isArray(target.pickupDate) &&
      i.pickupDate.join() === target.pickupDate.join()
  );
