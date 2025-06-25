import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "./Api";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      setIsRegistrationSuccess(false);
      return;
    }

    try {
      const response = await register({ name, email, password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (response.status === 201) {
        setIsRegistrationSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000); // 5 secondes
      }
    } catch (error) {
      console.error("Register error:", error.response);
      setErrorMessage(error.response?.data?.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
          disabled={isLoading}
        />
        {isRegistrationSuccess ? (
          <p style={styles.successMessage}>Inscription réussie !</p>
        ) : (
          <button
            type="submit"
            style={{
              ...styles.registerButton,
              ...(isLoading ? styles.disabledButton : {}),
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "Create My Account"
            )}
          </button>
        )}
        <Link to="/login">Se connecter</Link>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(80vh)", 
    padding: "20px",
    boxSizing: "border-box",
  },
  form: {
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    boxSizing: "border-box",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#333333",
    color: "#ffffff",
    border: "1px solid #444444",
    borderRadius: "10px",
    padding: "calc(10px + 0.5vw)",
    marginBottom: "20px",
    fontSize: "calc(14px + 0.2vw)", 
    outline: "none",
    boxSizing: "border-box",
  },
  registerButton: {
    backgroundColor: "#6200ee",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "calc(10px + 0vw) 20px",
    cursor: "pointer",
    fontSize: "calc(14px + 0.2vw)",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    width: "100%",
    alignSelf: "center",
    marginBottom: "20px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
  successMessage: {
    color: "green",
    fontSize: "16px",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Register;