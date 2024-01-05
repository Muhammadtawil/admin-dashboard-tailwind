"use client"
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { ClearIcon } from "@mui/x-date-pickers/icons";
// import SearchForm from "../TopNavbar/search/SearchForm";
import { useTranslations } from "next-intl";
import { getStatusTranslationKey } from "./tables";
import { useState } from "react";

const CustomTypography = ({ text }: { text: any }) => {
  return (
    <Typography
      component="h5"
      sx={{
        fontWeight: "500",
        fontSize: "14px",
        mb: "12px",
      }}
      className= "dark:text-white"
    >
      {text}
    </Typography>
  );
};

export default CustomTypography;

export const CustomTextField = ({ name, label, type = "text", isrequired, isEdit, EditValue }: { name: any, label: any, type: string, isrequired: boolean, isEdit: boolean, EditValue: any }) => {
  const [value, setValue] = useState(isEdit ? EditValue : '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Grid item xs={12} md={12} lg={6}>
      <CustomTypography text={label} />

      <TextField
        className="dark:text-white"
        autoComplete={name}
        name={name}
        required={isrequired}
        fullWidth
        id={name}
        type={type}
        label={label}
        autoFocus
        multiline
        value={value}
        onChange={handleChange}  // Handle changes to update the local state
        InputLabelProps={{
          className: 'text-white', // Apply custom class for label color
        }}
      />
    </Grid>
  );
};

export const CustomSelect = ({
  name,
  label,
  values,
  selectedValue,
  onChange,

}: any) => {
  const t = useTranslations('taskPage')
  return (
    <Grid item xs={12} md={12} lg={6}>
      <CustomTypography text={label} />
      <Select
        fullWidth
        value={t(getStatusTranslationKey(selectedValue))}
        name={name}
        onChange={onChange}
        displayEmpty
        inputProps={{
          style: { borderRadius: 8 },
        }}
      >
        <MenuItem value="" disabled>
          {`Select ${label}`}
        </MenuItem>
        {values.map((key: any, index: any) => (
          <MenuItem key={index} value={key}>
            {t(key)} {/* Translate the value using the t function */}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  )
};

export const FormHead = ({
  handleClickOpen,
  title,
}: {
  handleClickOpen: any;
  title: any;
}) => {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #EEF0F7",
        paddingBottom: "10px",
        mb: "20px",
    
      }}
      className="formHead client-box"
    >
      {/* <SearchForm /> */}
      <Button
        onClick={handleClickOpen}
        variant="contained"
        className="headButton "
        sx={{
          textTransform: "capitalize",
          // borderRadius: "8px",
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

export const FormFooter = ({
  handleClose,
  title,
}: {
  handleClose: any;
  title: any;
}) => {

  const t = useTranslations('taskPage')
  return (
    <Grid item xs={12} textAlign="end" className="flex flex-1">
      <Button
        // variant="contained"
        className=" bg-danger dark:bg-danger py-1  flex-auto hover:bg-meta-7 dark:text-white"
      
        sx={{
          mt: 1,
          textTransform: "capitalize",
          borderRadius: "8px",
          fontWeight: "500",
          fontSize: "13px",
          padding: "12px 20px",
          // color: "#fff !important",
        }}
        onClick={handleClose}
        // className="mr-15px bg-danger "
      >
        <ClearIcon
          sx={{
            position: "relative",
            top: "-1px",
          }}
          className="mr-5px"
        />
        {t('cancel')}
      </Button>
      <div className="w-2">
        
</div>
      <Button
        className=" bg-black dark:bg-body py-1  flex-auto"
        type="submit"
        variant="contained"
        sx={{
          mt: 1,
          textTransform: "capitalize",
          borderRadius: "8px",
          fontWeight: "500",
          fontSize: "13px",
          padding: "12px 20px",
          color: "#fff !important",
          background: "#040831",

        }}
      >
        <IoMdAdd
          sx={{
            position: "relative",
            top: "-1px",
          }}
          className="mr-5px "
        />
        {title}
      </Button>
    </Grid>
  );
};

export const HeadBox = ({
  handleClose,
  title,
}: {
  handleClose: any;
  title: any;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#EDEFF5",
        // borderRadius: "8px",
        padding: "20px 20px",
      }}
      className="bg-black dark:bg-strokedark "
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        className="text-black dark:text-white"
        sx={{
          fontWeight: "500",
          fontSize: "20px",
        }}
      >
        {title}
      </Typography>

      <IconButton
        aria-label="remove"
        size="small"
        onClick={handleClose}
        className="modal-close"
      >
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export const ValuesSelect = ({ name, values, isrequired, dicName, optionValue,isEdit,editValue }: { name: any; values?: any; isrequired: boolean, dicName: string, optionValue: string,isEdit:any,editValue:any }) => {
  const t = useTranslations(dicName)
  const options = Array.isArray(values)
    ? values.map((value: any, index: any) => (
      <option key={index} value={values[index]}>
        {t(values[index])}
      </option>
    ))
    : null;

  return (
    <select
    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-strokedark"
      name={name}
      style={{
        height: "55px",
        width: "100%",
        borderRadius: "3%",
      }}
      required={isrequired}
    >
      <option value={isEdit?editValue:''} className="client-box client-input bg-white dark:bg-strokedark dark:text-white">{isEdit?t(editValue):t(optionValue)}</option>
      {options || <option value={isEdit?editValue:''} disabled>Loading...</option>}
    </select>
  );
};



// export const handleInputChange = (

//   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// ) => {
//   const { name, value } = e.target;
//   setFormData((prevFormData) => ({
//     ...prevFormData,
//     [name]: value,
//   }));
// };
