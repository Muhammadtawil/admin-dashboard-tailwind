"use client";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { IoMdAdd } from "react-icons/io";
import Image from 'next/image'
import { GrStatusGood } from "react-icons/gr";


import { useTranslations } from 'next-intl'

import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { successAlert, updateAlert } from "@/components/shared/alerts/alerts";
import CustomTypography from "@/components/shared/formsComponents";
import { ContentState, EditorState, convertFromHTML, convertToRaw } from "draft-js";






export default function SubscribersForm({ onCreate, showForm }: { onCreate: any,showForm:any}) {
  const t = useTranslations('subscribersPage')

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
          noValidate={false}
          action={async (formData) => {


            await onCreate(formData)
                .then(() => {
                    showForm()
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
                { t('addSubscriber') }
              </Button>
            </Grid>

      
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <CustomTypography text={t('subscriberEmail')} />
              <TextField
                autoComplete="subscriberEmail"
                name="subscriberEmail"
                required
                fullWidth
                id="subscriberEmail"
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                  className: "client-input dark:text-white"
                }}
                InputLabelProps={{
                  className: "dark:text-white"
                }}
              />
            </Grid>

          </Grid>
        </Box>
      </Card>


    </>
  );
}




