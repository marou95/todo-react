import React, { useEffect, useState, useContext } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Modal from "./Modal";
import { ajouterTache, afficherTaches, deleteTask, updateTaskStatus } from "./Api";
import predefinedTasks from "./predefinedTasks";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

function Todo() {
  const { user } = useContext(UserContext);
  const [currentTask, setCurrentTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const navigate = useNavigate();
  const [loadingTasks, setLoadingTasks] = useState({});

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
    if (inputValue.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = predefinedTasks.filter((task) =>
        task.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
      setActiveSuggestionIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex >= 0) {
        setCurrentTask(suggestions[activeSuggestionIndex]);
        setSuggestions([]);
      } else {
        onAddTask();
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
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
    const originalTasks = [...taskList];
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );
    setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
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
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={currentTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add a task"
        />
        <TbArrowBigRightLinesFilled
          label="Add"
          onClick={onAddTask}
          style={styles.TbArrowBigRightLinesFilled}
        />
      </div>
      <div style={styles.suggestionsContainer}>
        {suggestions.length > 0 && (
          <ul style={styles.suggestionList}>
            {suggestions.map((task, index) => (
              <li
                key={index}
                style={{
                  ...styles.suggestionItem,
                  backgroundColor:
                    index === activeSuggestionIndex ? "#e0e0e0" : "#1f1f1f",
                  color: "#fff",
                }}
                onMouseDown={() => handleSuggestionClick(task)}
              >
                {task}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul style={styles.taskListContainer}>
        {taskList.map((task, index) => (
          <li
            style={{
              ...styles.taskItem,
              backgroundColor: task.status === "Done" ? "rgba(74, 222, 128, 0.3)" : "#1f1f1f",
            }}
            key={task._id}
          >
            <span style={styles.taskText}>{task.title}</span>
            {loadingTasks[task._id] ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              <Dropdown
                items={["Done", "To be done"]}
                selectedItem={task.status}
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        task={taskToDelete !== null ? taskList[taskToDelete]?.title : ""}
        removeTask={handleDeleteTask}
      />
    </div>
  );
}

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
    padding: "calc(10px + 2vw)", // Ajouté pour espacement sur mobile
    boxSizing: "border-box",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0 calc(5px + 1vw)", // Ajouté pour espacement interne
    boxSizing: "border-box",
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
    fontSize: "calc(11px + 0.4vw)", // Réduit pour mobile
    outline: "none",
    boxSizing: "border-box",
  },
  TbArrowBigRightLinesFilled: {
    backgroundColor: "rgb(66, 66, 66)",
    marginRight: "-30px",
    padding: "8px",
    borderRadius: "30%",
    color: "#ffffff",
    cursor: "pointer",
    transform: "translate(-130%, 0%)",
  },
  taskListContainer: {
    listStyle: "none",
    padding: "0 calc(5px + 1vw)", // Ajouté pour espacement des tâches
    margin: "0",
    width: "100%",
    boxSizing: "border-box",
  },
  taskItem: {
    backgroundColor: "#1f1f1f",
    padding: "10px 15px",
    marginBottom: "20px",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "calc(12px + 0.3vw)", // Réduit pour mobile
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskText: {
    flex: 1,
    marginRight: "3px",
  },
  taskStatus: {
    marginRight: "0px",
    width: "5px",
    fontSize: "calc(10px + 0.4vw)", // Réduit pour mobile
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "12px",
    width: "auto",
    height: "35px",
    marginLeft: "10px",
    display: "inline-block",
    textAlign: "center",
    fontWeight: "bold",
  },
  suggestionsContainer: {
    position: "relative",
    width: "100%", // Corrigé pour correspondre à l’input
    marginBottom: "20px",
    // border: "1px solid #444444",
    borderRadius: "5px",
  },
  suggestionList: {
    position: "absolute",
    left: "0",
    width: "100%",
    backgroundColor: "rgba(31, 31, 31, 0.5)",
    border: "1px solid #444444",
    borderRadius: "5px",
    zIndex: "10",
    listStyle: "none",
    padding: "0",
    margin: "0",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
  suggestionItem: {
    padding: "10px 15px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
};

export default Todo;