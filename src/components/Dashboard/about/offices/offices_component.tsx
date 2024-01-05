"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";


import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { MdEdit } from "react-icons/md";
import { Tooltip } from "@mui/material";
import { getStatusTranslationKey } from "@/components/shared/tables";
import { FormHead } from "../../shared/page_Head";

import Swal from "sweetalert2";
import ServicesForm from "../../services/services-form";
import OfficesData from "./officesData";


export default function OfficesComponent() {

    const officesData = OfficesData;

    const officesPerPage = 4; // Set the number of offices per page
    const [currentPage, setCurrentPage] = useState(1);
    const path = usePathname();
    const arabic = path.includes('ar')
    const locale = useLocale()
    const t = useTranslations('servicesPage')
    // Calculate the start and end index of offices to display on the current page
    const startIndex = (currentPage - 1) * officesPerPage;
    const endIndex = startIndex + officesPerPage;
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5); // Set the fixed number of rows per page
    const [open, setOpen] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');

    const [selectedStatus, setSelectedStatus] = useState("");



    const [isEdit, setIsEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState(undefined);
    const [showForm, setShowForm] = useState(false);
    const [active, setActive] = useState(1);
    const [showEditForm, setEditForm] = useState(false);


    // ... (your existing functions)
    const openForm = () => {

        setShowForm((prevShowForm) => !prevShowForm);

    };

    const addForm = () => {
        setIsEdit(false);
        openForm()
    }
    const visibleOffices = officesData?.slice(startIndex, endIndex) || [];

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil((officesData?.length || 0) / officesPerPage);
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };
    const handleEditClick = (task: any) => {
        setSelectedTask(task);
        setIsEdit(true);
        console.log(selectedTask)
        openForm() // Open the form

    };

    return (
        <>
            <Breadcrumb pageName="Offices" />

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                    <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                        Our Offices
                    </h4>
                    <FormHead
                        handleClickOpen={addForm}
                        title={'Add Office'}
                    />
                </div>
                {showForm && <ServicesForm onCreate={''} isEdit={isEdit} editedValues={'selectedTask'} onUpdate={'onUpdate'} showForm={openForm} />}
                <div className="grid grid-cols-2 gap-2  max-sm:grid-cols-1 md:gap-6 xl:grid-cols-2 2xl:gap-2">
                    {visibleOffices?.map((office: any, index: any) => (
                        <>

                            <div className="  overflow-hidden rounded-sm border border-x-graydark bg-white shadow-default dark:border-strokedark dark:bg-boxdark">



                                <p
                                    className={`text-center items-center justify-items-center pt-4 inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${office.isFlag === true
                                        ? "text-success bg-success pt-2"
                                        : office.isFlag === false
                                            ? "text-danger bg-danger pt-2"
                                            : "text-warning bg-warning"
                                        }`}
                                >
                                    {t('yes')}
                                </p>

                                <div className="top-0 right-0 relative">

                                    <div className="absolute text-xl right-2 top-0">
                                        <Tooltip title={'Edit'}>
                                            <button
                                                className='GenerateQuote_next'
                                                placeholder="Edit"
                                                onClick={() => handleEditClick(office)}
                                            >
                                                <MdEdit />
                                            </button>

                                        </Tooltip>

                                    </div>
                                    <div className="absolute text-xl right-2 top-7">
                                        <Tooltip title={'Delete'}>
                                            <button
                                                className='GenerateQuote_next'
                                                placeholder="Delete"
                                                onClick={async () => {
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
                                                        cancelButtonText: t('cancel')

                                                    }).then((result) => {
                                                        if (result.isConfirmed && result.value === true) {
                                                            console.log(result)
                                                            // onDelete(service.serviceId);
                                                            Swal.fire(t('deleteSuccess'));
                                                        }
                                                    });
                                                }}
                                            >
                                                <RiDeleteBin6Line />
                                            </button>

                                        </Tooltip>

                                    </div>
                                </div>

                                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">


                                    <div className="mt-4">
                                        <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                                            {office.name}
                                        </h3>

                                        <p className="font-medium">       <p
                                            className={`pt-4 inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${office.isMainOffice === true
                                                ? "text-success bg-success pt-2"
                                                : office.status === false
                                                    ? "text-danger bg-danger pt-2"
                                                    : "text-warning bg-warning"
                                                }`}
                                        >
                                            {office.isMainOffice ? "Main Office" : "Branch"}
                                        </p>
                                        </p>


                                        <div className="mx-auto max-w-180">

                                            <p className="mt-4.5">
                                                {office.address}
                                            </p>
                                        </div>


                                        <div className="mx-auto max-w-180">
                                        <h2 className="dark:text-white text-black-2 mt-2.5">Working Days</h2>

                                            <p className="mt-4.5">
                                                {`${office.workDays}`}
                                            </p>
                                        </div>
                                        <div className="mx-auto max-w-180">
                                                <h2 className="dark:text-white text-black-2 mt-2.5">Available Time</h2>
                                            <p className="mt-1.5">
                                                {`available from ${office.workStartTime} To ${office.workEndTime}`}
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
                        {t('previous')}
                    </button>
                    <button
                        onClick={handleNextPage}
                        className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-body border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        {t('next')}
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
