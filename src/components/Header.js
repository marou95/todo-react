import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const Header = () => {
  const [userToken, setUserToken] = useState();
  const navigate = useNavigate(); // Initialiser le hook useNavigate

  const loginRedirect = () => {
    navigate("/login"); // Rediriger vers la page Login
  };

  const disconnect = () => {
    setUserToken(localStorage.setItem("token", undefined));
    navigate("/login"); // Rediriger vers la page Login
  };


  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
  
  }, [])
  

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Bienvenue dans votre Todo List Marwen</h1>
      {userToken === undefined ? (
        <button style={styles.loginButton} onClick={loginRedirect}>
          Login - Register
        </button>
      ) : (
        <button style={styles.disconnectButton} onClick={disconnect}>
          Disconnect
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between", // Place les éléments aux extrémités
    alignItems: "center", // Aligne verticalement
    backgroundColor: "#1e1e1e",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  header: {
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "bold",
    color: "#ffffff",
    flex: 1, // Permet de laisser de la place à droite pour le bouton
  },
  loginButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    marginRight: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
  disconnectButton: {
    backgroundColor: "#873232",
    color: "#fff",
    padding: "10px 20px",
    marginRight: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
};

export default Header;
