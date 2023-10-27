import React, { useState } from "react";

import { auth } from "../../firebase";
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
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
