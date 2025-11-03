export const combineMultipleInstances = (bikesInfo) => {
  const combinedBikes = {};
  bikesInfo.rows.forEach((bike) => {
    if (!combinedBikes[bike.bike_slug]) {
      combinedBikes[bike.bike_slug] = [];
    }
    combinedBikes[bike.bike_slug].push(bike);
  });

  return combinedBikes;
};

export const attachBikeDetailsWithBike = (combinedBikes, bikesDetail) => {
  if (!bikesDetail?.rows) return [];

  const bikeDetailsAttached = bikesDetail.rows.map((bikeInfo) => {
    return {
      ...bikeInfo,
      instances: summarizeByArea(combinedBikes[bikeInfo.slug]) || {},
    };
  });

  return bikeDetailsAttached;
};

export const summarizeByArea = (instances) => {
  return instances.reduce((acc, curr) => {
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

export const applyFilters = (filters, fullBikesInfo) => {
  const filteredBikes = fullBikesInfo
    .map((bike) => {
      const isMakerMatch =
        filters.makers.length === 0 || filters.makers.includes(bike.maker);

      const isCategoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(bike.category);

      const matchingAreas = Object.keys(bike.instances).filter((loc) =>
        filters.locations.includes(loc)
      );

      const isLocationMatched =
        filters.locations.length === 0 || matchingAreas.length > 0;

      const selectedArea = matchingAreas[0] || Object.keys(bike.instances)[0];

      return isMakerMatch && isCategoryMatch && isLocationMatched
        ? { ...bike, selectedArea }
        : null;
    })
    .filter(Boolean);
  return sort(filters.sortSelected, filteredBikes,filters.locations);
};

const sort = (sortValue = "hotseller", bikesToSort = [], locations = []) => {
  if (!Array.isArray(bikesToSort)) return [];

  const bikes = [...bikesToSort];


  if (sortValue === "hotseller") {
    return bikes.sort((a, b) => {
      const aTags = JSON.parse(a.instances[a.selectedArea]?.highestInstance?.tags || "[]");
      const bTags = JSON.parse(b.instances[b.selectedArea]?.highestInstance?.tags || "[]");

      const isHotellerA = aTags.includes("hoteller");
      const isHotellerB = bTags.includes("hoteller");


      if (isHotellerA && !isHotellerB) return -1;
      if (!isHotellerA && isHotellerB) return 1;
      return 0;
    });
  }


  if (sortValue === "price-LtH") {
    const getMinPrice = (bike) => {
      const prices = Object.entries(bike.instances)
        .filter(([area]) => locations.length === 0 || locations.includes(area))
        .map(([_, val]) => val.lowestInstance?.pricePerDay ?? Infinity);
      return Math.min(...prices);
    };

    return bikes.sort((a, b) => getMinPrice(a) - getMinPrice(b));
  }


  if (sortValue === "price-HtL") {
    const getMaxPrice = (bike) => {
      const prices = Object.entries(bike.instances)
        .filter(([area]) => locations.length === 0 || locations.includes(area))
        .map(([_, val]) => val.highestInstance?.pricePerDay ?? 0);
      return Math.max(...prices);
    };

    return bikes.sort((a, b) => getMaxPrice(b) - getMaxPrice(a));
  }

  return bikes;
};


export const extractLabel = (cityData) => {
  return cityData.rows[0].areas.map((area) => ({
    value: area,
    label: area
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" "),
  }));
};
