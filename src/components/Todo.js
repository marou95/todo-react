import React, { useEffect, useState, useContext } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import { ajouterTache, afficherTaches, deleteTask, updateTaskStatus } from "./Api";
import predefinedTasks from "./predefinedTasks";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { UserContext } from './UserContext'; // Importer le contexte utilisateur
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


function Todo() {
  const { user } = useContext(UserContext); // Importer le contexte utilisateur

  const [currentTask, setCurrentTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // Pour naviguer dans les suggestions
  const navigate = useNavigate(); // Initialiser le hook useNavigate
  const [loadingTasks, setLoadingTasks] = useState({}); // État de chargement par tâche

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const openModal = (index) => {
    setTaskToDelete(index);
    setModalOpen(true);
    setActiveDropdown(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTaskToDelete(null);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCurrentTask(inputValue);

    // Générer des suggestions en fonction de la saisie
    if (inputValue.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = predefinedTasks.filter((task) =>
        task.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
      setActiveSuggestionIndex(-1); // Réinitialiser l'index actif
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Naviguer vers le bas dans les suggestions
      setActiveSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      // Naviguer vers le haut dans les suggestions
      setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0) {
        // Sélectionner une suggestion avec "Enter"
        setCurrentTask(suggestions[activeSuggestionIndex]);
        setSuggestions([]);
      } else {
        onAddTask();
      }
    } else if (e.key === "Escape") {
      setSuggestions([]); // Fermer les suggestions
    }
  };

  const onAddTask = async () => {
    if (!currentTask.trim()) return;

    try {
      const response = await ajouterTache(currentTask);
      setTaskList([...taskList, response.data]);
      setCurrentTask("");
      setSuggestions([]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCurrentTask(suggestion);
    setSuggestions([]);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    // On fait une copie de la liste actuelle des tâches pour pouvoir revenir en arrière si nécessaire.
    // Ensuite, on met à jour immédiatement l'interface utilisateur pour refléter le nouveau statut de la tâche.
    // donne une impression de rapidité à l'utilisateur, même si la mise à jour sur le serveur n'est pas encore terminée.
    const originalTasks = [...taskList];
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Activer le spinner
    setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));

    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
      // Revenir à l'état précédent
      setTaskList(originalTasks);
    } finally {
      setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
    }
  };

  const handleDeleteTask = async () => {
    if (taskToDelete === null) return;

    const taskId = taskList[taskToDelete]._id;
    try {
      await deleteTask(taskId);
      const updatedTasks = taskList.filter(
        (_, index) => index !== taskToDelete
      );
      setTaskList(updatedTasks);
      closeModal();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      // Vérifier si le token est présent sinon rediriger vers la page de connexion
      if (!user.token) {
        navigate('/login', { replace: true });
        return;
      }
      try {
        const response = await afficherTaches();
        setTaskList(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        if (error.response?.status === 401) {
          navigate('/login', { replace: true });
        }
      }
    };
    fetchTasks();
  }, [user.token, navigate]);

  return (
    <div style={styles.content}>
      {/* Input pour ajouter une tâche */}
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={currentTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a task"
        />
        <TbArrowBigRightLinesFilled label="Add" onClick={onAddTask} style={styles.TbArrowBigRightLinesFilled} />
      </div>
      {/* Suggestions de tâches */}
      <div style={styles.suggestionsContainer}>
        {suggestions.length > 0 && (
          <ul style={styles.suggestionList}>
            {suggestions.map((task, index) => (
              <li
                key={index}
                style={{
                  ...styles.suggestionItem,
                  backgroundColor:
                    index === activeSuggestionIndex ? "#e0e0e0" : "#1f1f1f", // Sélection active
                  color: "#fff", // Couleur du texte
                }}
                onMouseDown={() => handleSuggestionClick(task)}
              >
                {task}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Liste des tâches */}
      <ul style={styles.taskListContainer}>
        {taskList.map((task, index) => (
          <li style={styles.taskItem} key={task._id}>
            <span style={styles.taskText}>{task.title}</span>
            {loadingTasks[task._id] ? (
              <ClipLoader size={20} color='#ffffff' /> // Spinner stylisé          
            ) : (
              <Dropdown
                items={["Done", "To be done"]}
                selectedItem={task.status} // Afficher le statut actuel
                onItemSelected={(newStatus) => handleStatusChange(task._id, newStatus)}
                isOpen={activeDropdown === task._id}
                onToggle={() => toggleDropdown(task._id)}
                style={styles.taskStatus}
              />
            )}
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
        removeTask={handleDeleteTask}
      />
    </div>
  );
}

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
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    backgroundColor: "#333333",
    color: "#ffffff",
    border: "0px solid #444444",
    borderRadius: "10px",
    padding: "12px 15px",
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    fontSize: "18px",
    outline: "none",
  },
  TbArrowBigRightLinesFilled: {
    backgroundColor: "rgb(66, 66, 66)",
    marginRight: "-30px",
    padding: "8px",
    borderRadius: "30%",
    color: "#ffffff",
    cursor: "pointer",
    transform: "translate(-130%, 0%)"
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
  // Parent relatif pour positionner les suggestions
  suggestionsContainer: {
    position: "relative", // Nécessaire pour que les suggestions soient positionnées par rapport à l'input
    width: "100%",
  },
  suggestionList: {
    position: "absolute", // Place la liste sous l'input
    left: "0",
    width: "100%", // Correspond à l'input
    backgroundColor: "rgba(31, 31, 31, 0.5)", // Fond sombre
    border: "1px solid #444444", // Bordure harmonieuse
    borderRadius: "5px", // Coins arrondis
    zIndex: "10", // Toujours visible
    listStyle: "none", // Supprime les puces par défaut
    padding: "0", // Aucun padding interne
    margin: "0", // Aucun margin externe
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Ombre pour un effet visuel
    overflow: "hidden", // Empêche les débordements
  },
  suggestionItem: {
    padding: "10px 15px", // Espacement interne
    cursor: "pointer", // Curseur interactif
    transition: "background-color 0.2s ease", // Animation sur le survol
  },
};

export default Todo;
