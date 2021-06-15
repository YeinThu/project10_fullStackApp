import { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

class CourseDetail extends Component {
  constructor() {
    super();
    this.state = {
      course: {}
    }
  }

  // When component first mounts, retireve individual course details
  componentDidMount() {
    const { context } = this.props;
    const id = this.props.match.params.id;

    context.data.getCourse(id)
      .then(courseData => {
        if (courseData) {
          this.setState({
            course: courseData
          });
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

  // Delete course
  delete = () => {
    const { context } = this.props;

    const id = this.props.match.params.id;
    const emailAddress = context.authenticatedUser.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.originalPassword;

    // A modal popup asks the client if they are sure they want to delete their course
    let confirmDelete = window.confirm('WARNING. This will permanently delete the course. Do you want to continue?');

    if (confirmDelete) {
      context.data.deleteCourse(id, emailAddress, password)
      .then(dataErrors => {
        if (dataErrors.length) {
          console.log(`Errors: ${dataErrors}`);
        }
        else {
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error')
      });
    }
    else {
      console.log('Delete request has been cancelled.')
    }
    
  }

  render() {
    const {
      User,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state.course;
  
    let firstName,
        lastName

    // User is undefined, so we check if it exists first and then extract the properties from it
    if (User) {
      firstName = User.firstName;
      lastName = User.lastName;
    }
    
    const id = this.props.match.params.id;

    const { context } = this.props;
    const authUser = context.authenticatedUser.authenticatedUser;
    
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {
              (() => {
                if (authUser) {
                  const authUserId = authUser.id;

                  if (authUserId === userId) {
                    return (
                      <Fragment>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                        <Link className="button" to="#" onClick={this.delete}>Delete Course</Link>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                      </Fragment>
                    )
                  }
                  else {
                    return (
                      <Fragment>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                      </Fragment>
                    )
                  }
                }
                else {
                  return (
                    <Fragment>
                      <Link className="button button-secondary" to="/">Return to List</Link>
                    </Fragment>
                  )
                }
              })()
            }
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <div>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>By {`${firstName} ${lastName}`}</p>

                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };
};

export default CourseDetail;