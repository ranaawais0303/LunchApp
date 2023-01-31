import axios from "axios";

const BACKEND_URL = "http://192.168.1.124:8000/api/users/";
async function authenticate(mode, email, password) {
  const url = `${BACKEND_URL}/${mode}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
  });
  return response.data;
}
export function createUser(data) {
  return authenticate("signup", data);
}

export function login(email, password) {
  return authenticate("login", email, password);
}
