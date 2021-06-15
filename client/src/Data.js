import { Component } from 'react';
import config from './config/config'; // Contains the base url 

class Data extends Component {
  // API handler
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    };

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  // GET individual user
  async getUser(emailAddress, password) {
    const response = await this.api('/users', 'GET', null, true, {
      emailAddress,
      password
    });

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else {
      return null;
    }
  }

  // POST creates a new user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);

    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error();
    }
  }

  // GET all courses
  async getCourses() {
    const response = await this.api('/courses', 'GET', null);

    if (response.status === 200) {
      return response.json(data => data);
    }
    else {
      return null;
    }
  }

  // GET individual course
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);

    if (response.status === 200) {
      return response.json(data => data);
    }
    else {
      return null;
    }
  }

  // POST creates a new course
  async createCourse(course, emailAddress, password) {
    console.log(course, emailAddress, password);
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });

    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error();
    }
  }

  // PUT update individual course
  async updateCourse(course, emailAddress, password) {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, { emailAddress, password });
    
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error();
    }
  }

  // DELETE individual course
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });

    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data;
      });
    }
    else {
      throw new Error();
    }
  }
};

export default Data;