import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { UserAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom';

const Inbox = () => {
    
  const {user} = UserAuth()

  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Create a query to get all documents in the 'chats' collection where the document ID contains the user ID
    const q = query(collection(db, "chats"), where("users", "array-contains", user.uid));
    
    // Execute the query and get all matching documents
    getDocs(q)
      .then((querySnapshot) => {
        const chatsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setChats(chatsData);
      })
      .catch((error) => {
        console.log("Error getting chats: ", error);
      });
  }, [user]);

  return (
    <div style={{backgroundColor: "#fff", width: "40%", padding: 20, position: "absolute", right: 200, marginTop: 20, borderRadius: 5}}>
      <h2 style={{fontFamily: "Avenir Next"}}>Caixa de Mensagens</h2>
      {chats.map((chat, index) => (
        <div key={chat.id}>
          <Link to={`/inbox/chat/${chat.id}`} state={{ chatId: chat.id }}>Chat {index + 1}</Link>  
        </div>
      ))}
    </div>
  ); 
};



export default Inbox;
