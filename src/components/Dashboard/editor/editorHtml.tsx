"use client"
// Import necessary dependencies
import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
// import mammoth from "mammoth";
import { saveAs } from "file-saver";
import { Box, Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";


import { useTranslations } from "next-intl";

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const t=useTranslations('editorPage')

  const handleSaveToDocx = () => {
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(htmlContent)
    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], {
      type: "application/msword",
    });

    saveAs(blob, "document.docx");
  };
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
  
  const customStyleMap = {
    // Add your custom styles here
    'EditorStyle': {
      // Your custom CSS styles
      // For example:
    "color":'black'
      // other styles...
    },
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        

         {/* <PageTitle title={t('pageTitle')}/> */}
      {/* <Box
        sx={{
          // display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #EEF0F7",
          paddingBottom: "10px",
          mb: "20px",
         
        }}
        className="client-box"
      >
        <Button
          onClick={handleSaveToDocx}
          style={{
            textTransform: "capitalize",
            borderRadius: "8px",
            fontWeight: "500",
            fontSize: "13px",
            padding: "12px 20px",
            color: "#fff",
            backgroundColor: "#1976D2",
        alignItems:"self-end",
            border: "none",
          }}
        >
          <IoMdAdd
            sx={{ position: "relative", top: "-1px" }}
            className="mr-5px"
          />
        {t('saveFile')}
        </Button>
      </Box> */}
      
        <div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                    My Editor
                </h4>
                <FormHead
                    handleClickOpen={handleSaveToDocx}
                    title={t('saveFile')}
                />
            </div>
        <Editor
          
          editorState={editorState}
          onEditorStateChange={setEditorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class client-input client-box dark:text-white"
          toolbarClassName="toolbar-class dark:bg-meta-4 dark:text-black "
          // className=" dark:bg-meta-4"
          customStyleMap={customStyleMap}
          editorStyle={{ border: "1px solid black" }} 
          
        />
      
       </div>
        
    </>
  );
};

export default MyEditor;
