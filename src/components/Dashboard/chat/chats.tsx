import * as React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { IoSend } from "react-icons/io5";

const messages = [
  { id: 1, text: "Hi there!", sender: "bot" },
  { id: 2, text: "Hello!", sender: "user" },
  { id: 3, text: "How can I assist you today?", sender: "bot" },
];

const ChatUI = () => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      console.log(input);
      setInput("");
    }
  };

  const handleInputChange = (event:any) => {
    setInput(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column"  } } className='w-100 bg-body rounded-md p-4 h-80 overflow-y-auto'>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2} className="bottom-0">
        <div className="p-4 border-t flex">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              // value={userInput}
              // onChange={(e) => setUserInput(e.target.value)}
              // onKeyUp={handleUserInputKeyUp}
            />
            <button
              id="send-button"
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              // onClick={handleSendButtonClick}
            >
              Send
            </button>
          </div>
        </Grid>
      </Box>
    </Box>
  );
};

const Message = ({ message }:any) => {
  const isBot = message.sender === "bot";

  return (
    <Box
      className='w-96'
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          p: 1,
          backgroundColor: isBot ? "primary.light" : "secondary.light",
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatUI;