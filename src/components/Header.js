import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { UserContext } from './UserContext'; // Importer le contexte utilisateur

const Header = () => {
  const { user, logout } = useContext(UserContext); // Utiliser le contexte utilisateur
  const navigate = useNavigate(); // Initialiser le hook useNavigate
  const location = useLocation(); // Obtenir l'URL actuelle
  const isOnRegisterPage =
    location.pathname === "/register" || location.pathname === "/login"; // Vérifier si on est sur /register

  const loginRedirect = () => {
    logout();
    navigate("/login"); // Rediriger vers la page Login
  };

  const disconnect = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        Welcome in your Todo list
        <span style={styles.headerName}> {user.name} </span>
      </h1>
      {/* Afficher le bouton en fonction du token et de la route */}
      {user.token === undefined ? (<span style={styles.userEmail}>Please login</span>) : (<span style={styles.userEmail}>{user.email}</span>)}
      {!isOnRegisterPage && (
        <>
          {user.token === undefined ? (
            <button style={styles.loginButton} onClick={loginRedirect}>
              Login - Register
            </button>
          ) : (
            <button style={styles.disconnectButton} onClick={disconnect}>
              <TbLogout2 />
            </button>
          )}
        </>
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
  headerName: {
    fontSize: "24px italic",
    fontWeight: "bold",
    // background: "linear-gradient(90deg, #ff6ec4, #7873f5, #4ade80, #facc15)",
    // WebkitBackgroundClip: "text",
    // WebkitTextFillColor: "transparent",
    animation: "shine 5s linear infinite",
    display: "inline-block",
    marginLeft: "10px",
    backgroundSize: "200%",
  },
  userEmail: {
    padding: "10px",
    fontSize: "12px",
    marginLeft: "10px",
    marginRight: "10px",
    borderRadius: "5px",
    backgroundColor: "#2e2e2e",
    color: "#ffffff",
    fontWeight: "bold",
    whiteSpace: "nowrap", // Empêcher le débordement
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
    padding: "10px 15px",
    marginRight: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
};
// Media query pour mobile (iPhone 14 Pro Max: ~428px)
const styleSheet = document.styleSheets[0];
const mobileStyles = `
  @media (max-width: 428px) {
    .header {
      font-size: 18px; /* Réduire la taille du titre */
    }
    .headerName {
      font-size: 16px; /* Réduire la taille du nom */
    }
    .userInfo {
      flexDirection: column; /* Empiler verticalement */
      alignItems: center;
    }
    .userEmail {
      font-size: 10px; /* Réduire la taille de l'email */
      padding: 3px;
    }
    .loginButton, .disconnectButton {
      font-size: 12px; /* Réduire la taille des boutons */
      padding: 6px 10px;
    }
  }
`;
styleSheet.insertRule(mobileStyles, styleSheet.cssRules.length);

// Inline @keyframes animation for the gradient
const keyframes = `
  @keyframes shine {
    0% { background-position: 0%; }
    100% { background-position: 200%; }
  }
`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Header;