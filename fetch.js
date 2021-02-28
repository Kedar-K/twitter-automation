fetch("https://dev.to/api/articles?username=kedark")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

console.log(response);
