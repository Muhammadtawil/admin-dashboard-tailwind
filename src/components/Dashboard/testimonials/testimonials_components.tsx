"use client"

import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation";
import getTestimonialsData from "./testimonials_data";
import Image from "next/image";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { MdEdit } from "react-icons/md";
import { Tooltip } from "@mui/material";


export default function TestimonialsComponent() {
    const testimonialData = getTestimonialsData();
    const testimonialsPerPage = 4; // Set the number of testimonials per page
    const [currentPage, setCurrentPage] = useState(1);
    const path = usePathname();
    const arabic = path.includes('ar')
    const t = useTranslations('webTestimonials')
    // Calculate the start and end index of testimonials to display on the current page
    const startIndex = (currentPage - 1) * testimonialsPerPage;
    const endIndex = startIndex + testimonialsPerPage;

    const visibleTestimonials = testimonialData?.testimonials?.slice(startIndex, endIndex) || [];

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil((testimonialData?.testimonials?.length || 0) / testimonialsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };


    return (
        <>
            <Breadcrumb pageName="Testimonial" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                    <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                        Our Testimonials
                    </h4>
                    {/* <FormHead
            handleClickOpen={addForm}
            title={t('CreateBlog')}
        /> */}
                </div>
                <div className="grid grid-cols-2 gap-2  max-sm:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-2">
                    {visibleTestimonials?.map((data, index) => (
                        <>

                            <div className="  overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                                <div className="relative z-20 h-35 md:h-65">
                                    <Image
                                        src={"/images/cover/cover-01.png"}
                                        alt="profile cover"
                                        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                                        width={970}
                                        height={260}
                                    />

                                </div>


                                <p
                                    className={`pt-4 inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${data.status === 'deployed'
                                        ? "text-success bg-success pt-2"
                                        : data.status === 'draft'
                                            ? "text-danger bg-danger pt-2"
                                            : "text-warning bg-warning"
                                        }`}
                                >
                                    {data.status}
                                </p>

                                <div className="top-0 right-0 relative">
                                 
                                    <div className="absolute text-xl right-1 top-0">
                                    <Tooltip title={'Edit'}>
                                    <button
                                        className='GenerateQuote_next'
                                        // placeholder="Edit"
                                    // onClick={copyToClipboard}
                                    >
                                        <MdEdit />
                                    </button>
                                        
</Tooltip>
                          
                                    </div>
                                </div>

                                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">

                                    <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">

                                        <div className="relative drop-shadow-2">
                                            <Image
                                                className="rounded-full"
                                                src={data.image}
                                                width={160}
                                                height={160}
                                                alt="profile"
                                            />
                                            <label
                                                htmlFor="profile"
                                                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                                            >
                                                <svg
                                                    className="fill-current"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                                                        fill=""
                                                    />
                                                </svg>
                                                <input
                                                    type="file"
                                                    name="profile"
                                                    id="profile"
                                                    className="sr-only"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                                            {data.name}
                                        </h3>
                                        <p className="font-medium">{data.position}</p>


                                        <div className="mx-auto max-w-180">

                                            <p className="mt-4.5">
                                                {data.message}
                                            </p>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </>
                    ))}

                </div>
                <div className="flex p-4 justify-center items-center">
                    <button
                        onClick={handlePrevPage}
                        className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-white bg-body border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <svg
                            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-body border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        Next
                        <svg
                            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>
        </>

    )
}
