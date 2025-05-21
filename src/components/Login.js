import React, { useState, useContext } from "react";
import { apiLogin } from "./Api.js";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from './UserContext'; // Importer le contexte utilisateur
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(UserContext); // Importer le contexte utilisateur
  const [isLoading, setIsLoading] = useState(false); // État pour le chargement
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setIsLoading(true); // Activer le spinner
    setErrorMessage("");
    try {
      console.log("Sending login request:", { email, password }); // Log pour débogage
      const response = await apiLogin({
        email,
        password,
      });

      const { token } = response.data;
      login(token); // Mettre à jour le contexte

      // Rediriger vers la page d'accueil
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response);
      setErrorMessage(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setIsLoading(false); // Désactiver le spinner
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
          disabled={isLoading} // Désactiver l'input pendant le chargement
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
          disabled={isLoading} // Désactiver l'input pendant le chargement
        />
        <button
          type='submit'
          style={{ ...styles.loginButton, ...(isLoading ? styles.disabledButton : {}) }}
          disabled={isLoading} // Désactiver le bouton pendant le chargement
        >

          {isLoading ? (
            <ClipLoader size={20} color='#ffffff' /> // Spinner stylisé          
          ) : (
            'Login'
          )}
        </button>
        <p>
          <Link to='/register'>Create an account</Link>
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
  disabledButton: {
    backgroundColor: '#005bb5',
    cursor: 'not-allowed',
  },

};

export default Login;
