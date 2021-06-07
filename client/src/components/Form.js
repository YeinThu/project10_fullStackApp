import React from 'react';

const Form = (props) => {
  const {
    cancel,
    elements,
    submitButtonText
  } = props;

  const handleCancel = (event) => {
    event.preventDefault();
    cancel();
  }

  return (
    <form>
      {elements()}
      <button className="button" type="submit">{submitButtonText}</button>
      <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default Form;