"use client"
import { Product } from "@/types/product";
import { Box, Button, Table, TableCell, TableRow, Grid, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TablePagination from "@mui/material/TablePagination";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Swal from "sweetalert2";
import { IoPersonAddSharp } from "react-icons/io5";
import StyledDialogTitle from "@/components/shared/StyledDialogTitle";
import CustomTypography, { HeadBox, CustomTextField, ValuesSelect, FormFooter } from "@/components/shared/formsComponents";
import MemberSelect from "@/components/tasks/member_select";
import { CircularPagination } from "@/components/tasks/pagination";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import CardDataStats from "@/components/CardDataStats";
import { Swiper, SwiperSlide } from 'swiper/react';
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
import BlogAddComponent from "../blogs/AddBlogForm";
import BlogsCards from "../blogs/blogs_cards";





const statusValues = ["completed", "pending", "In-progress"];
const priorityValues = ["High", "Medium", "Low"];

const productData: Product[] = [
    {
        image: "/images/product/product-01.png",
        name: "Task1",
        category: "Electronics",
        price: 296,
        sold: 22,
        profit: 45,
        status: 'pending',
        priority: 'High'
    },
    {
        image: "/images/product/product-02.png",
        name: "Task2",
        category: "Electronics",
        price: 546,
        sold: 12,
        profit: 125,
        status: 'completed',
        priority: 'High'

    },
    {
        image: "/images/product/product-03.png",
        name: "Task3",
        category: "Electronics",
        price: 443,
        sold: 64,
        profit: 247,
        status: 'completed',
        priority: 'High'


    },

    {
        image: "/images/product/product-04.png",
        name: "Task4",
        category: "Electronics",
        price: 499,
        sold: 72,
        profit: 103,
        status: 'In-progress',
        priority: 'Medium'

    },
    {
        image: "/images/product/product-01.png",
        name: "Task5",
        category: "Electronics",
        price: 296,
        sold: 22,
        profit: 45,
        status: 'pending',
        priority: 'High'
    },
    {
        image: "/images/product/product-02.png",
        name: "Task6",
        category: "Electronics",
        price: 546,
        sold: 12,
        profit: 125,
        status: 'completed',
        priority: 'Low'


    },
    {
        image: "/images/product/product-03.png",
        name: "Task7",
        category: "Electronics",
        price: 443,
        sold: 64,
        profit: 247,
        status: 'completed',
        priority: 'Low'

    },
    {
        image: "/images/product/product-04.png",
        name: "Task8",
        category: "Electronics",
        price: 499,
        sold: 72,
        profit: 103,
        status: 'In-progress',
        priority: 'Low'

    },
    {
        image: "/images/product/product-04.png",
        name: "Task10",
        category: "Electronics",
        price: 499,
        sold: 72,
        profit: 103,
        status: 'In-progress',
        priority: 'Low'

    },
    {
        image: "/images/product/product-01.png",
        name: "Apple Watch Series 7",
        category: "Electronics",
        price: 296,
        sold: 22,
        profit: 45,
        status: 'pending',
        priority: 'Low'
    },
    {
        image: "/images/product/product-02.png",
        name: "Macbook Pro M1",
        category: "Electronics",
        price: 546,
        sold: 12,
        profit: 125,
        status: 'completed',
        priority: 'Low'

    },
    {
        image: "/images/product/product-03.png",
        name: "Dell Inspiron 15",
        category: "Electronics",
        price: 443,
        sold: 64,
        profit: 247,
        status: 'completed',
        priority: 'Medium'

    },
    {
        image: "/images/product/product-04.png",
        name: "HP Probook 450",
        category: "Electronics",
        price: 499,
        sold: 72,
        profit: 103,
        status: 'In-progress',
        priority: 'High'

    },
    {
        image: "/images/product/product-04.png",
        name: "HP Probook 450",
        category: "Electronics",
        price: 499,
        sold: 72,
        profit: 103,
        status: 'In-progress',
        priority: 'Low'

    },

];


const FormHead = ({
    handleClickOpen,
    title,
}: {
    handleClickOpen: any;
    title: any;
}) => {

    return (
        <Box
            // className=""
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "10px",
                mb: "20px",
                borderBottom: "none",

            }}
            className="formHead client-box order-2"
        >
            {/* <SearchForm /> */}
            <Button
                onClick={handleClickOpen}
                variant="contained"
                className="headButton border-t border-stroke  dark:border-strokedark dark:bg-boxdark bg-black"
                sx={{
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "13px",
                    padding: "12px 20px 10px 10px",
                    color: "#fff !important",
                    background: "#040831",
                }}
            >
                <IoMdAdd
                    sx={{ position: "relative", top: "-1px" }}
                    className="mr-5px"
                />
                {title}
            </Button>
        </Box>
    );
};

