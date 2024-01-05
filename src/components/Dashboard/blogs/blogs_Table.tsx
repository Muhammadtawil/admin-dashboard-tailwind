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
import BlogsCards from "./blogs_cards";
import BlogAddComponent from './AddBlogForm';
import { blogData } from './blogData';
import { Blog } from "@/types/blogs";
import { FormHead } from "../shared/page_Head";
import BlogsTableHead from "./table_head";





const BlogsTable = ({blogsData,onCreate,UpdateImage,onDelete,onUpdate}:{blogsData:any,onCreate:any,UpdateImage:any,onDelete:any,onUpdate:any}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5); // Set the fixed number of rows per page
    const [open, setOpen] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');

    const [selectedStatus, setSelectedStatus] = useState("");
 
    const t = useTranslations('BlogPage');
    const path = usePathname();
    const locale = useLocale();
    const [value, setValue] = useState<Dayjs | null>(dayjs('2023-11-17'));
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Blog | undefined>(undefined);
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
        detailsChanged: (s:any) => {
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
    const filteredTasks = blogsData.filter(
        (blogs:any) =>
            !selectedStatus || blogs.status === selectedStatus
    );

    if (filteredTasks.length === 0) {
        return <TableRow>{/* ... */}</TableRow>;
    }
    return (

        <div  className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                    My Blogs
                </h4>
                <FormHead
                    handleClickOpen={addForm}
                    title={t('CreateBlog')}
                />
            </div>
            {showForm && <BlogAddComponent onCreate={onCreate} isEdit={ isEdit} editedValues={selectedTask} onUpdate={onUpdate} UpdateImage={UpdateImage}/>}

            <div className="max-w-full overflow-x-auto">


{/* 
                <div ref={sliderRef} className="keen-slider grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
         
     
                {blogsData.map((item:any, index:any) => (
                 <div
                 key={index}
                 className={`keen-slider__slide testimonialCard ${
                   active === index && "activeStyle"
                 } `}
               >
                    <div className="d-flex gap-2 align-items-center">

                            <BlogsCards title={item.author} total={item.title} rate={item.isFlag} levelUp key={index} image={item.image} >
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
                            
        </BlogsCards>
        </div>  
               </div>
                        
        ))}
                  
                </div> */}
                <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                    Blogs Table
                </h4>
      
            </div>
                <table className="w-full table-auto">
       <BlogsTableHead selectedStatus={selectedStatus} handleStatusFilterChange={handleStatusFilterChange}/>
                    <tbody>
                        {filteredTasks.slice(startIndex, endIndex).map((blog:any, index:any) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] py-3 px-4 pl-2 dark:border-strokedark xl:pl-11">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="h-12.5 w-21 rounded-md">
                <Image
                  src={blog.blogImageUrl}
                  width={60}
                  height={50}
                  alt="Product"
                                            />
                                        </div>
                                      
              <p className="text-sm text-black dark:text-white">
                {blog.blogTitle}
              </p>
            </div>
                                    {/* <p className="text-sm">${item.price}</p> */}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src='/images/user/user-05.png' alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {blog.author.authorName}
              </p>
            </div>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {blog.createdAt}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                    {blog.blogLang=='arabic'?t('arabic'):t('english')}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${blog.isFlag === true
                                            ? "text-success bg-success"
                                            : blog.isFlag === false
                                                ? "text-danger bg-danger"
                                                : "text-warning bg-warning"
                                            }`}
                                    >
                                                   {blog.isFlag == true ? t('yes'): t('no')}
                                    </p>
                                </td>
                       
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                    <button className="hover:text-primary" onClick={() => handleEditClick(blog)}>
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
                                                    onDelete(blog.blogId);
                                                    Swal.fire(t('deleteSuccess'));
                                                }
                                            });
                                        }}>
                                            <RiDeleteBin6Line />
                                        </button>
                                        <button className="hover:text-primary" onClick={() => handleEditClick(blog)}>
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

export default BlogsTable;
