"use client";
import { Box} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { IoMdAdd } from "react-icons/io";
import { GrStatusGood } from "react-icons/gr";
import { useTranslations } from 'next-intl'
import {useState } from "react";
import { successAlert, updateAlert } from "@/components/shared/alerts/alerts";
import CustomTypography, { ValuesSelect } from "@/components/shared/formsComponents";


const serviceStatus = ["AVAILABLE", "NOT_AVAILABLE"];
const flagStatus = ["Yes", "No"];




export default function ServicesForm({ onCreate, onUpdate, isEdit, editedValues, showForm }: { onCreate: any, onUpdate: any, isEdit: boolean, editedValues: any,showForm:any}) {
  const t = useTranslations('servicesPage')
  const [status, setstatus] = useState('');
// State to hold the edited values separately
const [editedServiceTitle, setEditedServiceTitle] = useState(isEdit ? editedValues.serviceTitle : '');
const [editedServiceDescription, setEditedServiceDescription] = useState(isEdit ? editedValues.serviceDescription : '');
  const isFlag = editedValues?.isFlag === true ? "Yes" : "No";

  const handleChange = (event: any) => {
 
    setstatus(event.target.value as string);

  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedServiceTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedServiceDescription(event.target.value);
  };



  return (
    <>

      <Card
        className="dark:bg-strokedark"
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box

                  component="form"
                  id="form"
          noValidate={false}
                  action={async (formData) => {
                     
            isEdit? await onUpdate(
              formData,
              editedValues.serviceId,
            //   editedValues.author.authorId
            ).then(() => {
                showForm()
                document.querySelector('form')?.reset();
              // handleClose();
              updateAlert(t('update'))
            
            }):
            await onCreate(formData)
                    .then(() => {
                        showForm();
                successAlert(t('success'));

                  document.querySelector('form')?.reset();
                  
          
              })
              .catch((error: any) => {

                console.error(error);
              });
          }}
        >
        
            <Grid item xs={12} textAlign="end">
              <Button
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
                }}
              >
                <IoMdAdd
                  sx={{
                    position: "relative",
                    top: "-2px",
                  }}
                  className="mr-5px"
                />
                {isEdit ? t('editService') : t('addService')}
              </Button>
            </Grid>


          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <CustomTypography text={t('serviceTitle')} />
              <TextField
                autoComplete="serviceName"
                name="serviceName"
                value={editedServiceTitle}
                required
                fullWidth
                id="serviceTitle"
            
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                  className: "client-input dark:text-white"
                }}
                InputLabelProps={{
                  className: "dark:text-white"
                }}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <CustomTypography text={t('serviceDescription')} />
              <TextField
                autoComplete="serviceDescription"
                name="serviceDescription"
                value={editedServiceDescription}
                required
                fullWidth
                              id="serviceDescription"
                              onChange={handleDescriptionChange}
             
                              autoFocus
                              multiline
                              minRows={5}
                InputProps={{
                  style: { borderRadius: 8 },
                  className: "client-input dark:text-white"
                }}
                InputLabelProps={{
                  className: "dark:text-white"
                }}
              />
            </Grid>
    


   

            <Grid item xs={12} md={12} lg={6} className="dark:bg-strokedark dark:text-white">
              <div >
                <label className="mb-3 block text-black dark:text-white dark:bg-strokedark">
                  {t('status')}
                </label>
                <div className="relative z-20 bg-white dark:bg-strokedark ">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 dark:text-white">
                    <GrStatusGood />
                  </span>
                  <ValuesSelect name={"serviceStatus"} values={serviceStatus} isrequired={true} dicName='servicesPage' optionValue='status' isEdit={isEdit} editValue={isEdit?editedValues.serviceStatus:''} />

                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </Grid>
            {isEdit ? <Grid item xs={12} md={12} lg={6} className="dark:bg-strokedark dark:text-white">
              <div >
                <label className="mb-3 block text-black dark:text-white dark:bg-strokedark">
                  {t('onWeb')}
                </label>
                <div className="relative z-20 bg-white dark:bg-strokedark ">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 dark:text-white">
                    <GrStatusGood />
                  </span>
                  <ValuesSelect name={"isFlag"} values={flagStatus} isrequired={true} dicName='servicesPage' optionValue='onWeb' isEdit={isEdit} editValue={isFlag} />


                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </Grid> : null}
          


          </Grid>
        </Box>
      </Card>


    </>
  );
}




