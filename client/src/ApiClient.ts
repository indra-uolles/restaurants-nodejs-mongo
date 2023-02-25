export default class ApiClient {
  base_url = "http://localhost:8080";

  constructor() {
    // TODO: define base url in env file
    // this.base_url = process.env.REACT_APP_BASE_API_URL | "";
  }

  async request(options: any) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== "") {
      query = "?" + query;
    }

    const response = await fetch(this.base_url + options.url + query, {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    if (!response.ok) {
      const data = response.status !== 204 ? await response.json() : null;
      console.log(response.status, response.statusText, data.errors);
      alert("There was an error!");
    } else {
      const data = response.status !== 204 ? await response.json() : null;
      return data;
    }
  }

  async get(url: string, query: any, options: any) {
    return this.request({ method: "GET", url, query, ...options });
  }

  async post(url: string, body: any, options?: any) {
    return this.request({ method: "POST", url, body, ...options });
  }

  async put(url: string, body: any, options: any) {
    return this.request({ method: "PUT", url, body, ...options });
  }

  async delete(url: string, options: any) {
    return this.request({ method: "DELETE", url, ...options });
  }
}
