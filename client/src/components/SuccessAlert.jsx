import React from "react";

const SuccessAlert = ({alert}) => {
  return (
    <div>
      <div>
        <div className="alert alert-success" role="alert">
          {alert}
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;
