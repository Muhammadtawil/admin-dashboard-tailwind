"use client"

import { TableHead, TableRow } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import StyledDialogTitle from "@/components/shared/StyledDialogTitle";
import MemberSelect from "@/components/tasks/member_select";
import { CircularPagination } from "@/components/tasks/pagination";
import { MdOutlineVisibility } from "react-icons/md";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { IoIosArrowDown } from "react-icons/io";
import { Blog } from "@/types/blogs";
import { blogData } from "../blogs/blogData";
import BlogAddComponent from "../blogs/AddBlogForm";
import React from "react";
import useOpenController from "@/hooks/useOpenControl";
import ClientSatsCard from "./clients_stats_card";
import ClientTableHead from "./client_table_head";
import { FormHead } from "./form_head";
import CLientsForm from "./clients_form";
import CardDataStats from "@/components/CardDataStats";
import { FaRegStickyNote } from "react-icons/fa";
import ClientExpandedRows from "./expanded_rows";







const ClientTable = ({clientsData,serviceList}:{clientsData:any,serviceList:any}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(5); // Set the fixed number of rows per page
  const [open, setOpen] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState("");
  const t=useTranslations('clientPage')
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Blog | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [active, setActive] = useState(1);
  const [showEditForm, setEditForm] = useState(false);
  const [expand, setExpand] = useState(false)
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());


  const habdleExpand = () => {
    setExpand(true);
  }

  // Function to toggle the expansion of a row
  const toggleRowExpansion = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };
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
  const { isOpen, toggle } = useOpenController(false);
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


  const filteredTasks = clientsData.filter(
    (client:any) =>
      !selectedStatus || client.clientStatus === selectedStatus
  );

  return (

    <div className="rounded-sm border border-stroke bg-white px-4 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
        <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
          My Cases
        </h4>
        <FormHead
          handleClickOpen={addForm}
          title={t('addClient')}
        />
      </div>
      {showForm && <CLientsForm onCreate={''} isEdit={isEdit} editedValues={selectedTask} onUpdate={''} serviceList={serviceList} UpdateImage={undefined} />}
    <ClientSatsCard/>
      <div className="max-w-full overflow-x-auto">



        <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
          <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
            Clients Table
          </h4>

        </div>
        <table className="w-1/2 table-auto">
       <ClientTableHead selectedStatus={selectedStatus} handleStatusFilterChange={handleStatusFilterChange}/>
          <tbody>
            {filteredTasks.slice(startIndex, endIndex).map((item:any, key:any) => (
              <React.Fragment key={key}>
         
                <tr key={key}>
                <td>
                <button
                        className="text-lg p-0 focus:outline-none"
                        onClick={() => toggleRowExpansion(key)}
                      >
                        <IoIosArrowDown />
                      </button>
          </td>
                  <td className="border-b border-[#eee] py-3 px-4 pl-2 dark:border-strokedark xl:pl-11">
       
                      
              
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                 

                    <p className="text-sm text-black dark:text-white">
                      {item.clientName}
                    </p>
                  </div>
                
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <p className="hidden text-black dark:text-white sm:block">
                      {item.clientPhone}
                    </p>
                  </div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.chosenServiceName}
                  </p>
                </td>
              
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${item.clientStatus === "COMPLETED"
                      ? "text-success bg-success"
                      : item.clientStatus === "PENDING"
                        ? "text-danger bg-danger"
                        : "text-warning bg-warning"
                      }`}
                  >
                    {item.clientStatus}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {item.clientEmail ? item.clientEmail : t('noEmail')}
                  </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {item.clientMessage ? item.clientMessage : t('noMsg')}
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
                {expandedRows.has(key) && (

<tr>
<td className="mb-4 col-span-8 row-span-3"  colSpan={9} >
<ClientExpandedRows/>

</td>
</tr>
              )}
                </React.Fragment>
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

export default ClientTable;
