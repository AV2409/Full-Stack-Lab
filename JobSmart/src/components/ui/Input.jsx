import React from "react";

const Input = ({ label, type = "text", placeholder, value, onChange, required }) => (
  <div className="input-group">
    {label && <label className="input-label">{label}</label>}
    {type === 'textarea' ? (
      <textarea 
        className="input-field" 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        required={required}
        rows={4}
      />
    ) : (
      <input 
        className="input-field" 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        required={required}
      />
    )}
  </div>
);

export default Input;
