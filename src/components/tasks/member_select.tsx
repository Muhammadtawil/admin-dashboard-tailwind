"use client"
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Button, Grid, InputLabel, Typography } from "@mui/material";
import { MdClear } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import CustomTypography from "../shared/formsComponents";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { AssignTaskAlert } from "../shared/alerts/alerts";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250, // Adjust this width as needed
    },
  },
};

function getStyles(name: string, personName: string[], theme: any) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MemberSelect({
  usersName,
  selectedTask,
  onSelectMember,
  handleClose,
}: {
  usersName: any[];
  selectedTask: any;
  handleClose: any;
  onSelectMember: any;
}) {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const { data: session } = useSession();
  const t=useTranslations('taskPage')
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;

    const namesArray = typeof value === "string" ? value.split(",") : value;

    setPersonName(namesArray);
  };

  // Filter out the active user from the list
  const filteredUsers = usersName.filter(user => user.userId !== session?.userId); // Replace `activeUserId` with the actual ID of the active user

  return (
    <Box className="dark:bg-strokedark">
      <Box
        className="dark:bg-strokedark"
        component="form"
        noValidate={false}
        action={(formData) => {
          onSelectMember(formData, selectedTask.taskId).then(() => {
            handleClose();
            AssignTaskAlert();
          });
        }}
      >
        <Box
          sx={{
            // background: "#fff",
            padding: "20px 20px",
            borderRadius: "8px",
          }}
          className="dark:bg-strokedark"

        >
          <Grid item xs={12} md={12} lg={6} className="dark:bg-strokedark">
            <CustomTypography text={t('selectMember')} />
            <InputLabel htmlFor="select-multiple-chip" className="dark:text-white">  {t('selectMember')}</InputLabel>
            <Select
              className="dark:bg-strokedark dark:text-white hover:text-black"
              fullWidth
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              name="usersId"
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              MenuProps={{
                    sx: {
                      "&& .Mui-selected": {
                        backgroundColor: "green"
                      },
                      "& option": {
                        background: theme.palette.background.default,
                        
                      }

                      
                    }
              }}
         
              inputProps={{ className:'dark:bg-strokedark dark:text-white hover:text-black'}}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }} className='dark:bg-strokedark'>
                  {selected.map((value) => (
                    <Chip
                      className="bg-body hover:text-black dark:text-white"
                      key={value}
                      label={filteredUsers.find((user) => user.userId === value)?.userName}
                    />
                  ))}
                </Box>
              )}
            >
              {filteredUsers.map((name: any) => (
                // Disable selection for the active user
                <MenuItem
                  className="dark:bg-strokedark dark:text-white hover:text-black active:bg-transparent "
                  key={name.userName}
                  value={name.userId}
                  
                  // Use user.userId as the value
                  // MenuProps={{
                  //   sx: {
                  //     "&& .Mui-selected": {
                  //       backgroundColor: "pink"
                  //     }
                  //   }
                  // }}
                  sx={{
                    "&:hover": {
                      className:"dark:bg-black",
                        border: "3px solid green",
                      backgroundColor: 'green',
                      
                      "&& .Mui-selected": {
                        backgroundColor: "pink"
                      }
                    }
                  }}
                  // style={getStyles(name.userName, personName, theme)}
                  disabled={name.userId === session?.userId} // Disable selection for the active user
                >
                  {name.userName}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Button
        className="dark:bg-strokedark text-black-2 dark:text-white"
            
            // variant="contained"
            // color="black"
            sx={{
              mt: 1,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "12px 20px",
              // color: "black",
            }}
            onClick={handleClose}
            // className="mr-15px"
          >
            <MdClear 
              sx={{
                position: "relative",
                top: "-1px",
              }}
              className="mr-5px dark:bg-strokedark dark:text-white"
            />
            {t('cancel')}
          </Button>

          <Button
             className="dark:bg-body text-black-2 dark:text-white"
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              textTransform: "capitalize",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "13px",
              padding: "12px 20px",
              // color: "#fff !important",
            }}
          >
            <IoMdAdd
              sx={{
                position: "relative",
                top: "-1px",
              }}
              className="mr-5px"
            />
         {t('selectMember')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
