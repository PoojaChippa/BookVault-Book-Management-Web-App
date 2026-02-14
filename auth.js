const USERS_KEY = "users";
const SESSION_KEY = "sessionUser";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(u) {
  localStorage.setItem(USERS_KEY, JSON.stringify(u));
}

function signup(username, password) {
  let users = getUsers();
  if (users.find((u) => u.username === username)) {
    return "User exists";
  }
  users.push({ username, password });
  saveUsers(users);
  return "success";
}

function login(username, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) return false;
  localStorage.setItem(SESSION_KEY, username);
  return true;
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  location.href = "login.html";
}

function requireAuth() {
  if (!localStorage.getItem(SESSION_KEY)) {
    location.href = "login.html";
  }
}
