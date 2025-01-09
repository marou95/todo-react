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

    const response = await axios.post(
      "http://localhost:5001/api/tasks",
      { title: currentTask },
      config
    );
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

const supprimerTache = async () =>{
  
}


export { ajouterTache, afficherTaches, supprimerTache};
