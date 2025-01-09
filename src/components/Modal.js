import React from "react";

const Modal = ({ isOpen, onClose, index, task, removeTask }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 style={styles.header}>Delete task</h2>
        <p style={styles.message}>Do you really want to delete the task:</p>
        <p style={styles.taskText}>{task}</p>
        <div style={styles.buttonContainer}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button style={styles.deleteButton} onClick={() => removeTask(index)}>
            Delete!
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    background: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)",
    color: "#ffffff",
    position: "relative",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#ffffff",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  message: {
    marginBottom: "10px", // Espacement entre le message et la tâche
  },
  taskText: {
    display: "inline-block",
    backgroundColor: "rgba(66, 66, 66, 0.4)", // Opacité de 80%
    padding: "4px 8px",
    borderRadius: "4px",
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: "20px", // Espacement entre le texte et les boutons
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px", // Espacement horizontal entre les boutons
    marginTop: "20px", // Espacement au-dessus des boutons
  },
  cancelButton: {
    backgroundColor: "#616161",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
};

export default Modal;
