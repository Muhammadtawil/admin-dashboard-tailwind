import StyledDialogTitle from '@/components/shared/StyledDialogTitle';
import { CustomTextField, FormFooter, HeadBox } from '@/components/shared/formsComponents';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react'
import { FaRegStickyNote } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
export default function ClientExpandedRows() {
    const notesList: any[] = ['a', 'b', 'c'];
    // const [notes, setNotes] = useState(['']);
    // const [editableIndex, setEditableIndex] = useState(null);
    const [open, setOpen] = useState(false);
    // const [newNote, setNewNote] = useState('');
    const addNote = (newNote: any) => {
        // You can use setNotes to update the state
        notesList.push(newNote)
        // setNotes(prevNotes => [...prevNotes, `${newNote}` ]);
        // handleClose();
    };
    // const startEditing = (index:any) => {
    //     setEditableIndex(index);
    // };

    // const stopEditing = () => {
    //     setEditableIndex(null);
    // };

    // const handleNoteChange = (index:any, newText:any) => {
    //     setNotes(prevNotes => {
    //         const updatedNotes = [...prevNotes];
    //         updatedNotes[index] = newText;
    //         return updatedNotes;
    //     });
    //     stopEditing();
    // };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddClickOpen = () => {

        setOpen(true)
    }
    const [fileInput, setFileInput] = useState(null);

    const handleIconClick = () => {
      if (fileInput) {
        fileInput.click();
      }
    };
  
    const handleFileChange = (event:any) => {
      // Handle the selected file
      const selectedFile = event.target.files[0];
      console.log('Selected File:', selectedFile);
    };
    return (
        <div className="col-span-3 grid grid-cols-1 gap-3 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
    

            <div className=" rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            
                <div className='grid grid-cols-2 gap-10 right-1 top-1 max-sm:left-0 max-sm:grid-cols-1 '>
                  
                    <h4 className="row-start-1 text-title-md font-bold text-black dark:text-white">
                            {'Client Notes'}
                    </h4>
                    <div className="row-start-1 flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4" onClick={handleAddClickOpen}>
                    <MdAddCircleOutline className='text-2xl'/>
                        
                    </div>
                </div>
               
              
                 
              
                <div className="mt-4 flex items-end justify-between">
               

                    <span
                        className="flex items-center gap-1 text-sm font-medium text-meta-3" >
                        <div className="mt-1">
                            <div className='grid grid-cols-1 gap-1 list-disc'>
                                {notesList.map((note, index) => (
                                    <ol key={index}>

                                        <li >{note}</li>

                                    </ol>
                                ))}
                            </div>
                        </div>


                    </span>
                </div>

            </div>

            <div className=" rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className='grid grid-cols-2 gap-10 right-1 top-1 max-sm:left-0 max-sm:grid-cols-1 '>
                  
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                            {'Client Files'}
                    </h4>
                    <div>
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <MdAddCircleOutline onClick={handleIconClick} />
      </div>
      {/* Hidden file input */}
      <input
        type="file"
        ref={(input) => setFileInput(input)}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
                </div>
               
              
                 
              
                <div className="mt-4 flex items-end justify-between">
               

                    <span
                        className="flex items-center gap-1 text-sm font-medium text-meta-3" >
                        <div className="mt-1">
                            <div className='grid grid-cols-1 gap-1 list-disc'>
                                {notesList.map((note, index) => (
                                    <ol key={index}>

                                        <li >{note}</li>

                                    </ol>
                                ))}
                            </div>
                        </div>


                    </span>
                </div>

            </div>

            <div className=" rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className='grid grid-cols-2 gap-10 right-1 top-1 max-sm:left-0 max-sm:grid-cols-1 '>
                  
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                            {'Assign'}
                    </h4>
                    <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <MdAddCircleOutline />
                        
                    </div>
                </div>
               
              
                 
              
                <div className="mt-4 flex items-end justify-between">
               

                    <span
                        className="flex items-center gap-1 text-sm font-medium text-meta-3" >
                        <div className="mt-1">
                            <div className='grid grid-cols-1 gap-1 list-disc'>
                                {notesList.map((note, index) => (
                                    <ol key={index}>

                                        <li >{note}</li>

                                    </ol>
                                ))}
                            </div>
                        </div>


                    </span>
                </div>

            </div>

            <StyledDialogTitle
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}

            >
                <Box className="dark:bg-strokedark dark:text-white">
                    <HeadBox handleClose={handleClose} title={'addTask'} />

                    <Box
                        className="client-box"
                        component="form"
                        noValidate={false}
                        onSubmit={()=>addNote('a')}
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
                                <CustomTextField name="taskTitle" label={'note'} isrequired={true} type="text" isEdit={false} EditValue={''} />







                                <FormFooter handleClose={handleClose} title={'addTask'} />
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </StyledDialogTitle>
        </div>

    )
}
