export default function onlyAuthenticated(nextState, replace, callback) {
  if (localStorage.getItem("id") == undefined) {
    replace("/Login");
  }
  callback();
}
