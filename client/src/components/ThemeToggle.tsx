function ThemeToggle() {
  let toggle = document.createElement("div");
  toggle.classList.add("field");
  let input = document.createElement("input");
  input.id = "switchRoundedDefault";
  input.type = "checkbox";
  input.name = "switchRoundedDefault";
  input.classList.add("is-rounded");
  input.classList.add("switch");
  let label = document.createElement("label");
  label.setAttribute("for", "switchRoundedDefault");
  toggle.append(input);
  toggle.append(label);

  return toggle;
}

export default ThemeToggle;
