import React, { } from "react";
import Todo from "./components/Todo";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserProvider } from './components/UserContext';

function App() {

  return (
    <UserProvider>
    <Router>
      <div style={styles.body}>
        <Header />
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Redirection par défaut vers /login si l'URL est inconnue */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

// Définition des styles
const styles = {
  body: {
    backgroundColor: "#121212",
    color: "#ffffff",
    fontFamily: "'Roboto', sans-serif",
    margin: 0,
    padding: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    overflowY: "auto",
  },
  header: {
    textAlign: "center",
    padding: "20px 0",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#1e1e1e",
    width: "100%",
    position: "fixed",
    top: -20,
    left: 0,
    zIndex: 10,
  },
};

export default App;
