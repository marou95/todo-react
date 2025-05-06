import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [, setUserToken] = useState();

  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (password !== confirmPassword) {
      setErrorMessage("Passwords are not matching.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      // Rediriger l'utilisateur vers une autre page après Register si Success
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  const createAccount = () => {
    setUserToken(localStorage.setItem("token", undefined));
    // navigate("/register"); // Rediriger vers la page register
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <input
          type="name"
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
        {/* {errorMessage && <p style={styles.error}>{errorMessage}</p>} */}

        <button
          type="submit"
          style={styles.registerButton}
          onClick={createAccount}
        >
          Create My account
        </button>
      </form>
      <a href="/login">Log in</a>
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
