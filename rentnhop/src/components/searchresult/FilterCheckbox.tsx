import React from "react";
import { useFormContext } from "react-hook-form";

interface FilterCheckboxProps {
  label: string;
  type: string;
  value: string;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  label,
  type,
  value,
}) => {
  const { register } = useFormContext();
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={value}
        {...register(`${type}`)}
        value={value}
        className="appearance-none w-4 h-4 border border-gray-400 rounded-sm checked:bg-blue-600 checked:border-blue-600 relative
               before:absolute before:inset-0 before:flex before:items-center before:justify-center before:content-['✔'] before:text-[10px] before:text-white before:opacity-0 checked:before:opacity-100 transition"
      />
      <label
        htmlFor={value}
        className="text-gray-800 cursor-pointer lg:font-light lg:text-sm w-[90%] overflow-hidden text-ellipsis"
      >
        {label}
      </label>
    </div>
  );
};

export default FilterCheckbox;
