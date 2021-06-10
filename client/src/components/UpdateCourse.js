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
    const { data } = this.props.context;
    const id = this.props.match.params.id;

    data.getCourse(id)
      .then(courseData => {
        this.setState({
          id: courseData.id,
          title: courseData.title,
          description: courseData.description,
          estimatedTime: courseData.estimatedTime,
          materialsNeeded: courseData.materialsNeeded,
          userId: courseData.userId
        });
      });
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

  render() {
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state;
    
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <Form 
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

export default UpdateCourse;