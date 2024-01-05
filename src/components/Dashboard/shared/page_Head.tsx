import { Box, Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";

export const FormHead = ({
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
