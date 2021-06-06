import { Component } from 'react';
import config from './config/config';

class Data extends Component {
  api(path, method = 'GET', body = null) {
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

    return fetch(url, options);
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
};

export default Data;