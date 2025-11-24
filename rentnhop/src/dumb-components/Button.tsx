import React from 'react'

interface ButtonProps {
  label: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({label,disabled}) => {
  return (
     <button
            type="submit"
            disabled = {disabled}
            className={`mx-auto block mt-5 ${disabled ? 'bg-gray-400 cursor-not-allowed' :  'bg-blue-600 hover:bg-blue-700 cursor-pointer'} w-1/2 text-white py-2 rounded-3xl font-semibold  transition `}
          >
            {label}
          </button>
  )
}

export default Button
