import React from 'react'

const FloatingLabel = ({label,id}) => {
  return (
    <label
            htmlFor={id}
            className="
      absolute left-3 text-gray-500 text-sm cursor-pointer
      transition-all duration-200 ease-in-out
      peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
      peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-white peer-focus:text-blue-600
      peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:text-xs
    "
          >
            {label}
          </label>
  )
}

export default FloatingLabel