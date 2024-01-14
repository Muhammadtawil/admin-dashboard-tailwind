"use client"
import { Box, Button, TableRow } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import dayjs, { Dayjs } from 'dayjs';
import Swal from "sweetalert2";
import StyledDialogTitle from "@/components/shared/StyledDialogTitle";
import MemberSelect from "@/components/tasks/member_select";
import { CircularPagination } from "@/components/tasks/pagination";
import { MdOutlineVisibility } from "react-icons/md";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { FormHead } from "../shared/page_Head";
import NewsTableHead from "./table_Head";
import NewsForm from "./new_form";
import NewsSlider from "./news_slider";






const NewsTable = ({ newsData, onCreate, UpdateImage, onDelete, onUpdate }: { newsData: any, onCreate: any, UpdateImage: any, onDelete: any, onUpdate: any }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5); // Set the fixed number of rows per page
    const [open, setOpen] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');

    const [selectedStatus, setSelectedStatus] = useState("");

    const t = useTranslations('newsPage');
    const path = usePathname();
    const locale = useLocale();
    const [value, setValue] = useState<Dayjs | null>(dayjs('2023-11-17'));
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState< any| undefined>(undefined);
    const [showForm, setShowForm] = useState(false);
    const [active, setActive] = useState(1);
    const [showEditForm, setEditForm] = useState(false);
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
        detailsChanged: (s: any) => {
            setActive(s?.track?.details?.abs);
        },
    });

    // ... (your existing functions)
    const openForm = () => {

        setShowForm((prevShowForm) => !prevShowForm);

    };

    const addForm = () => {
        setIsEdit(false);
        openForm()
    }
    const openEditForm = () => {

        setIsEdit(true);
        setEditForm((prevShowForm) => !prevShowForm);
        console.log(isEdit);
    };

    const handleStatusFilterChange = (event: any) => {
        setSelectedStatus(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddClickOpen = () => {
        setIsEdit(false)
        setOpen(true)
    }
    const handleEditClickOpen = () => {
        setOpen(true);
    };

    const handleEditClick = (task: any) => {
        setSelectedTask(task);
        setIsEdit(true);
        console.log(selectedTask)
        openForm() // Open the form

    };
    const handleCloseMember = () => {
        setOpenMember(false);
    };

    const handleClickOpenMember = () => {
        setOpenMember(true);
    };

    // Define pagination states
    const [activePage, setActivePage] = useState(1);


    // Define pagination change handler
    const handlePageChange = (newPage: any) => {
        setActivePage(newPage);
        setPage(newPage - 1); // Adjust the page index to start from 0
    };
    const handleSelectClick = (task: any) => {
        setSelectedTask(task);
        handleClickOpenMember();
    };

    // Calculate the start and end index of the current page
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Filter tasks based on selected priority and status
    const filteredTasks = newsData.filter(
        (news: any) =>
            !selectedStatus || news.newsStatus === selectedStatus
    );

    return (

        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                   {t('pageTitle')}
                </h4>
                <FormHead
                    handleClickOpen={addForm}
                    title={t('addNews')}
                />
            </div>
            {showForm && <NewsForm onCreate={onCreate} isEdit={isEdit} editedValues={selectedTask} onUpdate={onUpdate} UpdateImage={UpdateImage} />}

            <div className="max-w-full overflow-x-auto">
            <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                    <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                        Deployed News
                    </h4>

                </div>
                <NewsSlider data={newsData} handleEditClick={handleEditClick}/>

                <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                    <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                        News Table
                    </h4>

                </div>
                <table className="w-full table-auto">
              <NewsTableHead selectedStatus={selectedStatus} handleStatusFilterChange={handleStatusFilterChange}/>
                    <tbody>
                        {filteredTasks.slice(startIndex, endIndex).map((news: any, index: any) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] py-4 px-4 pl-2 dark:border-strokedark xl:pl-11">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                        <div className="h-12.5 w-21 rounded-md">
                                            <Image
                                                src={news.newsImageUrl}
                                                width={60}
                                                height={50}
                                                alt="news"
                                            />
                                        </div>

                                        <p className="text-sm text-black dark:text-white">
                                            {news.newsTitle}

                                        </p>
                                    </div>

                                </td>
                            
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {new Date(news.createdAt).toLocaleDateString(locale == 'ar' ? "ar-LB" : "en-US", {
                                            day: "numeric",
                                            month: "2-digit",
                                            year: "2-digit",
                                            hour: "numeric",
                                        })}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {news.newsCategory}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {news.newsLang == 'arabic' ? t('arabic') : t('english')}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${news.isFlag === true
                                            ? "text-success bg-success"
                                            : news.isFlag === false
                                                ? "text-danger bg-danger"
                                                : "text-warning bg-warning"
                                            }`}
                                    >
                                        {news.isFlag == true ? t('yes') : t('no')}
                                    </p>
                                </td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button className="hover:text-primary" onClick={() => handleEditClick(news)}>
                                            <MdOutlineVisibility />
                                        </button>
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
                                                    onDelete(news.newsId);
                                                    Swal.fire(t('deleteSuccess'));
                                                }
                                            });
                                        }}>
                                            <RiDeleteBin6Line />
                                        </button>
                                        <button className="hover:text-primary" onClick={() => handleEditClick(news)}>
                                            <FaRegEdit />

                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CircularPagination
                totalPages={Math.ceil(filteredTasks.length / rowsPerPage)} // Calculate the total number of pages
                activePage={activePage}
                onPageChange={handlePageChange}
            />

            <StyledDialogTitle
                onClose={handleCloseMember}
                aria-labelledby="customized-dialog-title"
                open={openMember}
            >
                <MemberSelect
                    usersName={['getusers']}
                    selectedTask={selectedTask}
                    handleClose={handleCloseMember}
                    onSelectMember={'onSelectMember'}
                />
            </StyledDialogTitle>
        </div>
    );
};

export default NewsTable;
