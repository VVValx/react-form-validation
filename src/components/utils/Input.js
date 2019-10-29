import React from "react";

export default function Form({ error, type, name, value, onChange }) {
  return (
    <div className="form-input">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={name}
      />
      {error && <p className="error">{error[name]}</p>}
    </div>
  );
}
