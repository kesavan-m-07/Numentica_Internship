import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
  field,
  label,
  minDate,
  maxDate,
  minTime,
  maxTime,
  difference,
}) => {
  return (
    <div className="flex-1">
      <label className="block text-xs font-medium text-gray-700 mb-1 relative">
        {label}
        {difference && (
          <span className="absolute bottom-0 right-2 text-[8px] sm:text-[10px] text-blue-500">
            {difference.days} day, {difference.hours} hrs
          </span>
        )}
      </label>
      <DatePicker
        selected={field.value}
        onChange={(newDate)=>field.onChange(newDate)}
        showIcon
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={17}
            fill="none"
          >
            <path
              fill="#000"
              d="M13.75 1.25h-1.875V.625a.625.625 0 1 0-1.25 0v.625h-6.25V.625a.625.625 0 0 0-1.25 0v.625H1.25A1.25 1.25 0 0 0 0 2.5V15a1.25 1.25 0 0 0 1.25 1.25h12.5A1.25 1.25 0 0 0 15 15V2.5a1.25 1.25 0 0 0-1.25-1.25ZM3.125 2.5v.625a.625.625 0 0 0 1.25 0V2.5h6.25v.625a.625.625 0 1 0 1.25 0V2.5h1.875V5H1.25V2.5h1.875ZM13.75 15H1.25V6.25h12.5V15ZM8.437 9.062a.937.937 0 1 1-1.874 0 .937.937 0 0 1 1.875 0Zm3.438 0a.938.938 0 1 1-1.875 0 .938.938 0 0 1 1.875 0ZM5 12.188a.937.937 0 1 1-1.874 0 .937.937 0 0 1 1.874 0Zm3.438 0a.937.937 0 1 1-1.875 0 .937.937 0 0 1 1.875 0Zm3.437 0a.937.937 0 1 1-1.875 0 .937.937 0 0 1 1.875 0Z"
            />
          </svg>
        }
        showTimeSelect
        timeIntervals={15}
        dateFormat="Pp"
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime}
        className="w-full rounded-lg text-sm ml-[2px] outline-none border border-gray-300"
        wrapperClassName="w-full"
        popperPlacement="bottom-start"
      />
    </div>
  );
};

export default CustomDatePicker;
