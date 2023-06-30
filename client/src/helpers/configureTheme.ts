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

export { calenderSetDarkTheme, calenderSetLightTheme };
