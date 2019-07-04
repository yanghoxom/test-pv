import React from 'react';

const FormInput = ({
  onSubmit,
  requesting,
  username
}) => (
  <div className='center-page'>
    <form onSubmit={(values) => onSubmit(values)}>
      <label>
        <input defaultValue={username} className="form-control" type="text" name="username" placeholder="Enter username github" disabled={requesting ? "disabled" : null} />
      </label>
      <input className="button" type="submit" value="Submit" />
    </form>
  </div>
)

export default FormInput;