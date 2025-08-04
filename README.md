# Todo App

Une simple application web pour gérer les tâches du quotidien

## 🚀 Démo

🔗 [Démo en ligne](https://maroutodolist.netlify.app/login)

---

## ⚙️ Fonctionnalités clés


### 🔧 Backend
- 🔐 Authentification JWT (connexion & inscription sécurisées)
- 🛡️ Routes protégées pour les données sensibles
- 🧾 CRUD complet sur les tâches (Create, Read, Update, Delete)
- 👤 Gestion des sessions via token
- 🔄 Middleware `auth` pour valider les utilisateurs
- 🗂️ Modèles `User` et `Task` via Mongoose

### 💻 Frontend
- ✅ Ajout de tâches via un champ de saisie
- 🗑️ Suppression des tâches
- 📋 Affichage dynamique des tâches (liste préremplie de plus de 100 idées)
- 🔁 Marquage des tâches comme "Done" ou "To be done"
- 🔐 Pages Login / Signup avec gestion d’erreurs
- 🧠 Conservation du token JWT et redirection conditionnelle
- 🧭 Design responsive, simple et épuré


---

## 🛠️ Stack technique


- **Frontend** : React (Hooks, composants réutilisables, gestion d’état)
- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB (via Mongoose)
- **Authentification** : JWT (token d’accès, middleware de protection)
- **Requêtes HTTP** : Axios
- **Styles** : Inline CSS / react-icons
- **Déploiement** : Netlify