"use client"
import CardDataStats from '@/components/CardDataStats'
import { IoMdAdd } from "react-icons/io";;
import { IoMdCall } from "react-icons/io";
import { MdOutlineContactPhone, MdEmail } from 'react-icons/md'; // Import icons
import { TbWorldWww } from "react-icons/tb";
import ContactsCards from './contacts_Cards';
import { FormHead } from '../shared/page_Head';
import { Box, Button } from "@mui/material";
import { ContactsData } from './contact_Data';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { title } from 'process';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { Tooltip } from '@mui/material';

import './contact.css'
import ContactsNoteBookCards from './contact_notebook';
import ContactsNoteBook from './contact_notebook';
export default function ContactsComponent() {
    const [blogsData, setBlogsData] = useState(ContactsData);
    const handle = () => {
        console.log('a')
    }
      // Search handler function
  // Search handler function
  const searchHandler = (e: any) => {
    // Search input value
    let searchValue = e?.target?.value?.trim()?.toLowerCase();
    // Check value and filter the data
    if (searchValue) {
      setBlogsData(
        ContactsData.filter((data: any) => {
          // Check for the search value in different properties
          if (
            data?.name?.toLowerCase()?.includes(searchValue) ||
            data?.Phone?.toLowerCase()?.includes(searchValue) ||
            data?.Email?.toLowerCase()?.includes(searchValue) ||
            data?.description?.toLowerCase()?.includes(searchValue) ||
            data?.webSite?.toLowerCase()?.includes(searchValue)
          ) {
            return data;
          }
        })
      );
    } else {
      setBlogsData(ContactsData);
    }
  };

    return (
        <>
            <Breadcrumb pageName={'Contacts'} />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                    My Contacts
                </h4>
                <FormHead title={'Add Contact'} handleClickOpen={handle} />
            </div>
        
       
      <div className="pb-4 sm:block">
         
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
              <FaSearch />
              </button>

                        <input
            onChange={searchHandler}
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
    
        </div>
             <div className="pb-3 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 max-sm:grid-cols-2">
                    {blogsData.map((contact: any, index: any) => (
            
          <ContactsCards
            key={index}
            name={contact.name}
            Phone={contact.Phone}
            email={contact.Email}
            description={contact.description}
            website={contact.webSite}
            />
            
        ))}
      </div>
          {/* <div className="pb-3 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 ">
          <div className=" rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="notebook">

<div className="ribbon">

</div>

<div className="wrapper">
    <h1 className='text-lg'>{'Add Contact'}</h1>
    



</div>
              </div>
              </div>
                    {blogsData.map((contact: any, index: any) => (
            
          <ContactsNoteBook
            key={index}
            name={contact.name}
            Phone={contact.Phone}
            email={contact.Email}
            description={contact.description}
            website={contact.webSite}
            />
            
        ))}
      </div> */}



            </div>
        </>
            
    );


  
}
