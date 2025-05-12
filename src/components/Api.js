import axios from "axios";

const ajouterTache = async (currentTask) => {
  if (currentTask.trim() === "") return;

  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post("https://todo-backend-zi2d.onrender.com/api/tasks",{ title: currentTask },config);
    return response;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
  }
};

const afficherTaches = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get("https://todo-backend-zi2d.onrender.com/api/tasks", config);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récuperation de(s) tâche(s) :", error);
  }
};

// Supprimer une tâche
const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`https://todo-backend-zi2d.onrender.com/api/tasks/${taskId}`,config);
    return response.data; // Retourne la réponse en cas de succès
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
    throw error; // Propager l'erreur pour la gérer côté frontend
  }
};

const API_BASE_URL = 'https://todo-backend-zi2d.onrender.com/api/tasks';

const updateTaskStatus = async (taskId, newStatus, token) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/${taskId}/status`,
      { status: newStatus },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};



export { ajouterTache, afficherTaches, deleteTask, updateTaskStatus};
