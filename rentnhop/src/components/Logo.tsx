import React from 'react'
import logo from '/logo.png'
import { useNavigate } from 'react-router'

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div
    onClick={()=>navigate('/')}
    className='flex justify-between items-center w-fit cursor-pointer'>
        <img src={logo} alt="Logo Image" loading='lazy' className='w-11 h-11 lg:w-16 lg:h-16'/>
        <div className=''>
            <p className='font-bold text-sm'>Rentnhop</p>
            <p className='text-[9px] lg:text-xs w-max'>Easy bike rentals</p>
        </div>
    </div>
  )
}

export default Logo
