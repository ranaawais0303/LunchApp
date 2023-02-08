import axios from "axios";

const BACKEND_URL = "http://192.168.1.124:8000/api/users/";
async function authenticate(mode, firstName, lastName, email, password) {
  const url = `${BACKEND_URL}/${mode}`;

  return await axios.post(url, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
}

//////////signup user
export function createUser({ firstName, lastName, email, password }) {
  return authenticate("signup", firstName, lastName, email, password);
}

////////////varify user with otp
export async function varifyUser({ email, otp }) {
  const url = `${BACKEND_URL}/signup/varify`;

  const res = await axios.post(url, {
    email: email,
    otp: otp,
  });
  return res;
  //   return authenticate("signup/varify", email, otp);
}
export async function login({ email, password }) {
  const url = `${BACKEND_URL}/login`;
  const res = await axios.post(url, {
    email: email,
    password: password,
  });

  return res;
}

export async function resendOTP({ email }) {
  const url = `${BACKEND_URL}/signup/resendOTP`;
  const res = await axios.post(url, {
    email: email,
  });
  return res;
}
