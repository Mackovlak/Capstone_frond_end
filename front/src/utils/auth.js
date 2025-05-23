export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // or use navigate() from react-router
}