'use client'
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useLocale, useTranslations } from 'next-intl'
import { arLocale, enLocale } from '../../../../../localeConfig copy'
import StyledDialogTitle from '@/components/shared/StyledDialogTitle'
import { Box, Grid } from '@mui/material'
import CustomTypography, { CustomTextField, FormFooter, HeadBox, ValuesSelect } from '@/components/shared/formsComponents'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers'
import { usePathname } from 'next/navigation'
const statusValues = ["completed", "postponed", "cancelled","pending"];
const priorityValues = ["HIGH", "MEDIUM", "LOW"];
export default function TraineeSessions() {
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
  const [selectedTask, setSelectedTask] = useState<null | any>();
  

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleAddClickOpen = () => {
    setOpen(true)
}

    function renderEventContent(eventInfo:any) {
        return (
          <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
          </>
        )
      }

  
    return (
        <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <FullCalendar
                   initialView="dayGridMonth"
                   plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                //    events={events}
                   displayEventEnd={false}
                   // eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                   eventColor="#040831"
                   selectable={true}
                   locales={[arLocale, enLocale]}
                   locale={locale == 'ar' ? 'ar-LB' : 'en'}
                
                   editable={true}
                   headerToolbar={{
                     left: 'prev,next today',
                     center: 'title',
                     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                   }}
                   // eventBackgroundColor={events.eventStatus=='public'?"green":"red" }
          eventClick={handleAddClickOpen}
          dateClick={handleAddClickOpen}
      
          
          nowIndicator={true}
          selectMirror={true}
          resources={[
            { id: 'a', title: 'Auditorium A' },
            { id: 'b', title: 'Auditorium B', eventColor: 'green' },
            { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
          ]}
          initialEvents={[
            { title: 'nice event', start: new Date(), resourceId: 'a' }
          ]}
        />

<StyledDialogTitle
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}

            >
                <Box className="dark:bg-strokedark dark:text-white">
                    <HeadBox handleClose={handleClose} title={'Add Session'} />

                    <Box
                        className="client-box"
                        component="form"
                        noValidate={false}
                    // action={(formData) => {
                    //     formData.append('taskDeadline', value ? value.format() : '');
                    //     {
                    //         isEdit ?
                    //             onUpdate(
                    //     formData,
                    //     isAssigned ? selectedTask.assignedTaskId : selectedTask.taskId
                    //   ).then(() => {
                    //   handleClose();
                    //   updateAlert(t('editAlert'));
                        
                    //   }):     OnCreate(formData).then(() => {
                    //     handleClose();
                    //     successAlert(t('success'));


                    //   });}
                 
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
                            <Grid container alignItems="center" spacing={2} >
                                <CustomTextField name="taskTitle" label={'Court'} isrequired={true} type="text" isEdit={isEdit} EditValue={selectedTask?.taskTitle} />

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
                             <CustomTextField name="Court" label={'Type'} isrequired={true} type="text" isEdit={isEdit} EditValue={selectedTask?.taskTitle} />



                                <FormFooter handleClose={handleClose} title={'addTask'} />
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </StyledDialogTitle>
            </div>
  )
}
