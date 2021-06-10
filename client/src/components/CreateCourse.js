import { Component, Fragment } from 'react';
import Form from './Form';

class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      userId: null,
      errors: []
    }
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const { 
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
      errors
    } = this.state;
    
    return (
      <main>
        <div className="wrap">
          <h2>Create Course</h2>
          <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                  <li>Please provide a value for "Title"</li>
                  <li>Please provide a value for "Description"</li>
              </ul>
          </div>
          <Form
            cancel={this.cancel}
            submitButtonText="Create Course" 
            elements={() => (
              <Fragment>
                <div className="main--flex">
                  <div>
                    <label htmlFor="title">Course Title</label>
                    <input
                      id="title" 
                      name="title"
                      type="text"
                      onChange={this.change}
                      value={title}
                    />

                    <p>By Joe Smith</p>

                    <label htmlFor="description">Course Description</label>
                    <textarea
                      id="description"
                      name="description"
                      onChange={this.change}
                      value={description}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input 
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      onChange={this.change}
                      value={estimatedTime}
                    />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      onChange={this.change}
                      value={materialsNeeded}
                    ></textarea>
                  </div>
                </div>
              </Fragment>
            )}
          />
        </div>
      </main>
    );
  }
};

export default CreateCourse;