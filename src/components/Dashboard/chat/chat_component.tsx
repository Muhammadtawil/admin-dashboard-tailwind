/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Fab, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { IoIosChatboxes } from 'react-icons/io';
// import socketService from '../services/socketService';
import EmojiPicker from 'emoji-picker-react';
import { Picker } from 'emoji-mart';
// import socketService from '@/server/chat/socketService';
import { io, Socket } from 'socket.io-client';
import { useSession } from "next-auth/react";
import { WebsocketContext, WebsocketProvider } from './WebsocketContext';
import { Session } from 'inspector';
// Replace with your server URL
interface Message {

  content: string;
  isUser: boolean;
}
type MessagePayload = {
  content: string;
  msg: string;

};


const Chatbox= () => {
  const [isChatboxHidden, setChatboxHidden] = useState(true);
  // const [messages, setMessages] = useState<Message[]>([]);
  const { data: session } = useSession();
  const [newMessage, setNewMessage] = useState('');
  const [userInput, setUserInput] = useState<string>('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [userData, setUserData] = useState<any[]>([]);

  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebsocketContext);
const usersUrl=process.env.NEXT_PUBLIC_USERS_URL
  const chatUrl = process.env.NEXT_PUBLIC_CHAT_URL;
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch(`${chatUrl}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch(`${usersUrl}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUserData(data);
        } else {
          console.error('Invalid user data format:', data);
        }
        setLoading(false);
      })
  }, [])


  const onEmojiClick = (emojiObject: any, event: MouseEvent) => {
    setUserInput((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
  const [data, setData] = useState<Message[]>([]);

  const handleDataReceived = (newData: any) => {
    setData((prevData) => [...prevData, newData]);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // useEffect(() => {
  //   // Listen for incoming messages
  //   socket.on('OnMessage', (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });
  // }, []);

  const sendMessage = () => {
    socket.emit('NewMessage', newMessage);
    setNewMessage('');
  };


  const toggleChatbox = () => {
    setChatboxHidden((prev) => !prev);

    // Connect or disconnect from WebSocket based on chatbox visibility
    // if (isChatboxHidden) {
    //   socketService.connect((message: any) => {
    //     setMessages((prevMessages) => [...prevMessages, message]);
    //   });
    // } else {
    //   socketService.disconnect();
    // }
  };

  // const addUserMessage = (message: string) => {
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { createdBy:session?.userId, content: message, isUser: true },
  //   ]);
  // };

  // const addBotMessage = (message: string) => {
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { id: Date.now(), content: message, isUser: false },
  //   ]);
  // };

  // const respondToUser = (userMessage: string) => {
  //   setTimeout(() => {
  //     addBotMessage(`${userMessage}`);
  //     scrollToBottom(); // Scroll to the bottom after adding a new message
  //   }, 500);
  // };

  const handleSendButtonClick = () => {
    console.log('Send button clicked');
    if (userInput.trim() !== '') {
      console.log('Sending message:', userInput);
      // socketService.sendMessage(userInput);
      setUserInput('');
    }
  };

  // const handleUserInputKeyUp = (
  //   event: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (event.key === 'Enter' && userInput.trim() !== '') {
  //     addUserMessage(userInput);
  //     respondToUser(userInput);
  //     setUserInput('');
  //   }
  // };

  const handleEmojiClick = (emoji: any) => {
    setValue((prevInput) => prevInput + emoji.emoji);
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();

    // Cleanup function to disconnect when unmounting or hiding chatbox
    return () => {
      // socketService.disconnect();
    };
  }, [messages])





  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected!');
    });
    socket.on('OnMessage', (newMessage: MessagePayload) => {
      console.log('OnMessage event received!');
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      console.log('Unregistering Events...');
      socket.off('connect');
      socket.off('OnMessage');
    };
  }, []);

  const onSubmit = () => {
    const createdBy = session?.userId;
    socket.emit('newMessage', { content: value, createdBy });
    setValue('');
  };
  
  const getOnlineUsers = () => {
    if (!userData) {
      return []; // Return an empty array if userData is undefined
    }
  
    const onlineUsers = userData.filter((user: any) => user.isOnline);
    return onlineUsers.map((user: any) => user.userImgUrl);
    // Return an array of image URLs for all online users
  };
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const onlineUserImages = getOnlineUsers();
  return (
    <WebsocketProvider value={socket}>
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
          className={`fixed bottom-16 right-4 w-96 ${isChatboxHidden ? 'hidden' : ''
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
            <div className="flex space-x-2 pt-3 bg-whiter shadow-md rounded-lg max-w-lg w-full border border-black-2 dark:bg-strokedark dark:border-white">
            <p className="text-lg font-semibold pl-3 ">Online:</p>
                {onlineUserImages.map((imageUrl:any, index:any) => (
                  <Avatar key={index} src={imageUrl} />
                ))}
              </div>
            <div className="p-4 max-h-80 overflow-y-scroll">
              {messages.reverse().map((message, index) => (
                <Message key={index} message={message} users={userData} />
                //   <div key={index}>
                //   <p>{message.content}</p>
                // </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t flex">


              <input
                id="user-input"
                type="text"
                placeholder="Type a message"
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-strokedark pr-2 rounded-lg"

                // onChange={(e) => setNewMessage(e.target.value)}
                // value={newMessage}
                // onKeyUp={handleUserInputKeyUp}
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
                onClick={onSubmit}
              >
                Send
              </button>
            </div>
            {showPicker && (
              <div>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

          </div>
        </div>
      </div>
    </WebsocketProvider>
  );
};

export default Chatbox;

// ... (other imports)

const Message = ({ message, users }: any) => {
  const { data: session } = useSession();

  const getUserImageSrc = (userId: string) => {
    if (!users) {
      return '/images/user/user-12.png'; // Provide a default image URL if users is undefined
    }
  
    const user = users.find((user: any) => user.userId === userId);
    return user ? user.userImgUrl : '/images/user/user-12.png'; // Provide a default image URL if user not found
  };
  

  return (
    <Box
      className="text-white "
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        mb: 2,
        justifyContent: message.createdBy === session?.userId ? 'flex-end' : 'flex-start',
      }}
    >
      {message.createdBy === session?.userId ? (
        <>
          <Paper
            variant="outlined"
            sx={{
              p: 1,
              backgroundColor: message.createdBy === session?.userId ? 'primary.light' : 'secondary.light',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body1">{message.content || message.msg}</Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="caption" sx={{ mr: 1 }}>
                {new Date(message.createdAt).toLocaleTimeString()}
              </Typography>
              <IoMdCheckmark />
            </Box>
          </Paper>
          <Avatar src={session?.userImageUrl} sx={{ marginLeft: 1 }} />
        </>
      ) : (
        <>
          <Avatar src={getUserImageSrc(message.createdBy)} sx={{ marginRight: 1 }} />
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              backgroundColor: message.createdBy === session?.userId ? 'primary.light' : 'secondary.light',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body1">{message.content || message.msg}</Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="caption" sx={{ mr: 1 }}>
                {new Date(message.createdAt).toLocaleTimeString()}
              </Typography>
              <IoMdCheckmark />
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};
