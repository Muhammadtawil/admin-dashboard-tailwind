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

import BlogAddComponent from "../blogs/AddBlogForm";
import TeamCards from "./team_cards";
import ChartTest from "@/components/Charts/chartTest";






const statusValues = ["completed", "pending", "In-progress"];
const priorityValues = ["High", "Medium", "Low"];



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


const TeamTable = ({teamsData}:{teamsData:any}) => {
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


 
        const openForm = () => {
                setShowForm((prevShowForm) => !prevShowForm);
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



 

       
    
        return (
<>
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                                        our Team
                                </h4>
                                <FormHead
                                        handleClickOpen={openForm}
                                        title={'Add Team Member'}
                                />
                        </div>
                        <TeamCards teamsData={teamsData}/>

                {showForm && <BlogAddComponent onCreate={''} onUpdate={''} isEdit={false} editedValues={''} UpdateImage={''}  />}
                       
                        <div className="max-w-full overflow-x-auto">



                         
                              
                        </div>

                   
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
                        
                        <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                                        <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                                                Authors Table
                                        </h4>

                        </div>
                        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                           <ChartTest/>
                        </div>
                </>
        );
};

export default TeamTable;



