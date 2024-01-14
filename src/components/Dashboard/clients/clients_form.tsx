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







export default function CLientsForm({  serviceList, onCreate, onUpdate, isEdit, editedValues, UpdateImage }: { serviceList: any, onCreate: any, onUpdate: any, isEdit: boolean, editedValues: any, UpdateImage: any }) {
    const t = useTranslations('clientPage')
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState('');
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const [language, setLanguage] = useState('');

  const [isNewImage, setNewImage] = useState(false);
  const [status, setStatus] = useState(isEdit ? editedValues.isFlag : null);
  const [blogTitle, setBlogTitle] = useState(isEdit ? editedValues.blogTitle : null);
  const [authorName, setAuthorName] = useState(isEdit ? editedValues.author.authorName : null);
  const [blogLang, setBlogLang] = useState(isEdit ? editedValues.blogLang : language);

  const [editorState, setEditorState] = useState(() => {
    if (isEdit) {
      const contentState = convertFromHTML(DOMPurify.sanitize(editedValues?.blogContent || ''));
      return EditorState.createWithContent(ContentState.createFromBlockArray(contentState.contentBlocks));
    } else {
      return EditorState.createEmpty();
    }
  });


  useEffect(() => {
    const hasText = editorState.getCurrentContent().hasText();
    setIsEditorEmpty(!hasText);
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setConvertedContent(htmlContent);
  }, [editorState]);
  console.log(convertedContent);

  function createMarkup(html: any) {
    return {
      __html: DOMPurify.sanitize(html)
    };
  }


  const [selectedImage, setSelectedImage] = useState<File>();
  const isFlag = editedValues?.isFlag === true ? "ready" : "not ready";

  const handleChange = (event: any) => {

    setStatus(event.target.value as string);

  };
  const handleLanguageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  }



  const handleUpdateImage = async () => {
    const formData = new FormData();
    // Append the selected image to the formData
    // if (selectedImage) {
    //   formData.append("image", selectedImage);
    // }

    await UpdateImage(editedValues.blogId);
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
          noValidate={false}
          action={async (formData) => {


            const editedContent = createMarkup(convertedContent)
            // formData.append('blogLang', `${language}`);
            // const data = new FormData();
            formData.append('blogContent', `${convertedContent}`);
            // if (selectedImage) {
            //   formData.append("image", selectedImage);
            // }
//             const blogImage = new FormData();
//             if (selectedImage) {
//               data.append("image", selectedImage);
//             }
//             const title = 'blogTitle'
//           const author='authorName'
//           const lang='blogLang'
//           const content='blogContent'
//           const statusblog="blogStatus"
//             data.append(title.replace(/['"]+/g, ''), 'blogTitle'.trim());
//             data.append(author.replace(/['"]+/g, ''), 'authorName'.trim());
//             data.append(lang.replace(/['"]+/g, ''), `${'arabic'}`);
//             data.append(content.replace(/['"]+/g, ''), String(status));
//             data.append(statusblog.replace(/['"]+/g, ''), `${convertedContent}`);
//             // Check if FormData is not empty
//             if (Array.from(data.entries()).length > 0) {
//               console.log('FormData is not empty');
//               console.log('Number of entries:', Array.from(data.entries()).length);
//             } else {
//               console.log('FormData is empty');
//             }
//             var someStr = 'He said "Hello, my name is Foo"';
// console.log(someStr.replace(/['"]+/g, ''));
// const blogTitlesTest = 'blogTitle'
// console.log(blogTitlesTest.replace(/['"]+/g, ''))
            isEdit ? await onUpdate(
              formData,
              editedValues.blogId,
              // editedValues.author.authorId
            ).then(() => {
              console.log(editedValues.blogId)
              console.log(editedValues.author.authorId)
              console.log(selectedImage)
              // handleClose();
              updateAlert(t('update'))
              handleUpdateImage();
            }) :
              await onCreate(formData)
                .then(() => {
                  console.log(Array.from(formData.values()));
                  successAlert(t('success'));
                  // handleUpdateImage();

                  document.querySelector('form')?.reset();
                  setEditorState(EditorState.createEmpty());

                })
                .catch((error: any) => {

                  console.error(error);
                });
          }}
        >
          {!isEditorEmpty && (
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
                {isEdit ? t('editBlog') : t('CreateBlog')}
              </Button>
            </Grid>

          )}
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <CustomTypography text={t('clientName')} />
              <TextField
                autoComplete="blogTitle"
                name="blogTitle"
                value={isEdit ? editedValues.blogTitle : blogTitle}
                required
                fullWidth
                id="Blog title"
                // label={t('blogTitle')}
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                  className: "client-input dark:text-white"
                }}
                InputLabelProps={{
                  className: "dark:text-white"
                }}
                onChange={handleChange}

              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <CustomTypography text={t('clientEmail')} />
              <TextField
                autoComplete="blogTitle"
                name="blogTitle"
                value={isEdit ? editedValues.blogTitle : blogTitle}
                required
                fullWidth
                id="Blog title"
                // label={t('blogTitle')}
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                  className: "client-input dark:text-white"
                }}
                InputLabelProps={{
                  className: "dark:text-white"
                }}
                onChange={handleChange}

              />
                      </Grid>
                      
            <Grid item xs={12} md={12} lg={12}>
              <CustomTypography text={t('clientPhone')} />
              <TextField
                autoComplete="blogTitle"
                name="blogTitle"
                value={isEdit ? editedValues.blogTitle : blogTitle}
                required
                fullWidth
                id="Blog title"
                // label={t('blogTitle')}
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                  className: "client-input dark:text-white"
                }}
                InputLabelProps={{
                  className: "dark:text-white"
                }}
                onChange={handleChange}

              />
            </Grid>
      
            {/* <TextField
                multiline
                minRows={10}
                autoComplete="blogContent"
                name="blogContent"
                required
                fullWidth
                id="blogContent"
                label={t('blogContent')}
                autoFocus
                InputProps={{
                  style: { borderRadius: 8 },
                }}
              /> */}

            <Grid item xs={12} md={12} lg={6} className="dark:bg-strokedark dark:text-white">
              <div >
                <label className="mb-3 block text-black dark:text-white dark:bg-strokedark">
                  {t('status')}
                </label>
                <div className="relative z-20 bg-white dark:bg-strokedark ">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 dark:text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                          fill="#637381"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                          fill="#637381"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <select
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-strokedark"
                    // value={(isEdit && language == '') ? editedValues.blogLang : blogLang}
                    name="blogLang"
                    onChange={handleLanguageChange}
                  >
                    <option value={"COMPLETED"} >{t('completed')}</option>
                 <option value={"PENDING"} >{t('pending')}</option>
                    <option value={"IN_PROGRESS"} >{t('inProgress')}</option>
                                      
                  </select>


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
            <Grid item xs={12} md={12} lg={6} className="dark:bg-strokedark dark:text-white">
              <div >
                <label className="mb-3 block text-black dark:text-white dark:bg-strokedark">
                  {t('service')}
                </label>
                <div className="relative z-20 bg-white dark:bg-strokedark ">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 dark:text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                          fill="#637381"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                          fill="#637381"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                  <select
  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-strokedark"
//   value={(isEdit && language === '') ? editedValues.blogLang : blogLang}
  name="blogLang"
//   onChange={handleLanguageChange}
>
  {serviceList.length==0? <option value="" disabled>
      ...loading
    </option>:serviceList.map((service:any, index:any) => (
    <option key={index} value={service.serviceTitle}>
      {service.serviceTitle}
    </option>
  ))}
</select>


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
                  {t('status')}
                </label>
                <div className="relative z-20 bg-white dark:bg-strokedark ">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 dark:text-white">
                    <GrStatusGood />
                  </span>
                  <select
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-strokedark"
                    value={(isEdit && status == '') ? editedValues.isFlag : status}
                    onChange={handleChange}
                  >
                    <option value={"ready"}>{t('no')}</option>
                    <option value={"not ready"}>{t('yes')}</option>
                  </select>


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




