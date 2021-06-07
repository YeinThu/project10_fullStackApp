import { Component } from 'react';
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
    const { data } = this.props.context;
    const id = this.props.match.params.id;

    data.getCourse(id)
      .then(courseData => {
        this.setState({
          course: courseData
        })
      });
  }

  render() {
    const {
      User,
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state.course;

    let firstName,
        lastName

    // User is undefined, so we check if it exists first and then extract the properties from it
    if (User) {
      firstName = User.firstName;
      lastName = User.lastName;
    }
    
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button" to="update-course.html">Update Course</Link>
            <Link className="button" to="#">Delete Course</Link>
            <Link className="button button-secondary" to="index.html">Return to List</Link>
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <div>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>By</p>

                <p>{description}</p>
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