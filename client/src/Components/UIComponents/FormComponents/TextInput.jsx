import React from 'react'

const TextInput = ({handleChange, id, label, errors, value}) => {
  return (
    <div className="mb-2 mx-0 mx-md-2 mx-lg-4 fs-6 fs-md-3 fs-lg-2 fs-xl-2 fs-xxl-1">
    <label htmlFor={id} className="form-label fs-5">
      {label}
    </label>
    <input
      type="text"
      className={`form-control form-control-lg ${errors[`${id}`] ? 'setError' : ''}`}
      id={id}
      name={id}
      onChange={handleChange}
      value={value}
    />
  </div>
  )
}

export default TextInput