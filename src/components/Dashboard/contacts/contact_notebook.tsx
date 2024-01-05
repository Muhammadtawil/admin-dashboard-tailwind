import { Tooltip } from '@mui/material';
import React from 'react';
import { IoMdCall } from "react-icons/io";
import { MdOutlineContactPhone, MdEmail } from 'react-icons/md'; // Import icons
import { TbWorldWww } from "react-icons/tb";
interface ContactsNoteBookCards {
    name: string;
    email: string;
    Phone: string;
    description: string;
    website: string;
    key: any
}

const ContactsNoteBook: React.FC<ContactsNoteBookCards> = ({
    name,
    email,
    Phone,
    description,
    website,
    key,
}) => {
    return (
        <div key={key} className=" rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">

         

            <div className="notebook ">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                <div className='text-lg right-0 top-0 justify-items-end' >
                    <MdOutlineContactPhone />
                </div>
            </div>
                <div className="ribbon">

                </div>

                <div className="wrapper ">
                    <h1 className='text-lg'>{name}</h1>
                    <p className='justify-center text-center'>{description}</p>
                    <span
                        className={` flex items-center gap-1 text-sm font-medium absolute inset-x-0 bottom-0 justify-center  dark:text-white pb-3`}
                    >



                        <div className="flex items-center justify-center gap-3.5 pt-4">

                            <Tooltip title={email}>



                                <div className="text-2xl">

                                    <MdEmail />
                                </div>


                            </Tooltip>

                            <Tooltip title={Phone}>
                                <button
                                    className='GenerateQuote_next hover:text-secondary text-xl'
                                    placeholder="Edit"
                                // onClick={copyToClipboard}
                                >
                                    <div className="text-2xl">

                                        <IoMdCall />
                                    </div>

                                </button>

                            </Tooltip>

                            <Tooltip title={website}>
                                <button
                                    className='GenerateQuote_next hover:text-secondary text-xl'
                                    placeholder="Edit"
                                // onClick={copyToClipboard}
                                >
                                    <div className="text-2xl">

                                        <TbWorldWww />
                                    </div>

                                </button>

                            </Tooltip>

                        </div>


                    </span>


                </div>
            </div>
        </div>
    );
};

export default ContactsNoteBook;
