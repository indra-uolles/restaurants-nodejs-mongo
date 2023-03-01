export default async function callApi({
  endpoint,
  method = "GET",
  data,
  token,
  customHeaders = {},
  customConfig = {},
}: {
  endpoint: string;
  method?: string;
  data: any;
  token?: string;
  customHeaders?: any;
  customConfig?: any;
}) {
  // TODO: this.base_url = process.env.REACT_APP_BASE_API_URL | "";
  const base_url = "http://localhost:8080";

  if (method === "GET" && data) {
    throw new Error(
      "GET requests cannot have a body. Did you mean to use method POST or PUT?"
    );
  }

  const config = {
    body:
      (method === "POST" || method === "PUT") && data
        ? JSON.stringify(data)
        : undefined,
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(data ? { "Content-Type": "application/json" } : {}),
      ...customHeaders,
    },
    ...customConfig,
  };

  try {
    const response = await window.fetch(`${base_url}${endpoint}`, config);
    if (response.status === 401) {
      return Promise.reject({ message: "Please re-authenticate." });
    }
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      const errors = data.errors || {};
      if (Object.keys(errors).length > 0) {
        const errorsList = Object.keys(errors).map((key) => {
          return { message: errors[key] };
        });
        return Promise.reject(errorsList);
      }
    }
  } catch (error: any) {
    throw Error(error);
  }
}
