import React, { useState } from "react";
import { auth } from "./firebase"; // Import your firebase.js configuration

const Signup = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setLoggedIn(true);
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
