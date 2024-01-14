import React, { useState } from 'react';
import { IoMdCall } from 'react-icons/io';
import { MdOutlineContactPhone, MdEmail } from 'react-icons/md';
import { TbWorldWww } from 'react-icons/tb';
import { Tooltip } from '@mui/material';
import './contact.css';
import 'swiper/css';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Link from 'next/link';
export default function ReferencesBooks({ data }: { data: any }) {
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
  return (
    <>
          <div ref={sliderRef} className="keen-slider grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {data.map((file: any, index: number) => (
             <div
             key={index}
             className={`keen-slider__slide testimonialCard ${
               active === index && "activeStyle"
             } `}
              >
                  <Link  href={`${file.fileUrl}`}>
        <div className="notebook" key={index}>
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <div className="text-lg right-0 top-0 justify-items-end">
              <MdOutlineContactPhone />
            </div>
          </div>
          {/* <div className="ribbon"></div> */}
          <div className="wrapper">
            <h1 className="text-md">{file.fileName}</h1>
            {/* <p className="justify-center text-center">{'description'}</p> */}
            <span
              className={`flex items-center gap-1 text-sm font-medium absolute inset-x-0 bottom-0 justify-center dark:text-white pb-3`}
            >
              {/* <div className="flex items-center justify-center gap-3.5 pt-4">
                <Tooltip title={'email'}>
                  <div className="text-2xl">
                    <MdEmail />
                  </div>
                </Tooltip>
                <Tooltip title={'Phone'}>
                  <button
                    className="GenerateQuote_next hover:text-secondary text-xl"
                    placeholder="Edit"
                  >
                    <div className="text-2xl">
                      <IoMdCall />
                    </div>
                  </button>
                </Tooltip>
                <Tooltip title={'website'}>
                  <button
                    className="GenerateQuote_next hover:text-secondary text-xl"
                    placeholder="Edit"
                  >
                    <div className="text-2xl">
                      <TbWorldWww />
                    </div>
                  </button>
                </Tooltip>
              </div> */}
            </span>
          </div>
                      </div>
                  </Link>
                      
              </div>
             
              
          ))}
                   </div>
    </>
  );
}
