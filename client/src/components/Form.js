import React from 'react';

const Form = (props) => {
  const {
    errors,
    submit,
    cancel,
    elements,
    submitButtonText
  } = props;
  
  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  }

  // Cancel handler
  const handleCancel = (event) => {
    event.preventDefault();
    cancel();
  }

  // Errors to display on the form
  const ErrorsDisplay = ({ errors }) => {
    let errorsDisplay = null;

    if (errors.length) {
      errorsDisplay = (
        <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {
                errors.map((error, i) => <li key={i}>{error}</li>)
              }
            </ul>
        </div>
      );
    }

    return errorsDisplay;
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <button className="button" type="submit">{submitButtonText}</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default Form;