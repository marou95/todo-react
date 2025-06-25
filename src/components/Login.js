import React, { useState, useContext } from "react";
import { apiLogin } from "./Api.js";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await apiLogin({ email, password });
      const { token } = response.data;
      login(token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response);
      setErrorMessage(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
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
        <button
          type="submit"
          style={{ ...styles.loginButton, ...(isLoading ? styles.disabledButton : {}) }}
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader size={20} color="#ffffff" /> : "Login"}
        </button>
        <p>
          <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(80vh - 80px)",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#121212", 
    color: "#ffffff",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    boxSizing: "border-box",
    flexDirection: "column",
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
  loginButton: {
    backgroundColor: "#6200ee",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    cursor: "pointer",
    fontSize: "calc(14px + 0.2vw)",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    width: "100%",
    alignSelf: "center",
    marginBottom: "10px",
  },
  disabledButton: {
    backgroundColor: "#005bb5",
    cursor: "not-allowed",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Login;