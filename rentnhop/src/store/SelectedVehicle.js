export const selectedVehicle = (set,get)=>({
    selectedVehicle : null,
    setVehicle : (vehicle)=>set({selectedVehicle:vehicle}),
    removeVehicle : ()=>({vehicle:null})
})