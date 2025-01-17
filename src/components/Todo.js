import React, { useEffect, useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import { ajouterTache, afficherTaches, deleteTask } from "./Api";

const Todo = () => {
  const [currentTask, setCurrentTask] = useState("");
  const [taskList, setTaskList] = useState([]); // État pour la liste des tâches
  const [isModalOpen, setModalOpen] = useState(false); // État pour la modal
  const [taskToDelete, setTaskToDelete] = useState(null); // Tâche à supprimer
  const [activeDropdown, setActiveDropdown] = useState(null); // État pour gérer l'élément actif

  // Fonction pour gérer l'ouverture/fermeture d'un dropdown
  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => {
      if (prev === index) {
        return null; // Fermer si c'était déjà ouvert
      } else {
        return index; // Ouvrir le dropdown cliqué
      }
    });
  };

  // Fonction pour ouvrir la modal
  const openModal = (index) => {
    setTaskToDelete(index);
    setModalOpen(true);
    setActiveDropdown(null); // Fermer toutes les listes déroulantes
    console.log("Dropdown fermé, activeDropdown:", null);
  };

  // Fonction pour fermer la modal
  const closeModal = () => {
    setModalOpen(false);
    setTaskToDelete(null); // Réinitialiser la tâche à supprimer
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      onAddTask();
    }
  };

  const onAddTask = async () => {
    try {
      const response = await ajouterTache(currentTask);
      setTaskList([...taskList, response.data]);
      setCurrentTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Fonction pour mettre à jour le statut de la tâche
  const updateTaskStatus = (index, newStatus) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].status = newStatus;
    setTaskList(updatedTasks);
  };

  // Fonction pour supprimer une tâche
  const handleDeleteTask = async () => {
    if (taskToDelete === null) return;

    const taskId = taskList[taskToDelete]._id; // Récupérer l'ID de la tâche à supprimer
    try {
      const response = await deleteTask(taskId); // Appel de la fonction deleteTask
      console.log(response); // Afficher la réponse du serveur si la suppression réussit
      const updatedTasks = taskList.filter((_, index) => index !== taskToDelete); // Mettre à jour la liste des tâches
      setTaskList(updatedTasks);
      closeModal(); // Fermer la modal après suppression
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await afficherTaches();
        setTaskList(result.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div style={styles.content}>
      <input
        style={styles.input}
        type="text"
        onKeyDown={handleKeyDown} // Gérer l'événement "Entrée"
        value={currentTask} // L'input affiche ce qui est stocké dans currentTask
        placeholder="Add a task"
        onChange={(e) => setCurrentTask(e.target.value)} // Mettre à jour l'état
      />
      {/* Boutton ajout tâche */}
      <Button
        label="Add"
        onClick={onAddTask}
        style={styles.addButton} // Style personnalisé
      />

      {/* Liste des tâches */}
      <ul style={styles.taskListContainer}>
  {taskList.map((task, index) => (
    <li style={styles.taskItem} key={index}>
      <span style={styles.taskText}>{task.title}</span>
      {/* Liste déroulante */}
      <Dropdown
        items={["Done", "To be done"]}
        onItemSelected={(newStatus) => updateTaskStatus(index, newStatus)}
        isOpen={activeDropdown === index} // Le dropdown est ouvert si c'est l'index actif
        onToggle={() => toggleDropdown(index)} // Gère l'ouverture/fermeture via le parent
        style={styles.taskStatus}
      />
      {/* Bouton Delete */}
      <Button
        label="Delete"
        onClick={() => openModal(index)}
        style={styles.deleteButton}
      />
    </li>
  ))}
</ul>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={taskToDelete !== null ? taskList[taskToDelete]?.title : ""}
        removeTask={handleDeleteTask} // Utiliser la fonction handleDeleteTask pour supprimer la tâche
      />
    </div>
  );
};

// Définition des styles
const styles = {
  content: {
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
  },
  input: {
    backgroundColor: "#333333",
    color: "#ffffff",
    border: "1px solid #444444",
    borderRadius: "4px",
    padding: "12px 15px",
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "18px",
    outline: "none",
  },
  addButton: {
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
  taskListContainer: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    width: "100%",
  },
  taskItem: {
    backgroundColor: "#1f1f1f",
    padding: "10px 15px",
    marginBottom: "20px", // Augmenter l'espacement entre les tâches
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: {
    flex: 1, // Le texte prend tout l'espace disponible
    marginRight: "3px", // Un peu d'espace entre le texte et la liste déroulante
  },
  taskStatus: {
    marginRight: "0px", // Espacement entre le statut et le bouton Delete
    width: "5px",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
    width: "auto",
    height: "35px",
    marginLeft: "10px",
    display: "inline-block",
    textAlign: "center",
    fontWeight: "bold",
  },
};

export default Todo;
