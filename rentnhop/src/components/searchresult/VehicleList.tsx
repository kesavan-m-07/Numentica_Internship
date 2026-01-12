import React from 'react'
import VehicleCard from './VehicleCard'
import { Bike } from '../../types';

interface VehicleListProps {
  vehicleList: Bike[];
}

const VehicleList: React.FC<VehicleListProps> = ({vehicleList}) => {
  if(!vehicleList)return null;

  return (
    <>
        <h2 className='text-xl p-2 tracking-wider text-gray-500 '>Showing {vehicleList.length} vehicle</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {
                vehicleList?.map((vehicle)=>(
                    <VehicleCard key={JSON.stringify(vehicle)} vehicle={vehicle} selectedAreaOfBike={vehicle.selectedArea}/>
                ))
            }
        </div>
    </>
  )
}

export default VehicleList
