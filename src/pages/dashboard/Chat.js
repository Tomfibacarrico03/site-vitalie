import React, { useState, useEffect } from "react";
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserAuth } from '../../context/AuthContext'
import {  useLocation } from 'react-router-dom'

const Chat = () => {
  const location = useLocation();
  const { chatId } = location.state;
  const {user} = UserAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const messagesQuery = query(messagesRef);
      const messagesSnapshot = await getDocs(messagesQuery);
      const messagesData = messagesSnapshot.docs.map(doc => doc.data());
      setMessages(messagesData);
    };

    fetchMessages();
  }, [chatId]);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          {message.senderId === user.uid ? (
            <p>Eu: {message.text}</p>
          ):(
            <p>Outro: {message.text} </p>
          )}          
        </div>
      ))}
    </div>
  );
};

export default Chat;