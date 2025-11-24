import React from 'react'

const socialLinks = [
{ hyperLink: "/", svgPath: "/facebook.svg" },
{ hyperLink: "/", svgPath: "/insta.svg" },
{ hyperLink: "/", svgPath: "/lin.svg" },
{ hyperLink: "/", svgPath: "/youtube.svg" },
];
const SocialLinksLoader = () => {
  return (
    <div className="flex justify-around mt-5 items-center  md:w-3/2 lg:w-full flex-wrap">
        {socialLinks?.map((link, i) => (
          <a key={i} href={link.hyperLink}>
            <img  src={link.svgPath} alt="social Images" className="w-7 h-7"/>
          </a>
        ))}
        <div>
            <p className="text-xs">Call us at</p>
            <p className="font-semibold">+91 981-862</p>
        </div>
      </div>
  )
}

export default SocialLinksLoader
