/*
const vehicles = [
  { type: 'cycle', weightCapacity: 1},
  { type: 'bike', weightCapacity: 5 },
  { type: 'auto', weightCapacity: 20 },
  { type: 'ace', weightCapacity: 50 },
  { type: 'tempo', weightCapacity: 100 }
];
const parcels = [
  { location: 'velachery', weight: 30 },
  { location: 'madipakkam', weight: 17 },
  { location: 'sholinganallur', weight: 240 }
];
a. Calculate the minimum number of vehicles required to deliver the parcel for each location
b. Make the most of the weight that each vehicle can carry. There shouldn't be any wasted space in the vehicle
For example:
To deliver to velachery, we will require one auto and two bike (20 + 5(bike) + 5(bike)) = 30
We can deliver this in two auto (20 + 20) but 10 kg will be wasted in space
The logic is to find the minimum number of vehicles required to deliver the parcel without wasting space in vehicle
:+1:
2
*/

const vehicles = [
  { type: "cycle", weightCapacity: 1 },
  { type: "bike", weightCapacity: 5 },
  { type: "auto", weightCapacity: 20 },
  { type: "ace", weightCapacity: 50 },
  { type: "tempo", weightCapacity: 100 },
];
const parcels = [
  { location: "velachery", weight: 32.5 },
  { location: "madipakkam", weight: 17 },
  { location: "sholinganallur", weight: 1001 },
];

const findMinumumNumberOfVehiclesForDelivery = function (vehicles, parcels) {
  if (!Array.isArray(vehicles) || !Array.isArray(parcels)) {
    console.error("Invalid Inputs Given..");
    return;
  }

  const vehicleToWeightMap = []; //2D array to store the [vehicle,weightCapacity]

  vehicles.forEach((vehicle) => {
    const nameOfVehicle = vehicle["type"];
    const weightCapcity = vehicle["weightCapacity"];

    if (
      typeof nameOfVehicle !== "string" ||
      typeof weightCapcity !== "number" ||
      weightCapcity < 0
    ) {
      console.error("Invalid Data..");
      return;
    }

    const eachVehicle = [nameOfVehicle.trim().toLowerCase(), weightCapcity];
    vehicleToWeightMap.push(eachVehicle);
  });

  const sortedVehicleMap = vehicleToWeightMap.sort((a, b) => b[1] - a[1]); //This will sort the input data based on 1th index element (descending)

  const minimumVehicles = []; //To Store the final result

  parcels?.forEach((parcel) => {
    const deliveryLocation = parcel["location"];
    const weightOfParcel = parcel["weight"];

    if (
      //Check for invalid inputs
      typeof deliveryLocation !== "string" ||
      typeof weightOfParcel !== "number" ||
      weightOfParcel < 0
    ) {
      return;
    }
    const eachParcel = { deliveryLocation, weightOfParcel }; //Objects to store the parcel and vehicle details
    const vehicleDetails = {};
    let weightLeft = weightOfParcel;
    for (let vehicle of sortedVehicleMap) {
      if (weightLeft <= 0) break;

      const vehicleWeightCapacity = vehicle[1];
      const nameOfVehicle = vehicle[0];

      //To find the number of current vehicles needed
      const numberOfVehicleNeeded = Math.floor(
        weightLeft / vehicleWeightCapacity
      );

      //To caluclate the balance weight
      weightLeft = weightLeft % vehicleWeightCapacity;

      if (numberOfVehicleNeeded > 0) {
        vehicleDetails[nameOfVehicle] = numberOfVehicleNeeded;
      }
    }

    if (weightLeft > 0) {
      for (let i = sortedVehicleMap.length - 1; i >= 0; i--) {
        const currentElement = sortedVehicleMap[i];
        const vehicleCapacity = currentElement[1];
        const vehicleName = currentElement[0];
        if (vehicleCapacity > weightLeft) {
          vehicleDetails[vehicleName] = vehicleDetails[vehicleName] + 1 || 1;
          break;
        }
      }
    }

    //Add the vehicle details to the inner object
    eachParcel["minimumVehicleNeeded"] = vehicleDetails;
    minimumVehicles.push(eachParcel);
  });

  return minimumVehicles;
};

const minimumVehicles = findMinumumNumberOfVehiclesForDelivery(
  vehicles,
  parcels
);

if (Array.isArray(minimumVehicles)) {
  console.log(minimumVehicles);
}