// const TableHeader = ({
//     titles,
//     handlePriorityFilterChange,
//     handleStatusFilterChange,
//     selectedPriority,
//     selectedStatus,
// }: {
//     titles: string[];
//     handlePriorityFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
//     handleStatusFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
//     selectedPriority: any;
//     selectedStatus: any;
// }) => {
//     return (
//         <thead>
//             <tr className="bg-gray-2 text-left dark:bg-meta-4">
//                 {titles.map((title: any, index: any) => (
//                     <th key={index} className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
//                         {title === 'Status' ? (
//                             <>
//                                 {'Status'}
//                                 <select
//                                     className="bg-white dark:bg-boxdark"
//                                     value={selectedStatus}
//                                     onChange={handleStatusFilterChange}
//                                     style={{ marginLeft: '8px' }}
//                                 >
//                                     <option value="">All</option>
//                                     <option value="completed">Completed</option>
//                                     <option value="In-progress">In Progress</option>
//                                     <option value="pending">Pending</option>
//                                 </select>
//                             </>

//                         ) : title === 'Priority' ? (

//                             <>
//                                 {'priority'}
//                                 <select
//                                     className="bg-white dark:bg-boxdark"
//                                     value={selectedPriority}
//                                     onChange={handlePriorityFilterChange}
//                                     style={{ marginLeft: '8px' }}
//                                 >
//                                     <option value="">All</option>
//                                     <option value="High">High</option>
//                                     <option value="Medium">Medium</option>
//                                     <option value="Low">Low</option>
//                                 </select>
//                             </>

//                         ) : (
//                             <th className="font-medium">{title}</p>
//                         )}
//                     </th>
//                 ))}
//             </tr>
//         </thead>


//     );
// };


const NewsTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5); // Set the fixed number of rows per page
    const [open, setOpen] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const t = useTranslations('taskPage');
    const path = usePathname();
    const locale = useLocale();
    const [value, setValue] = useState<Dayjs | null>(dayjs('2023-11-17'));
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Product | undefined>(undefined);
    const [showForm, setShowForm] = useState(false);
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

    // ... (your existing functions)
    const openForm = () => {
        setShowForm((prevShowForm) => !prevShowForm);
      };
      
    const handleStatusFilterChange = (event: any) => {
        setSelectedStatus(event.target.value);
    };
    const handlePriorityFilterChange = (event: any) => {
        setSelectedPriority(event.target.value);
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
        handleEditClickOpen(); // Open the form

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

    const handleFilterChange = (filterType: string, value: string) => {
        // Handle filter changes here
        // You can update the state variables like statusFilter and priorityFilter
        // and perform filtering logic accordingly
        if (filterType === 'status') {
            setStatusFilter(value);
        } else if (filterType === 'priority') {
            setPriorityFilter(value);
        }
        // Add your custom filter logic here
    };
    // Filter tasks based on selected priority and status
    const filteredTasks = productData.filter(
        (task) =>
            (!selectedPriority || task.priority === selectedPriority) &&
            (!selectedStatus || task.status === selectedStatus)
    );

    if (filteredTasks.length === 0) {
        return <TableRow>{/* ... */}</TableRow>;
    }
    return (

        <div  className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                    My News
                </h4>
                <FormHead
                    handleClickOpen={openForm}
                    title={t('addTask')}
                />
            </div>
            {showForm && <BlogAddComponent onCreate={''} onUpdate={''} editedValues={''} isEdit={isEdit} UpdateImage={''}  />}

            <div className="max-w-full overflow-x-auto">



                <div ref={sliderRef} className="keen-slider grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
         
     
                {productData.map((item, key) => (
                 <div
                 key={key}
                 className={`keen-slider__slide testimonialCard ${
                   active === key && "activeStyle"
                 } `}
               >
                    <div className="d-flex gap-2 align-items-center">

                            <BlogsCards title={item.category} total={item.name} rate={item.status} levelUp key={key} image={item.image} >
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
                  
                </div>
                <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                    News Table
                </h4>
      
            </div>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 max-sm:min-w-[100px]">
                                Title
                            </th>
                         
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Date
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                               Language
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                <>
                                    {'Status'}
                                    <select
                                        className="bg-white dark:bg-boxdark"
                                        value={selectedStatus}
                                        onChange={handleStatusFilterChange}
                                        style={{ marginLeft: '8px' }}
                                    >
                                        <option value="">All</option>
                                        <option value="completed">Completed</option>
                                        <option value="In-progress">In Progress</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </>
                            </th>
                        
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.slice(startIndex, endIndex).map((item, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={item.image}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {item.name}
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
                                    <p className="text-black dark:text-white">
                                        {'Arabic'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${item.status === "completed"
                                            ? "text-success bg-success"
                                            : item.status === "pending"
                                                ? "text-danger bg-danger"
                                                : "text-warning bg-warning"
                                            }`}
                                    >
                                        {item.status}
                                    </p>
                                </td>
                       
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                    <button className="hover:text-primary" onClick={() => handleEditClick(item)}>
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
                                                    //    deleteTask(isAssigned ? task.assignedTaskId : task.taskId);
                                                    Swal.fire(t('deleteSuccess'));
                                                }
                                            });
                                        }}>
                                            <RiDeleteBin6Line />
                                        </button>
                                        <button className="hover:text-primary" onClick={() => handleEditClick(item)}>
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
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}

            >
                <Box className="dark:bg-strokedark dark:text-white">
                    <HeadBox handleClose={handleClose} title={isEdit ? 'Edit Task' : t('addTask')} />

                    <Box
                        className="client-box"
                        component="form"
                        noValidate={false}
                    // action={(formData) => {
                    //   formData.append('taskDeadline', value ? value.format() : '');
                    //   onCreate(formData).then(() => {
                    //     handleClose();
                    //     successAlert(t('success'));


                    //   });
                    // }}
                    >
                        <Box
                            sx={{
                                // background: "greem",
                                padding: "20px 20px",
                                // borderRadius: "8px",
                                // color: "white",
                            }}
                            className="client-box bg-white dark:bg-strokedark"
                        >
                            <Grid container alignItems="center" spacing={2}>
                                <CustomTextField name="taskTitle" label={t('taskTitle')} isrequired={true} type="" isEdit={isEdit} EditValue={selectedTask?.name} />

                                <Grid item xs={12} md={12} lg={6} >
                                    <CustomTypography text={'End Date'} />

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DemoContainer components={['DateTimePicker']}  >
                                            <DateTimePicker label={t('endDate')} value={isEdit ? dayjs(new Date(Date.now())) : value}
                                                onChange={(newValue) => setValue(newValue)} className="dark:bg-strokedark dark:text-white" />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>


                                <Grid item xs={12} md={12} lg={6}>
                                    <CustomTypography text={t('status')} />
                                    <ValuesSelect name={"taskStatus"} values={statusValues} isrequired={true} dicName="taskPage" optionValue="status" isEdit={isEdit} editValue={selectedTask?.status} />
                                </Grid>
                                <Grid item xs={12} md={12} lg={6}>
                                    <CustomTypography text={t('priority')} />
                                    <ValuesSelect
                                        name={"taskPriority"}
                                        values={priorityValues}
                                        isrequired={true}
                                        dicName="taskPage"
                                        optionValue="priority"
                                        isEdit={isEdit}
                                        editValue={selectedTask?.priority}
                                    />

                                </Grid>


                                <FormFooter handleClose={handleClose} title={isEdit ? t('edit') : t('addTask')} />
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </StyledDialogTitle>
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
