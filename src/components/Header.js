import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { UserContext } from "./UserContext";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnRegisterPage =
    location.pathname === "/register" || location.pathname === "/login";

  const loginRedirect = () => {
    logout();
    navigate("/login");
  };

  const disconnect = () => {
    logout();
    navigate("/login");
  };

  // Première lettre en majuscule
  const capitalizeFirstLetter = (str) => {
    if (!str) return ""; // Gérer les cas où str est vide ou undefined
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>
        Welcome In Your Todo List
        <span style={styles.headerName}> {capitalizeFirstLetter(user.name)} </span>
      </h1>
      {user.token === undefined ? (
        <span style={styles.userEmail}>Please login</span>
      ) : (
        <span style={styles.userEmail}>{user.email}</span>
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,
    padding: "10px 20px", // Ajouté pour un espacement interne
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    fontSize: "calc(18px + 0.5vw)", // Réduit de 25px, responsive
    fontWeight: "bold",
    color: "#ffffff",
    flex: 1,
    margin: 0, // Supprime les marges par défaut du h1
  },
  headerName: {
    fontSize: "calc(16px + 0.4vw)", // Réduit de 24px, responsive
    color: "white",
    fontWeight: "bold",
    textShadow: "0 0 2px white",
    display: "inline-block",
    marginLeft: "10px",
    backgroundSize: "200%",
  },
  userEmail: {
    padding: "calc(6px + 0.2vw)", // Réduit de 10px, responsive
    fontSize: "calc(10px + 0.2vw)", // Réduit de 12px, responsive
    marginLeft: "10px",
    marginRight: "10px",
    borderRadius: "5px",
    backgroundColor: "#2e2e2e",
    color: "#ffffff",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
  loginButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "calc(6px + 0.2vw) 15px", // Réduit de 10px/20px, responsive
    marginRight: "10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "calc(12px + 0.2vw)", // Réduit de 16px, responsive
  },
  disconnectButton: {
    backgroundColor: "#873232",
    color: "#fff",
    padding: "calc(6px + 0.2vw) 10px", // Réduit de 10px/15px, responsive
    marginRight: "0px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "calc(12px + 0.2vw)", // Réduit de 16px, responsive
  },
};
export default Header;