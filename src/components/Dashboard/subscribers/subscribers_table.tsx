"use client"

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { CircularPagination } from "@/components/tasks/pagination";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SubscribersCards from "./subscribers_cards";
import SubscribersForm from "./subscribers_form";
import { FormHead } from "../shared/page_Head";




const SubscribersTable = ({SubscribersData,onDelete,onCreate}:{SubscribersData:any,onDelete:any,onCreate:any}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5); // Set the fixed number of rows per page
    const [open, setOpen] = useState(false);
    const t = useTranslations('subscribersPage');
    const locale = useLocale();
    const [showForm, setShowForm] = useState(false);


 

    // ... (your existing functions)
    const openForm = () => {
        setShowForm((prevShowForm) => !prevShowForm);
      };
      

    const handleClose = () => {
        setOpen(false);
    };

    // Define pagination states
    const [activePage, setActivePage] = useState(1);


    // Define pagination change handler
    const handlePageChange = (newPage: any) => {
        setActivePage(newPage);
        setPage(newPage - 1); // Adjust the page index to start from 0
    };
  
    // Calculate the start and end index of the current page
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;


    // Filter tasks based on selected priority and status



    return (
<>
<Breadcrumb pageName="Subscribers" />

        <div  className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
         
            <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                    Our Subscribers
                </h4>
                <FormHead
                    handleClickOpen={openForm}
                    title={t('addSubscriber')}
                />
            </div>
            {showForm && <SubscribersForm onCreate={onCreate} showForm={openForm} />}
<SubscribersCards subscribersData={SubscribersData}/>
            <div className="max-w-full overflow-x-auto">

                <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                    Subscribers Table
                </h4>
      
            </div>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 max-sm:min-w-[100px]">
                                Email
                            </th>
                         
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Subscribtion Date
                            </th>
                        
                     
                        
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {SubscribersData.slice(startIndex, endIndex).map((item:any, index:any) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
     
              <p className="text-sm text-black dark:text-white">
                {item.subscriberEmail}
              </p>
            </div>
                                    {/* <p className="text-sm">${item.price}</p> */}
                                </td>
                     
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {'15-12-2023'}
                                    </p>
                                </td>
                  
                   
                       
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                              
                                        <button className="hover:text-danger" onClick={async () => {
                                            await Swal.fire({
                                                title: t('deleteTitle'),
                                                text: t('deleteTitle2'),
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonColor: "#3085d6",
                                                cancelButtonColor: "#d33",
                                                confirmButtonText: t('yes'),
                                                focusConfirm: true,
                                                allowEscapeKey: true,
                                                cancelButtonText: t('cancel'),
                                                color: 'red',

                                            }).then((result) => {
                                                if (result.isConfirmed && result.value === true) {
                                                    console.log(result)
                                                       onDelete( item.subscriberId);
                                                    Swal.fire(t('deleteSuccess'));
                                                }
                                            });
                                        }}>
                                            <RiDeleteBin6Line />
                                        </button>
                                   
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CircularPagination
                totalPages={Math.ceil(SubscribersData.length / rowsPerPage)} // Calculate the total number of pages
                activePage={activePage}
                onPageChange={handlePageChange}
            />
         
            </div>
</>
            
    );
};

export default SubscribersTable;
