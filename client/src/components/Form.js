import React from 'react';

const Form = (props) => {
  const {
    submit,
    cancel,
    elements,
    submitButtonText
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  }

  const handleCancel = (event) => {
    event.preventDefault();
    cancel();
  }

  return (
    <form onSubmit={handleSubmit}>
      {elements()}
      <button className="button" type="submit">{submitButtonText}</button>
      <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default Form;