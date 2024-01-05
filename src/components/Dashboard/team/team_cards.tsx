
"use client"
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { getStatusTranslationKey } from '@/components/shared/tables';
import { useTranslations } from "next-intl";
import { MdEdit } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { useState } from "react";
import { BsTwitterX } from "react-icons/bs";

export default function TeamCards({ teamsData }: { teamsData: any }) {
    const MembersPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * MembersPerPage;
    const endIndex = startIndex + MembersPerPage
    const visibleServices = teamsData?.slice(startIndex, endIndex) || [];


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil((teamsData?.length || 0) / MembersPerPage);
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };


    const t = useTranslations('teamPage')
    return (
        <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">

            {visibleServices.map((member:any, index:any) => (
                <>
                      <motion.div
            initial={{ opacity: 1, y: 10 }}
            whileHover={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, delay: index % 2 !== 0 ? 0.2 : 0 },
            }}
            // viewport={{ once: true }}
            key={index}
            className="col"
          >
              
              <motion.div
              whileHover={{ y: -10, transition: { duration: 0.4 } }}
              className="blogCard hover:bg-boxdark "
                        >
                            <Card
                        key={index}
                shadow={false}
                className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center rounded-lg hover:bg-boxdark"
            >
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"

                    className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('/images/teambg1.jpg')] bg-cover bg-center hover:bg-boxdark"
            
                >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
                <div className="absolute top-5 left-1">
                <p
                                    className={`pt-4 inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${member.userRole === 'ADMIN'
                                        ? "text-success bg-success pt-2"
                                        : member.status === 'USER'
                                            ? "text-danger bg-danger pt-2"
                                            : "text-warning bg-warning"
                                        }`}
                                >
                                      {t(getStatusTranslationKey(member.userRole))}
                                </p>
                        </div>
                        <div className="absolute top-5 right-1">
                <p
                                    className={`pt-4 inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${member.isTeam === true
                                        ? "text-success bg-success pt-2"
                                        : member.status === false
                                            ? "text-danger bg-danger pt-2"
                                            : "text-warning bg-warning"
                                        }`}
                                >
                                  {member.isTeam == true ? t('yes') : t('no')}
                                </p>
                        </div>
                        <div className="top-0 right-0 relative">

<div className="absolute text-xl right-2 top-0">
    <Tooltip title={'Edit'}>
        <button
            className='GenerateQuote_next hover:text-secondary'
            placeholder="Edit"
        // onClick={copyToClipboard}
        >
            <MdEdit />
        </button>

    </Tooltip>

</div>
<div className="absolute text-xl right-2 top-8">
    <Tooltip title={'Delete'}>
        <button
            className='GenerateQuote_next hover:text-danger'
                                        placeholder="Delete"
                                     
        // onClick={copyToClipboard}
        >
            <RiDeleteBin6Line />
        </button>

    </Tooltip>

</div>
</div>
                <CardBody className="relative py-14 px-6 md:px-12">
               
       
                 
                    <Typography variant="h5" className="mb-4 text-gray-400 text-xlg  font-extrabold">
                        {member.userName}
                    </Typography>


                    <p


                        className="mb-6 font-normal text-sm leading-[1.5]"
                    >
                       {member.userPosition}
                    </p>
                    <Typography
                        variant="h2"
                        color="white"
                        className="mb-6 font-medium leading-[1.5]"
                    >
                        Joined in: 12/5/2023
                    </Typography>
                    <div className="relative drop-shadow-2">
              <Image
              className="rounded-full"
                src={member.userImgUrl}
                width={160}
                height={160}
                alt="profile"
              />
        
            </div>
                    <div className="flex items-center justify-center gap-3.5 pt-4">
                        <a
                            href="#"
                            className="hover:text-primary"
                            aria-label="social-icon"
                        >
                            <svg
                                className="fill-current"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_30_966)">
                                    <path
                                        d="M12.8333 12.375H15.125L16.0416 8.70838H12.8333V6.87504C12.8333 5.93088 12.8333 5.04171 14.6666 5.04171H16.0416V1.96171C15.7428 1.92229 14.6144 1.83337 13.4227 1.83337C10.934 1.83337 9.16663 3.35229 9.16663 6.14171V8.70838H6.41663V12.375H9.16663V20.1667H12.8333V12.375Z"
                                        fill=""
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_30_966">
                                        <rect width="22" height="22" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                                        <div >
                                            <BsTwitterX/>
              </div>
                        <a
                            href="#"
                            className="hover:text-primary"
                            aria-label="social-icon"
                        >
                            <svg
                                className="fill-current"
                                width="23"
                                height="22"
                                viewBox="0 0 23 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_30_974)">
                                    <path
                                        d="M6.69548 4.58327C6.69523 5.0695 6.50185 5.53572 6.15786 5.87937C5.81387 6.22301 5.34746 6.41593 4.86123 6.41569C4.375 6.41545 3.90878 6.22206 3.56513 5.87807C3.22149 5.53408 3.02857 5.06767 3.02881 4.58144C3.02905 4.09521 3.22244 3.62899 3.56643 3.28535C3.91042 2.9417 4.37683 2.74878 4.86306 2.74902C5.34929 2.74927 5.81551 2.94265 6.15915 3.28664C6.5028 3.63063 6.69572 4.09704 6.69548 4.58327ZM6.75048 7.77327H3.08381V19.2499H6.75048V7.77327ZM12.5438 7.77327H8.89548V19.2499H12.5071V13.2274C12.5071 9.87244 16.8796 9.56077 16.8796 13.2274V19.2499H20.5005V11.9808C20.5005 6.32494 14.0288 6.53577 12.5071 9.31327L12.5438 7.77327Z"
                                        fill=""
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_30_974">
                                        <rect
                                            width="22"
                                            height="22"
                                            fill="white"
                                            transform="translate(0.333862)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                        </a>
                        <div className="text-xl">
                                        <IoLogoInstagram/>

                                        </div>
                               
                                        
                                    </div>
                                    <div className="flex items-center justify-center gap-3.5 pt-4">
                                   
                                        <Tooltip title={member.userBio}>
        <button
            className='GenerateQuote_next hover:text-secondary text-xl'
            placeholder="Edit"
        // onClick={copyToClipboard}
        >
            <ImProfile />
        </button>

    </Tooltip>
                        <div className="text-lg">
                                        <FaPhone/>

                                        </div>
                                        <div className="text-2xl">
                                        <MdEmail/>

                                        </div>
  
                                    </div>
                                    
                </CardBody>

                        </Card>
                        </motion.div>

                        </motion.div>
              </>
                
                
          ))}
  

            </div>
            <div className="flex p-7 justify-center items-center pt-7">
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
        </>
            
    )
}
