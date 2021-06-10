import { Component } from 'react';
import config from './config/config';

class Data extends Component {
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

  async getCourses() {
    const response = await this.api('/courses', 'GET', null);

    if (response.status === 200) {
      return response.json(data => data);
    }
    else {
      return null;
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);

    if (response.status === 200) {
      return response.json(data => data);
    }
    else {
      return null;
    }
  }
};

export default Data;