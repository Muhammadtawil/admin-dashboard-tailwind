"use client"
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import ReferencesBooks from './references-books';
import { Stack } from '@mui/material';





const ReferencesComponent = ({ files }: { files: any }) => {
    const [selectedFile, setSelectedFile] = useState<File | ''>();

    const t = useTranslations('webFilesPage')
    return (
        <>
        {Object.keys(files).map((folderName, index) => (
        <div key={index} className=" rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">

<div className="flex flex-1 justify-items-center py-6 px-4 md:px-6 xl:px-7.5 max-sm:flex space-x-9  ">
                <h4 className="flex flex-1 text-xl font-semibold text-black dark:text-white order-1 max-sm:flex space-x-9 ">
                   {folderName}
                </h4>

            </div>
      
                <ReferencesBooks data={files[folderName].files}/>

        
          
                </div>
            ))}
            
            </>
    );
};

export default ReferencesComponent;
