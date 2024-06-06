



const authInstance = () => {
  const authToken: string | null = localStorage.getItem("token");
  let headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }
  return headers
};

const MauthInstance = () => {
  const authToken: string | null = localStorage.getItem("token");
  let headers: Record<string, string> = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  };

  if (authToken) {
    headers = { ...headers, Authorization: `Bearer ${authToken}` };
  }
  return headers
};

export { authInstance, MauthInstance };
