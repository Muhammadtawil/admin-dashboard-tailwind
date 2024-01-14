import { Tooltip } from '@mui/material';
import React from 'react';
import { IoMdCall } from "react-icons/io";
import { MdOutlineContactPhone, MdEmail } from 'react-icons/md'; // Import icons
import { TbWorldWww } from "react-icons/tb";
interface ContactsCards {
  name: string;
  email: string;
  Phone: string;
  description: string;
  website: string;
  key: any
}

const ContactsCards: React.FC<ContactsCards> = ({
  name,
  email,
  Phone,
  description,
  website,
  key,
}) => {
  return (
    <div key={key} className=" rounded-sm border border-stroke bg-white py-6 px-7.5  shadow-default dark:border-strokedark dark:bg-boxdark">

      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <div className='text-lg right-0 top-0 justify-items-end' >
          <MdOutlineContactPhone />
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white max-sm:text-sm max-sm:pr-3">
            {name}
          </h4>
          <p className='max-sm:text-sm pr-2'>{description}</p>

          {/* <span className="text-sm font-medium">{`Description: ${description}`}</span> */}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5  sm:gap-6 ">

          <Tooltip title={email}>



            <div className="text-2xl">

              <MdEmail />
            </div>


          </Tooltip>

          <Tooltip title={Phone}>
            <button
              className='GenerateQuote_next hover:text-secondary text-xl'
              // placeholder="Edit"
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
              // placeholder="Edit"
            // onClick={copyToClipboard}
            >
              <div className="text-2xl">

                <TbWorldWww />
              </div>

            </button>

          </Tooltip>

        </div>

      </div>

    </div>
  );
};

export default ContactsCards;
