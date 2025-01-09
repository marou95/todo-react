import React, { useEffect, useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { ajouterTache, afficherTaches } from "./Api";

const Todo = ({openModal}) => {
  const [currentTask, setCurrentTask] = useState("");
    const [taskList, setTaskList] = useState([]); // État pour la liste des tâches
  
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      onAddTask();
    }
  };

  const onAddTask = async () => {
    try {
      const response= await ajouterTache(currentTask);
      setTaskList([...taskList, response.data]);
      setCurrentTask("");
    } catch (err) {
      console.log(err);
    }
  };

  const updateTaskStatus = (index, newStatus) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].status = newStatus;
    setTaskList(updatedTasks);
  };
  // const deleteTask = (index) => {
  //   const arr = [...taskList];
  //   arr.splice(index, 1);
  //   setTaskList(arr);
  //   closeModal(); // Fermer la modal après suppression
  // };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const result = await afficherTaches();
        setTaskList(result.data);
      } catch (error) {}
    };
    fetchTask();
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

      {/* Liste des tache */}
      <ul style={styles.taskListContainer}>
        {taskList.map((task, index) => (
          <li style={styles.taskItem} key={index}>
            {/* Texte de la tâche */}
            <span style={styles.taskText}>{task.title}</span>
            {/* Liste déroulante */}
            <Dropdown
              items={["Done", "To be done"]}
              selected={task.status}
              onItemSelected={(newStatus) => updateTaskStatus(index, newStatus)}
              style={styles.taskStatus} // Style ajouté pour la liste déroulante
            />
            {/* Bouton Delete */}
            <Button
              label="Delete"
              onClick={() => openModal(index)}
              style={styles.deleteButton} // Style personnalisé
            />
          </li>
        ))}
      </ul>
      {/* <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          index={taskToDelete}
          task={taskToDelete !== null ? taskList[taskToDelete]?.text : ""}
          removeTask={deleteTask}
        /> */}
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
