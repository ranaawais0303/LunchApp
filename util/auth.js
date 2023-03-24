import axios from "axios";

const BACKEND_URL = "http://192.168.1.124:8000/api/users/";
const BACKEND_URL2 = "http://192.168.1.124:8000/api/Menu/";
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
  const url = `${BACKEND_URL}/signup/verify`;

  const res = await axios.post(url, {
    email: email,
    otp: otp,
  });
  return res;
  //   return authenticate("signup/varify", email, otp);
}

//////////    Login   ////////////////////////////
export async function login({ email, password }) {
  const url = `${BACKEND_URL}/login`;
  const res = await axios.post(url, {
    email: email,
    password: password,
  });

  return res;
}

////////    resent otp    //////////////////////
export async function resendOTP({ email }) {
  const url = `${BACKEND_URL}/signup/resendOTP`;
  const res = await axios.post(url, {
    email: email,
  });
  return res;
}

////////    forgot    /////////////////////////
export async function forgotPassword({ email }) {
  const url = `${BACKEND_URL}/forgotPassword`;
  const res = await axios.post(url, {
    email: email,
  });
  return res;
}

///////   Change password   ///////////////////
export async function changePassword({ email, password }) {
  const url = `${BACKEND_URL}/changePassword`;
  const res = await axios.post(url, {
    email: email,
    password: password,
  });
  return res;
}

/////////   Get All Users   /////////////////
export async function getAllUsers() {
  const url = BACKEND_URL;
  const res = await axios.get(url);
  console.log(res.data.data, "this is my get all users");
  return res.data;
}

////////    Delete User   /////////////////////
export async function deleteUser({ id }) {
  const url = BACKEND_URL;
  const res = await axios.delete(url, {
    data: { id },
  });
  return res;
}

///////   Update User   //////////////////////
export async function updateUser({
  id,
  firstName,
  lastName,
  tokenExp,
  isActive,
}) {
  const url = BACKEND_URL;
  const res = await axios.patch(url, {
    id: id,
    firstName: firstName,
    lastName: lastName,
    tokenExp: tokenExp + "s",
    isActive: isActive,
  });
  return res.data;
}

///////   Get list to be shown in welcome screen  /////
export async function getList(role) {
  const url = `${BACKEND_URL}/getList`;
  const res = await axios.post(url, { role: role });
  return res.data;
}

///////   get Menus  ////////////////////
export async function getAllMenus() {
  const url = `${BACKEND_URL2}/getMenus`;
  const res = await axios.get(url);
  return res.data;
}

///////  Current menu    ///////////////////
export async function currentval({ id }) {
  const url = `${BACKEND_URL2}/updateCurr`;
  const res = await axios.put(url, { id: id });
  return res.data.data;
}
