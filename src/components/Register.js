import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { register } from "./Api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      console.log("Sending register request:", { name, email, password }); // Log pour débogage
      const response = await register({
          name,
          email,
          password,
        });

      console.log("Register response:", response.data); // Log pour débogage

      // Sauvegarder le token (si le backend le renvoie)
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }

      // Rediriger vers la page de connexion
      if (response.status === 201) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Register error:", error.response); // Log pour débogage
      setErrorMessage(error.response?.data?.message || "An error occurred during registration.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <input
          type="text" // Corrigé de type="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.registerButton}>
          Create My Account
        </button>
      </form>
      <p>
        <a href="/login">Log in</a>
      </p>
    </div>
  );
};

const styles = {
  input: {
    
    backgroundColor: "#333333",
    color: "#ffffff",
    border: "1px solid #444444",
    borderRadius: "10px",
    padding: "12px 10px",
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "18px",
    outline: "none",
  },

  registerButton: {
    backgroundColor: "#6200ee",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    marginBottom: "20px",
    width: "auto",
    alignSelf: "center",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default Register;
