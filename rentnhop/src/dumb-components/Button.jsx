import React from 'react'

const Button = ({label}) => {
  return (
     <button
            type="submit"
            className="mx-auto block mt-5 bg-blue-600 w-1/2 text-white py-2 rounded-3xl font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            {label}
          </button>
  )
}

export default Button