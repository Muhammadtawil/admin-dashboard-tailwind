import { Avatar, Box, Fab, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { IoIosChatboxes } from 'react-icons/io';

import EmojiPicker from 'emoji-picker-react';
import { Picker } from 'emoji-mart';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const Chatbox: React.FC = () => {
  const [isChatboxHidden, setChatboxHidden] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiObject: any, event: MouseEvent) => {
    setUserInput((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
  
    
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleChatbox = () => {
    setChatboxHidden((prev) => !prev);
  };

  const addUserMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), content: message, isUser: true },
    ]);
  };

  const addBotMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), content: message, isUser: false },
    ]);
  };

  const respondToUser = (userMessage: string) => {
    setTimeout(() => {
      addBotMessage(`${userMessage}`);
      scrollToBottom(); // Scroll to the bottom after adding a new message
    }, 500);
  };

  const handleSendButtonClick = () => {
    if (userInput.trim() !== '') {
      addUserMessage(userInput);
      respondToUser(userInput);
      setUserInput('');
    }
  };

  const handleUserInputKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && userInput.trim() !== '') {
      addUserMessage(userInput);
      respondToUser(userInput);
      setUserInput('');
    }
  };

  const handleEmojiClick = (emoji: any) => {
    setUserInput((prevInput) => prevInput + emoji.native);
  };

  // useEffect(() => {
  //   // Automatically open the chatbox on page load
  //   toggleChatbox();
  // }, []);

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

    return (
      
    <div>
      <div className="fixed bottom-0 right-2 mb-4 mr-4 ">
        <Fab color="primary" className="bg-black  ">
          <button
            id="open-chat"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
            onClick={toggleChatbox}
          >
            <IoIosChatboxes className="text-2xl" />
          </button>
        </Fab>
      </div>
      <div
        id="chat-container"
        className={`fixed bottom-16 right-4 w-96 ${
          isChatboxHidden ? 'hidden' : ''
        }`}
        style={{ position: 'fixed', zIndex: 9999 }}
      >
        <div className="bg-whiter shadow-md rounded-lg max-w-lg w-full border border-black-2 dark:bg-strokedark dark:border-white">
          <div className="p-4 border-b bg-gray-2 border-black-2 text-black-2 rounded-t-lg flex justify-between items-center dark:bg-strokedark dark:text-white">
            <p className="text-lg font-semibold  ">Team Chat</p>
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={toggleChatbox}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 max-h-80 overflow-y-scroll">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
                    <div className="p-4 border-t flex">
             
   
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-strokedark pr-2 rounded-lg"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyUp={handleUserInputKeyUp}
            />
            <button
              id="emoji-button"
              className="text-xl focus:outline-none ml-2 pr-2"
              onClick={() => setShowPicker((val) => !val)}
            >
              😊
                        </button>

            <button
              id="send-button"
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300 rounded-lg"
              onClick={handleSendButtonClick}
            >
              Send
            </button>
          </div>
          {showPicker && (
                            <div>
                            <EmojiPicker onEmojiClick={onEmojiClick} />
         </div>
        )}
        
        </div>
      </div>
    </div>
  );
};

export default Chatbox;

const Message = ({ message }: any) => {
  const isBot = !message.isUser;

  return (
    <Box
      className="text-white "
      sx={{
        display: 'flex',
        flexDirection: 'row', // Changed to row layout
        alignItems: 'center', // Center align items in row
        mb: 2,
        justifyContent: message.isUser ? 'flex-end' : 'flex-start', // Align messages to the right for user and left for bot
      }}
    >
      {/* Conditional rendering for Avatar only for user messages */}
      {message.isUser ? (
        <>
          <Paper
            variant="outlined"
            sx={{
              p: 1, // Adjusted padding
              backgroundColor: isBot ? 'primary.light' : 'secondary.light',
              display: 'flex',
              flexDirection: 'column', // Updated to column layout
            }}
          >
            <Typography variant="body1">{message.content}</Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="caption" sx={{ mr: 1 }}>
                {new Date(message.id).toLocaleTimeString()}
              </Typography>
              <IoMdCheckmark />
            </Box>
          </Paper>
          <Avatar src="/images/user/user-01.png" sx={{ marginLeft: 1 }} />
        </>
      ) : (
        <>
          <Avatar src="/images/user/user-02.png" sx={{ marginRight: 1 }} />
          <Paper
            variant="outlined"
            sx={{
              p: 2, // Adjusted padding
              backgroundColor: isBot ? 'primary.light' : 'secondary.light',
              display: 'flex',
              flexDirection: 'column', // Updated to column layout
            }}
          >
            <Typography variant="body1">{message.content}</Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="caption" sx={{ mr: 1 }}>
                {new Date(message.id).toLocaleTimeString()}
              </Typography>
              <IoMdCheckmark />
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};
