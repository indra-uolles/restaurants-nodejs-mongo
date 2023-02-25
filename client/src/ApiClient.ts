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

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error: any) {
      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: "The server is unresponsive",
            description: error.toString(),
          };
        },
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null,
    };
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
