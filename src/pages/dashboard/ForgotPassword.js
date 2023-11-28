import React, { useState } from "react";

import { auth } from "../../firebase";
import styles from "../../css/forgot.module.css";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Email de recuperação de palavra-passe enviado. Verifique a sua caixa de correio"
      );
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    }
  };
  return (
    <div className={[styles.inputa, { marginTop: 200 }]}>
      <h2 className={styles.title}>Forgot Password</h2>
      <input
        type="email"
        className={styles.inputa}
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className={styles.btn} onClick={handleResetPassword}>
        Reset Password
      </button>
      <p> {message}</p>
    </div>
  );
};

export default ForgotPassword;
