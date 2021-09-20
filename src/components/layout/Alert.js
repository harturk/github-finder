import React from "react";

export const Alert = ({ alert }) => {
  return (
    alert !== null && (
      /* Recebe como prop o tipo de alerta (alert-light)
      assim setando a cor conforme o arquivo css (app.css)
      */
      <div> className={`alert alert-${alert.type}`}>
      <i className="fas fa-info"/> {alert.msg}
      </div>
    )
  );
};

export default Alert;
