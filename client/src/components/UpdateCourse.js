import { Component, Fragment } from 'react';
import Form from './Form';

class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      userId: null,
      errors: []
    }
  }

  // When component first mounts, retrieve the current course to update from the database
  componentDidMount() {
    const { context } = this.props;
    const id = this.props.match.params.id;
    const authUserId = context.authenticatedUser.authenticatedUser.id;
    
    context.data.getCourse(id)
      .then(courseData => {
        if (courseData) {
          if (courseData.userId === authUserId) {
            this.setState({
              id: courseData.id,
              title: courseData.title,
              description: courseData.description,
              estimatedTime: courseData.estimatedTime,
              materialsNeeded: courseData.materialsNeeded,
              userId: courseData.userId
            });
          }
          else {
            this.props.history.push('/forbidden');
          }
        }
        else {
          this.props.history.push('/notfound');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      })
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

  submit = () => {
    const { context } = this.props;
    const emailAddress = context.authenticatedUser.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.originalPassword;

    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    } = this.state;

    const updatedCourse = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    context.data.updateCourse(updatedCourse, emailAddress, password)
      .then(dataErrors => {
        if (dataErrors.length) {
          this.setState({
            errors: dataErrors
          });
        }
        else {
          this.props.history.push(`/courses/${updatedCourse.id}`);
        }
      })
      .catch(err => {
        console.log(`An error has occurred: ${err}`);
        this.props.history.push('/error');
      });
      
  }

  cancel = () => {
    this.props.history.push(`/courses/${this.state.id}`);
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;
    
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <Form
            errors={errors}
            submit={this.submit}
            cancel={this.cancel} 
            submitButtonText="Update Course"
            elements={() => (
              <Fragment>
                <div className="main--flex">
                <div>
                    <label htmlFor="title">Course Title</label>
                    <input
                      id="title" 
                      name="title"
                      type="text"
                      value={title || ""}
                      onChange={this.change}
                    />

                    <p>By Joe Smith</p>

                    <label htmlFor="description">Course Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={description || ""}
                      onChange={this.change}
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input 
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={estimatedTime || ""}
                      onChange={this.change}
                    />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      value={materialsNeeded || ""}
                      onChange={this.change}
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

export default UpdateCourse;