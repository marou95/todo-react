import React, { useState } from "react";
import { login } from "./Api.js"; // Assurez-vous que le chemin est correct
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      console.log("Sending login request:", { email, password }); // Log pour débogage
      const response = await login({
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      console.log(`Welcome, ${email}!`);

      // Rediriger vers la page d'accueil
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response);
      setErrorMessage(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
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
        <button type="submit" style={styles.loginButton}>
          Login
        </button>
        <p>
          <a href="/register">Create an account.</a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  input: {
    backgroundColor: "#333333",
    color: "#ffffff",
    border: "1px solid #444444",
    borderRadius: "10px",
    padding: "12px 15px",
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "18px",
    outline: "none",
  },

  loginButton: {
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
};

export default Login;
