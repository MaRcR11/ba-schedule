const calenderSetDarkTheme = () => {
  let theme: any = document.getElementById("theme");
  theme.href = "https://cdn.syncfusion.com/ej2/material-dark.css";
  htmlSetDarkTheme();
};

const calenderSetLightTheme = () => {
  let theme: any = document.getElementById("theme");
  theme.href = "https://cdn.syncfusion.com/ej2/material.css";
  htmlSetLightTheme();
};

const htmlSetDarkTheme = () => {
  let htmlElement = document.getElementsByTagName("html")[0];
  htmlElement.classList.add("dark");
  htmlElement.classList.remove("light");
};

const htmlSetLightTheme = () => {
  let htmlElement = document.getElementsByTagName("html")[0];

  htmlElement.classList.add("light");
  htmlElement.classList.remove("dark");
};

const configureFontColor = (color: string) => {
  const elements = document.getElementsByClassName("e-appointment");
  const mode = localStorage.getItem("mode");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLElement;
    element.style.color = `${!color ? (mode === "light" ? "black" : "white") : color}`;
  }
};

const setCorrectCheckingOfThemeToggle = () => {
  try {
    let mode: string = localStorage.getItem("mode") as string;
    return mode !== "light";
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { calenderSetDarkTheme, calenderSetLightTheme, configureFontColor, setCorrectCheckingOfThemeToggle };
