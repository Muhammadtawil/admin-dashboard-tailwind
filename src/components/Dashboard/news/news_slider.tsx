'use client'
import NewsCards from './newsCards'
import 'swiper/css';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { useState } from 'react';


export default function NewsSlider({data,handleEditClick}:{data:any,handleEditClick:any}) {
    const [active, setActive] = useState(1);

    const [sliderRef] = useKeenSlider({
        mode: "free-snap",
        breakpoints: {
          "(max-width:991px)": {
            slides: {
              origin: 0,
              perView: 1.6,
              spacing: 25,
            },
          },
          "(max-width:767px)": {
            slides: {
              origin: 0,
              perView: 1.3,
              spacing: 10,
            },
          },
          "(max-width:450px)": {
            slides: {
              origin: 0,
              perView: 1,
              spacing: 0,
            },
          },
        },
        slides: {
          origin: 0,
          perView: 2.4,
          spacing: 25,
        },
        detailsChanged: (s:any) => {
          setActive(s?.track?.details?.abs);
        },
    });
    
    const filteredData = data.filter((item: any) => item.isFlag === true);
  return (
    <div ref={sliderRef} className="keen-slider grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
         
     
    {filteredData.map((item:any, key:any) => (
     <div
     key={key}
     className={`keen-slider__slide testimonialCard ${
       active === key && "activeStyle"
     } `}
   >
        <div className="d-flex gap-2 align-items-center">

                <NewsCards title={item.newsCategory} total={item.newsTitle} rate={item.newsStatus} levelUp key={key} image={item.newsImageUrl} >
                <button className="hover:text-primary" onClick={() => handleEditClick(item)}>
<svg
className="fill-primary dark:fill-white"
width="22"
height="16"
viewBox="0 0 22 16"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
  fill=""
/>
<path
  d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
  fill=""
/>
                    </svg>
                    </button>
                
</NewsCards>
</div>  
   </div>
            
))}
      
    </div>
  )
}
