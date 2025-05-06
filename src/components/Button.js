import React from "react";


const Button = ({ onClick, label, style, className, disabled }) => {
  return (
    <button
      onClick={onClick} // Fonction appelée lors du clic
      style={style} // Styles inline passés en prop
      className={className} // Classe CSS pour la personnalisation
      disabled={disabled} // Désactivation du bouton si nécessaire
    >
      {label}
    </button>
  );
};

export default Button;
