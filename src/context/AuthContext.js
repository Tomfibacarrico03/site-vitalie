import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, collection, onSnapshot } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Start with null to differentiate when loading
  const [loading, setLoading] = useState(true); // Loading state

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { uid } = currentUser;
        const userRef = doc(collection(db, "users"), uid);

        // Listen to updates to user document
        const unsubscribeUser = onSnapshot(userRef, (docSnapshot) => {
          const userData = docSnapshot.data();
          setUser({ ...currentUser, ...userData });
          setLoading(false); // Data is loaded
        });

        return () => unsubscribeUser();
      } else {
        setUser(null);
        setLoading(false); // No user signed in, loading is done
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
