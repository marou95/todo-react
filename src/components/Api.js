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

    const response = await axios.post("http://localhost:5001/api/tasks",{ title: currentTask },config);
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

    const response = await axios.get("http://localhost:5001/api/tasks", config);
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
    const response = await axios.delete(`http://localhost:5001/api/tasks/${taskId}`,config);
    return response.data; // Retourne la réponse en cas de succès
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error.message);
    throw error; // Propager l'erreur pour la gérer côté frontend
  }
};

export { ajouterTache, afficherTaches, deleteTask};
