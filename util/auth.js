import axios from "axios";

const BACKEND_URL = "http://192.168.1.124:8000/api/users/";
async function authenticate(mode, firstName, lastName, email, password) {
  const url = `${BACKEND_URL}/${mode}`;
  console.log("pass----", password);
  console.log("name-----", firstName);
  console.log("lname----", lastName);
  console.log("email----", email);
  return await axios
    .post(url, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
    .then((res) => {
      console.log("response", res.data);
      return res.data;
    })
    .catch((error) => {
      return error.message;
    });

  //   return response.data;
}
export function createUser({ firstName, lastName, email, password }) {
  console.log("pass", password);
  console.log("name", firstName);
  console.log("lname", lastName);
  console.log("email", email);
  return authenticate("signup", firstName, lastName, email, password);
}

export function login(email, password) {
  return authenticate("login", email, password);
}
