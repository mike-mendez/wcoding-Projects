let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let labels = document.querySelectorAll("label.required");
  labels.forEach((item) => {
    item.classList.add("red");
  });
  let inputs = document.querySelectorAll(
    'input[type="text"], input[type="password"], input[type="email"]'
  );
  inputs.forEach((item) => {
    item.classList.add("red");
  });

  //Add class "display" to all span elements with class error
  let errorSpan = document.querySelectorAll("span.error");
  errorSpan.forEach((item) => {
    item.classList.add("display");
  });
});