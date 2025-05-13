import axios from "axios";

// Créer une instance Axios avec l'URL de base
const api = axios.create({
  baseURL: "https://todo-backend-zi2d.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token JWT à toutes les requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fonction pour l'inscription
const register = async (data) => {
  try {
    const response = await api.post("/api/users/register", data);
    return response;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.response?.data || error.message);
    throw error;
  }
};

// Fonction pour la connexion
const login = async (data) => {
  try {
    const response = await api.post("/api/users/login", data);
    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.response?.data || error.message);
    throw error;
  }
};

// Ajouter une tâche
const ajouterTache = async (currentTask) => {
  if (currentTask.trim() === "") return null;

  try {
    const response = await api.post("/api/tasks", { title: currentTask });
    return response;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error.response?.data || error.message);
    throw error;
  }
};

// Afficher les tâches
const afficherTaches = async () => {
  try {
    const response = await api.get("/api/tasks");
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération de(s) tâche(s) :", error.response?.data || error.message);
    throw error;
  }
};

// Supprimer une tâche
const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche :", error.response?.data || error.message);
    throw error;
  }
};

// Mettre à jour le statut d'une tâche
const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await api.patch(`/api/tasks/${taskId}/status`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut de la tâche :", error.response?.data || error.message);
    throw error;
  }
};

export { register, login, ajouterTache, afficherTaches, deleteTask, updateTaskStatus };