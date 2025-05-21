import React from 'react';
import Button from './Button';

const Dropdown = ({ items, selectedItem, onItemSelected, isOpen, onToggle }) => {
  const handleItemClick = (item) => {
    onItemSelected(item); // Notifie le parent de l'élément sélectionné
    onToggle(); // Ferme le dropdown via le parent
  };

  return (
    <div style={styles.dropdownContainer}>
      {/* Bouton principal du dropdown */}
      <Button
        label={selectedItem || items[1] || 'To be done'} // Affiche le statut actuel ou "To be done" par défaut
        onClick={onToggle} // Toggle géré par le parent
        style={styles.dropdownButton}
      />
      {/* Liste déroulante */}
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
    opacity: "0.4",
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
