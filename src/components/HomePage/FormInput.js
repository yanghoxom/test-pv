import React from 'react';

const FormInput = ({
  onSubmit,
  username
}) => (
  <div className='center-page'>
    <form onSubmit={(values) => onSubmit(values.target.elements.username.value)}>
      <label>
        <input defaultValue={username} className="form-control" type="text" name="username" placeholder="Enter username github" />
      </label>
      <input className="button" type="submit" value="Submit" />
    </form>
  </div>
)

export default FormInput;