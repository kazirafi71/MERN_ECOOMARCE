import React from "react";

const DangerAlert = ({ alert }) => {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {alert}
      </div>
    </div>
  );
};

export default DangerAlert;
