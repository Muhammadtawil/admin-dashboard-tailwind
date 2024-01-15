"use client"
import { Product } from "@/types/product";
import { Box, Button, Table, TableCell, TableRow, Grid, FormControl, InputLabel, Select, MenuItem, IconButton, Avatar } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TablePagination from "@mui/material/TablePagination";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import StyledDialogTitle from "../shared/StyledDialogTitle";
import PageTitle from "../shared/PageTitle/pageTitle";
// import style from "./tasks.module.scss"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers'
import { successAlert, updateAlert } from "../shared/alerts/alerts";
import CustomTypography, { HeadBox, CustomTextField, ValuesSelect, FormFooter } from "../shared/formsComponents";
import Swal from "sweetalert2";
import { IoPersonAddSharp } from "react-icons/io5";
import { CircularPagination } from "../tasks/pagination";
import MemberSelect from "../tasks/member_select";
import { useSession } from "next-auth/react";
import TaskSatsCard from "./tasks_stats_cards";



const statusValues = ["COMPLETED", "NOT_COMPLETED", "IN_PROGRESS"];
const priorityValues = ["HIGH", "MEDIUM", "LOW"];




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


const TaskTable = ({ tasksData, deleteTask, OnCreate, onUpdate, isAssigned, isToMe,getusers,onSelectMember,tableTitle }: { tasksData: any, deleteTask: any, OnCreate: any, onUpdate: any, isAssigned: boolean, isToMe: boolean ,getusers:any,onSelectMember:any,tableTitle:string}) => {
    const { data: session } = useSession();
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5); // Set the fixed number of rows per page
    const [open, setOpen] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    // const [statusFilter, setStatusFilter] = useState('');
    // const [priorityFilter, setPriorityFilter] = useState('');
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("");
    const t = useTranslations('taskPage');
    const path = usePathname();
    const locale = useLocale();
    const [value, setValue] = useState<Dayjs | null>(dayjs('2023-11-17'));
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState<null|any>();
const [title,setTitle]=useState("")

    // ... (your existing functions)

    const handleStatusFilterChange = (event: any) => {
        setSelectedStatus(event.target.value);
    };
    const handlePriorityFilterChange = (event: any) => {
        setSelectedPriority(event.target.value);
    };
    const handleChange = (event: any) => {
        setTitle(event.target.value);
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

    // const handleFilterChange = (filterType: string, value: string) => {
    //     // Handle filter changes here
    //     // You can update the state variables like statusFilter and priorityFilter
    //     // and perform filtering logic accordingly
    //     if (filterType === 'status') {
    //         setStatusFilter(value);
    //     } else if (filterType === 'priority') {
    //         setPriorityFilter(value);
    //     }
    //     // Add your custom filter logic here
    // };
    // Filter tasks based on selected priority and status
    const filteredTasks = tasksData.filter(
        (task: any) =>
            (!selectedPriority || task.taskPriority === selectedPriority) &&
            (!selectedStatus || task.taskStatus === selectedStatus)
    );

    const noTasks = filteredTasks.length === 0;
    const admin = session?.UserRole === "ADMIN" ||session?.UserRole==="SUPER ADMIN";
    return (

        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
           
            <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                   {tableTitle}
                </h4>
                <FormHead
                    handleClickOpen={handleAddClickOpen}
                    title={t('addTask')}
                />
            </div>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 max-sm:min-w-[100px]">
                                Title
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white max-sm:min-w-[100px]">
                                {(admin && !isToMe && !isAssigned)
                                    ? 'Assign'
                                        :(isToMe)
                                            ? t('assignedBy')
                                            :t('assignedTo') }
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                StartDate
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                End Date
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
                                        <option value="COMPLETED">Completed</option>
                                        <option value="IN-PROGRESS">In Progress</option>
                                        <option value="NOT_COMPLETED">Pending</option>
                                    </select>
                                </>
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                <>
                                    {'priority'}
                                    <select
                                        className="bg-white dark:bg-boxdark"
                                        value={selectedPriority}
                                        onChange={handlePriorityFilterChange}
                                        style={{ marginLeft: '8px' }}
                                    >
                                        <option value="">All</option>
                                        <option value="HIGH">High</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="LOW">Low</option>
                                    </select>
                                </>
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {noTasks?<h1>no tasks</h1>:filteredTasks.slice(startIndex, endIndex).map((task: any, index: any) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-black dark:text-white ">
                                        {task.taskTitle}
                                    </h5>
                                    {/* <p className="text-sm">${item.price}</p> */}
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
  {isAssigned && admin && !isToMe ? (
    task.assignedTo.map((user: any) => (
      <Avatar
        key={user.userId}
        alt={user.userName}
        src={user.userImgUrl}
        sx={{ marginRight: "8px" }} // Adjust the spacing between avatars as needed
      />
    ))
  ) : (admin && !isToMe) ? (
    <IconButton
      aria-label="User Icon"
      onClick={() => handleSelectClick(task)}
      className="dark:bg-white"
    >
      <IoPersonAddSharp />
    </IconButton>
  ) : isToMe ? (
    getusers
      .filter((user: any) => user.userId === task.assignBy)
      .map((filteredUser: any) => (
        <Avatar
          key={filteredUser.userId}
          alt={filteredUser.userName}
          src={filteredUser.userImgUrl}
          sx={{ marginRight: "8px" }} // Adjust the spacing between avatars as needed
        />
      ))
  ) : null}
</td>

                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {new Date(task.createdAt).toLocaleDateString(locale == "ar" ? "ar-LB" : "en-US", {
                                            day: "numeric",
                                            month: "2-digit",
                                            year: "2-digit",
                                            hour: "numeric",
                                            minute: "numeric",
                                        })}
                                        {/* {item.taskDeadline} */}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                    {new Date(task.taskDeadline).toLocaleDateString(locale == "ar" ? "ar-LB" : "en-US", {
                                            day: "numeric",
                                            month: "2-digit",
                                            year: "2-digit",
                                            hour: "numeric",
                                            minute: "numeric",
                                        })}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${task.taskStatus === "COMPLETED"
                                            ? "text-success bg-success"
                                            : task.taskStatus === "NOT_COMPLETED"
                                                ? "text-danger bg-danger"
                                                : "text-warning bg-warning"
                                            }`}
                                    >
                                        {task.taskStatus}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${task.taskPriority === "LOW"
                                            ? "text-success bg-success"
                                            : task.taskPriority === "HIGH"
                                                ? "text-danger bg-danger"
                                                : "text-warning bg-warning"
                                            }`}
                                    >
                                        {task.taskPriority}
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
                                                    deleteTask(isAssigned ? task.assignedTaskId : task.taskId);
                                                    Swal.fire(t('deleteSuccess'));
                                                }
                                            });
                                        }}>
                                            <RiDeleteBin6Line />
                                        </button>
                                        <button className="hover:text-primary" onClick={() => handleEditClick(task)}>
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
                    action={(formData) => {
                        formData.append('taskDeadline', value ? value.format() : '');
                        {
                            isEdit ?
                                onUpdate(
                        formData,
                        isAssigned ? selectedTask.assignedTaskId : selectedTask.taskId
                      ).then(() => {
                      handleClose();
                      updateAlert(t('editAlert'));
                        
                      }):     OnCreate(formData).then(() => {
                        handleClose();
                        successAlert(t('success'));


                      });}
                 
                    }}
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
                            <Grid container alignItems="center" spacing={2} >
                                <CustomTextField name="taskTitle" label={t('taskTitle')} isrequired={true} type="text" isEdit={isEdit} EditValue={selectedTask?.taskTitle} />

                                <Grid item xs={12} md={12} lg={6}>
                                    <CustomTypography text={'End Date'} />

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                        <DemoContainer components={['DateTimePicker']} >
                                            <DateTimePicker label={t('endDate')} value={isEdit ? dayjs(new Date(selectedTask.taskDeadline)) : value}
                                                onChange={(newValue) => setValue(newValue)} className="dark:bg-strokedark dark:text-primary"
                                                
                                        //   sx={{backgroundColor:"dark:bg-white" }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>


                                <Grid item xs={12} md={12} lg={6}>
                                    <CustomTypography text={t('status')} />
                                    <ValuesSelect name={"taskStatus"} values={statusValues} isrequired={true} dicName="taskPage" optionValue="status" isEdit={isEdit} editValue={selectedTask?.taskStatus} />
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
                                        editValue={selectedTask?.taskPriority}
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
                    usersName={getusers}
                    selectedTask={selectedTask}
                    handleClose={handleCloseMember}
                    onSelectMember={onSelectMember}
                />
            </StyledDialogTitle>
        </div>
    );
};

export default TaskTable;
