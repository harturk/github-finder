import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

export const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

  return (
    alert !== null && (
      /* Recebe como prop o tipo de alerta (alert-light)
      assim setando a cor conforme o arquivo css (app.css)
      */
      <div className={`alert alert-${alert.type}`}>
      <i className="fas fa-info-circle" /> { alert.msg }
      </div>
    )
  );
};

export default Alert;
