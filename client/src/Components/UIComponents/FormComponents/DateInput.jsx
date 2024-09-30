import React from 'react'

const DateInput = ({handleChange, errors}) => {
  return (
    <div className="row mb-2 mx-0 mx-md-2 mx-lg-4 fs-6 fs-md-3 fs-lg-2 fs-xl-2 fs-xxl-1">
    <div className="col-md-6 p-0 pe-2">
      <label htmlFor="eventStart" className="form-label fs-5">
        Event Start
      </label>
      <input
        type="datetime-local"
        className={`form-control form-control-lg ${errors['date'] ? 'setError' : ''}`}
        id="eventStart"
        name="eventStart"
        onChange={handleChange}
      />
    </div>
    <div className="col-md-6 px-0 ps-2">
      <label htmlFor="eventEnd" className="form-label fs-5">
        Event End
      </label>
      <input
        type="datetime-local"
        className={`form-control form-control-lg ${errors['date'] ? 'setError' : ''}`}
        id="eventEnd"
        name="eventEnd"
        onChange={handleChange}
      />
    </div>
  </div>
  )
}

export default DateInput