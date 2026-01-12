// Define interfaces for vehicle filter types
interface VehicleEntry {
  maker: string;
  category: string;
  areaKey: string;
  areaName: string;
  price: number;
  isHotSeller: boolean;
  ratings: number;
  [key: string]: unknown;
}

interface VehicleWithEntries {
  name: string;
  make: string;
  cetegory: string;
  entries: VehicleEntry[];
}

interface VehicleLocationData {
  displayName: string;
  vehicles: Array<{
    name: string;
    maker: string;
    category: string;
    [key: string]: unknown;
  }>;
}

interface VehicleLocationInfo {
  [areaKey: string]: VehicleLocationData;
}

interface AreaInfo {
  value: string;
  [key: string]: unknown;
}

interface FilterOptions {
  categories: string[];
  makers: string[];
  locations: string[];
  sortSelected: string;
}

interface CityData {
  [cityName: string]: unknown;
}

export const extractAllVehicle = (vehicleLocationInfo: VehicleLocationInfo, areaInfo: AreaInfo[]): VehicleWithEntries[] => {
  const areaKeys = areaInfo.map(info => info.value);
  const allVehiclesList: { [name: string]: VehicleEntry[] } = {};
  Object.entries(vehicleLocationInfo).forEach(([areaKey, vehicleData]) => {
    if (!areaKeys.includes(areaKey)) return;
    // const areaName = vehicleData.displayName; // Unused
    vehicleData.vehicles.forEach((vehicle) => {
      const { name, ...details } = vehicle;
      if (!allVehiclesList[name]) {
        allVehiclesList[name] = [];
      }
      allVehiclesList[name].push({ ...details, areaKey, areaName: vehicleData.displayName } as VehicleEntry);
    });
  });

  return Object.entries(allVehiclesList).map(([name, details]) => ({
    name,
    make: details[0]["maker"],
    cetegory: details[0]["category"],
    entries: details,
  }));
};

export const getAreaInfo = (cityName: string, allCityData: CityData) => {
  console.log(cityName, allCityData);
  return allCityData[cityName];
};

export const applyFilter = (filters: FilterOptions, allVehicles: VehicleWithEntries[]): VehicleWithEntries[] => {
  console.log("FIlters", filters);

  const filteredVehicles = allVehicles.filter((vehicle) => {
    const isCategoryMatched =
      filters["categories"].length === 0 ||
      filters.categories?.includes(vehicle.cetegory.toLowerCase());
    const isMakerMatched =
      filters["makers"].length === 0 ||
      filters["makers"].includes(vehicle.make.toLowerCase());
    const isLocationMatched =
      filters["locations"].length === 0 ||
      vehicle["entries"].some((entry) =>
        filters["locations"].includes(entry.areaKey.toLowerCase())
      );

    return isCategoryMatched && isMakerMatched && isLocationMatched;
  });

  return sort(filters.sortSelected, filteredVehicles);
};

export const sort = (option = "hotseller", vehiclesToSort: VehicleWithEntries[] = []): VehicleWithEntries[] => {
  // Create a copy so we don't mutate the original array
  const sorted = [...vehiclesToSort];

  switch (option) {
    case "hotseller":
      // Show hot sellers first — based on whether *any* of their entries isHotSeller
      sorted.sort((a, b) => {
        const aHot = a.entries.some((e) => e.isHotSeller);
        const bHot = b.entries.some((e) => e.isHotSeller);
        return Number(bHot) - Number(aHot); // true=1, false=0
      });
      break;

    case "priceLtH":
      // Sort by average/minimum price (Low to High)
      sorted.sort((a, b) => {
        const aMin = Math.min(...a.entries.map((e) => e.price));
        const bMin = Math.min(...b.entries.map((e) => e.price));
        return aMin - bMin;
      });
      break;

    case "priceHtL":
      // Sort by average/minimum price (High to Low)
      sorted.sort((a, b) => {
        const aMin = Math.min(...a.entries.map((e) => e.price));
        const bMin = Math.min(...b.entries.map((e) => e.price));
        return bMin - aMin;
      });
      break;

    case "ratings":
      // Sort by highest average rating
      sorted.sort((a, b) => {
        const aAvg =
          a.entries.reduce((sum: number, e) => sum + e.ratings, 0) / a.entries.length;
        const bAvg =
          b.entries.reduce((sum: number, e) => sum + e.ratings, 0) / b.entries.length;
        return bAvg - aAvg;
      });
      break;

    default:
      break;
  }

  return sorted;
};
