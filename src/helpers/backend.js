import Swal from "sweetalert2";

class Backend {
  constructor(apiURL) {
    this.apiURL = apiURL;
  }

  getItem(key) {
    const json = localStorage.getItem(key);
    if (json == null) {
      return null;
    }

    try {
      return JSON.parse(json);
    } catch (error) {
      /* do nothing */
    }

    return json;
  }

  getURL(url, params) {
    let result = `${this.apiURL}/${url}`;

    if (params) {
      result += `?${new URLSearchParams(params)}`;
    }

    return result;
  }

  async getHeaders(authorized) {
    let headers = {
      "Content-Type": "application/json",
    };

    if (authorized) {
      const token = await this.getItem("token");
      if (token) {
        headers = {
          ...headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    return headers;
  }

  // sends a get request
  async get(url, params, authorized = true) {
    const response = await fetch(this.getURL(url, params), {
      method: "GET",
      headers: await this.getHeaders(authorized),
    });

    if (!response.ok) {
      const { name, message } = await response.json();

      Swal.fire({
        icon: "error",
        title: name,
        text: message,
      });

      return;
    }

    const data = await response.json();

    return data;
  }

  async post(url, params, authorized = true) {
    const headers = await this.getHeaders(authorized);
    const response = await fetch(this.getURL(url), {
      method: "POST",
      headers,
      body: params ? JSON.stringify(params) : null,
    });

    if (!response.ok) {
      const { name, message } = await response.json();

      Swal.fire({
        icon: "error",
        title: name,
        text: message,
      });

      return;
    }

    const data = await response.json();

    return data;
  }

  async put(url, params, authorized = true) {
    const headers = await this.getHeaders(authorized);
    const response = await fetch(this.getURL(url), {
      method: "PUT",
      headers,
      body: params ? JSON.stringify(params) : null,
    });
    if (!response.ok) {
      const { name, message } = await response.json();

      Swal.fire({
        icon: "error",
        title: name,
        text: message,
      });

      return;
    }

    const data = await response.json();

    return data;
  }

  async delete(url) {
    const response = await fetch(this.getURL(url), {
      method: "DELETE",
      headers: await this.getHeaders(true),
    });

    if (!response.ok) {
      const { name, message } = await response.json();

      Swal.fire({
        icon: "error",
        title: name,
        text: message,
      });

      return;
    }

    const data = await response.json();

    return data;
  }
}

export default Backend;
