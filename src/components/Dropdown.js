import React, { useState } from "react";
import Button from "./Button";

const Dropdown = ({ items, onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(false); // État pour ouvrir/fermer la liste
  const [selectedItem, setSelectedItem] = useState(null); // État pour l'élément sélectionné

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Ouvrir ou fermer le menu
  };

  const handleItemClick = (item) => {
    setSelectedItem(item); // Met à jour l'élément sélectionné
    onItemSelected(item); // Notifie le parent
    setIsOpen(false); // Ferme la liste après la sélection
  };

  return (
    <div style={styles.dropdownContainer}>
      <Button
        label={selectedItem || "To be done"} // Affiche l'élément sélectionné ou un message par défaut
        onClick={toggleDropdown} // Toggle du menu
        style={styles.dropdownButton}
      />
      {isOpen && (
        <ul style={styles.dropdownList}>
          {items.map((item, index) => (
            <li
              key={index}
              style={styles.dropdownItem}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  dropdownContainer: {
    position: "relative",
    display: "inline-block",
    width: "150px",
  },
  dropdownButton: {
    width: "100%",
    backgroundColor: "grey",
    opacity:"0.4",
    color: "#ffffff",
    border: "none",
    borderRadius: "3px",
    padding: "10px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    marginLeft: "5px"
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#FFF",
    border: "1px solid #444",
    borderRadius: "6px",
    marginTop: "5px",
    listStyle: "none",
    padding: 0,
    zIndex: 1000,
  },
//   texte
  dropdownItem: {
    padding: "10px",
    color: "#ffffff",
    cursor: "pointer",
    backgroundColor: "#1e1e1e",
    borderBottom: "1px solid #333",
  },
  dropdownItemHover: {
    backgroundColor: "#",
  },
};

export default Dropdown;
