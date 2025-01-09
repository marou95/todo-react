import React, { useState } from "react";
import Modal from "./components/Modal";
import Todo from "./components/Todo";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // Importation du composant Login

function App() {
  const [isModalOpen, setModalOpen] = useState(false); // État pour la modal
  const [taskToDelete, setTaskToDelete] = useState(null); // Tâche à supprimer

  // Fonction pour ouvrir et fermer la modal
  const openModal = (index) => {
    setTaskToDelete(index);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setTaskToDelete(null); // Réinitialiser la tâche à supprimer
  };

  return (
    <Router>
      <div style={styles.body}>
        <Header />
        <Routes>
          <Route path="/" element={<Todo openModal={openModal} />} />
          <Route path="/login" element={<Login />} />{" "}
        </Routes>
      </div>
    </Router>
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
  // content: {
  //   marginTop: "80px",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  //   flex: 1,
  //   width: "100%",
  //   maxWidth: "500px",
  //   padding: "20px",
  // },
  // input: {
  //   backgroundColor: "#333333",
  //   color: "#ffffff",
  //   border: "1px solid #444444",
  //   borderRadius: "4px",
  //   padding: "12px 15px",
  //   width: "100%",
  //   marginBottom: "20px",
  //   fontSize: "18px",
  //   outline: "none",
  // },
  // addButton: {
  //   backgroundColor: "#6200ee",
  //   color: "#ffffff",
  //   border: "none",
  //   borderRadius: "6px",
  //   padding: "12px 20px",
  //   cursor: "pointer",
  //   fontSize: "16px",
  //   fontWeight: "bold",
  //   transition: "background-color 0.3s ease",
  //   marginBottom: "20px",
  //   width: "auto",
  //   alignSelf: "center",
  // },
  // taskListContainer: {
  //   listStyle: "none",
  //   padding: "0",
  //   margin: "0",
  //   width: "100%",
  // },
  // taskItem: {
  //   backgroundColor: "#1f1f1f",
  //   padding: "10px 15px",
  //   marginBottom: "20px", // Augmenter l'espacement entre les tâches
  //   borderRadius: "5px",
  //   color: "#fff",
  //   fontSize: "16px",
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  // taskText: {
  //   flex: 1, // Le texte prend tout l'espace disponible
  //   marginRight: "3px", // Un peu d'espace entre le texte et la liste déroulante
  // },
  // taskStatus: {
  //   marginRight: "0px", // Espacement entre le statut et le bouton Delete
  //   width: "5px",
  // },
  // deleteButton: {
  //   backgroundColor: "#ff4d4d",
  //   color: "#fff",
  //   border: "none",
  //   borderRadius: "3px",
  //   padding: "5px 10px",
  //   cursor: "pointer",
  //   fontSize: "14px",
  //   width: "auto",
  //   height: "35px",
  //   marginLeft: "10px",
  //   display: "inline-block",
  //   textAlign: "center",
  //   fontWeight: "bold",
  // },
};

export default App;
