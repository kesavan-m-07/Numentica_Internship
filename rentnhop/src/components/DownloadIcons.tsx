import React from "react";

const DownloadIcons = () => {
  return (
    <div className="flex flex-row gap-4  flex-wrap">

      <div className="flex items-center justify-center gap-3 border border-black rounded-lg px-3 py-2 w-[140px] h-[55px] hover:bg-gray-100 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            fill="#242424"
            d="M16.697 17.339 2.541 25.385c-.635.36-1.217.42-1.663.228l12.046-12.048 3.773 3.774Zm-4.48-4.48L.184 24.893A2.416 2.416 0 0 1 0 23.917V1.802c0-.381.066-.71.184-.977l12.033 12.033Zm9.825-1.443c1.397.794 1.397 2.094 0 2.889L17.6 16.827l-3.97-3.969 3.968-3.967 4.444 2.525ZM.879.106c.446-.19 1.028-.13 1.662.23l14.155 8.042-3.772 3.773L.879.106Z"
          />
        </svg>
        <p className="text-sm leading-tight">
          <span className="text-xs block">Download on the</span>
          <span className="font-semibold">App Store</span>
        </p>
      </div>


      <div className="flex items-center justify-center gap-3 border border-black rounded-lg px-3 py-2 w-[140px] h-[55px] hover:bg-gray-100 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={22}
          fill="none"
        >
          <path
            fill="#242424"
            d="M14.797 11.58a4.989 4.989 0 0 1 2.357-4.152 5.128 5.128 0 0 0-3.991-2.157C11.483 5.094 9.856 6.275 9 6.275c-.872 0-2.19-.987-3.609-.958A5.359 5.359 0 0 0 .918 8.045c-1.934 3.349-.491 8.27 1.362 10.976.926 1.326 2.01 2.806 3.427 2.754 1.387-.058 1.905-.885 3.58-.885 1.658 0 2.144.885 3.59.851 1.489-.024 2.427-1.331 3.321-2.669a10.96 10.96 0 0 0 1.519-3.092 4.825 4.825 0 0 1-2.92-4.4ZM12.066 3.49A4.872 4.872 0 0 0 13.18 0a4.957 4.957 0 0 0-3.207 1.66A4.678 4.678 0 0 0 8.829 5.02a4.147 4.147 0 0 0 3.237-1.53Z"
          />
        </svg>
        <p className="text-sm leading-tight">
          <span className="text-xs block">GET IT ON</span>
          <span className="font-semibold">Google Play</span>
        </p>
      </div>
    </div>
  );
};

export default DownloadIcons;
