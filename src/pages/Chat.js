import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { UserAuth } from '../context/AuthContext'
import JobCard from '../components/cards/JobCard';
import { Link, useNavigate, useLocation } from 'react-router-dom'

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
          {message.senderId === user.uid ? (<p>Eu: {message.text}</p>):
          (<p>Outro: {message.text} </p>) }
            
        </div>
      ))}
    </div>
  );
};

export default Chat;