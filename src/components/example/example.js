export default () => {
  console.log("example.js loaded");
  fetch("/example?page=1")
    .then((response) => response.json())
    .then((json) => console.log("example proxy", json));
};
