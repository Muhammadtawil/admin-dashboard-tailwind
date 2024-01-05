"use client"
import { Product } from "@/types/product";
import { Box, Button, Table, TableRow } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { title } from "process";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TablePagination from "@mui/material/TablePagination";

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CircularPagination } from "../tasks/pagination";


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
                borderBottom: "1px solid #EEF0F7",
                paddingBottom: "10px",
                mb: "20px",

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

const TableHeader = ({ titles }: { titles: string[] }) => {
    return (
        <div className="grid grid-cols-7 border-t border-stroke py-5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
            {titles.map((title: any, index: any) => (
                <div key={index} className={`col-span-1 flex items-center ${index === 1 && 'hidden sm:flex'}`}>
                    <p className="font-medium">{title}</p>
                </div>
            ))}
        </div>
    );
};
// ... (your imports)
const TableHead = ({tableTitle,handleClickOpen,buttonTitle}:{tableTitle:any,handleClickOpen:any,buttonTitle:any}) => {
    return(
        <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1">
                    {tableTitle}
                </h4>
                <FormHead
                    handleClickOpen={handleClickOpen}
                    title={buttonTitle}
                />
            </div>
    );
}
const DashboardTable = ({tableData,isImage}:{tableData:any,isImage:boolean}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5); // Set the fixed number of rows per page
    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [openMember, setOpenMember] = useState(false);

    const t = useTranslations('taskPage');
    const path = usePathname();
    const locale = useLocale();

    // ... (your existing functions)

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleEditClick = (task: any) => {
        setSelectedTask(task);
        handleClickOpen();
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

    // Calculate the start and end index of the current page
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;


    return (
        <div className="gap-2 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
   <TableHead tableTitle='My Tasks' handleClickOpen={handleClickOpen} buttonTitle={t('addTask')}/>

            <TableHeader
                titles={['Title', 'Assign', 'Start Date', 'End Date', 'Status', 'Priority', 'Actions']}
            />

            {tableData.slice(startIndex, endIndex).map((item:any, key:any) => (
                <div
                    className="grid grid-cols-7 border-t border-stroke py-5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
                    key={key}
                >
                    {isImage? <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
            </div>:   <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{item.name}</p>
                    </div>
                    }
                 
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">Assign</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">15/12/2023</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">15/2/2024</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${item.status === 'completed'
                                ? 'text-success bg-success'
                                : item.status === 'In-progress'
                                    ? 'text-danger bg-danger'
                                    : 'text-warning bg-warning'
                                }`}
                        >
                            {item.status}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p
                            className={`inline-flex rounded-full bg-opacity-10  px-3 text-sm font-medium ${item.status === 'completed'
                                ? 'text-success bg-success'
                                : item.status === 'In-progress'
                                    ? 'text-danger bg-danger'
                                    : 'text-warning bg-warning'
                                }`}
                        >
                            {item.status}
                        </p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <div className="flex items-center space-x-3.5">
                            <button className="hover:text-danger">
                            <RiDeleteBin6Line />
                            </button>
                            <button className="hover:text-primary">
                            <FaRegEdit />

                            </button>
                        </div>
                    </div>
                </div>

            ))}

            <TableRow>

                <CircularPagination
                    totalPages={Math.ceil(tableData.length / rowsPerPage)} // Calculate the total number of pages
                    activePage={activePage}
                    onPageChange={handlePageChange}
                />
            </TableRow>
        </div>
    );
};

export default DashboardTable;

