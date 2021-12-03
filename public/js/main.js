const rapi = document.querySelector("rapi-doc");


if (localStorage.theme === "light") {
  document.querySelector("body").classList.remove("dark");
  rapi.setAttribute("theme", "light");
} else {
  rapi.setAttribute("theme", "dark");
}

function changeRenderStyle() {
  if (window.innerWidth > 480) {
    rapi.setAttribute("render-style", "focused");
  } else {
    rapi.setAttribute("render-style", "view");
  }
}

function changeTheme() {
  let activeTheme = rapi.getAttribute("theme");
  if (activeTheme === "dark") {
    rapi.setAttribute("theme", "light");
    localStorage.theme = "light"
  } else {
    rapi.setAttribute("theme", "dark");
    localStorage.theme = "dark"
  }
  document.querySelector("body").classList.toggle("dark");
}

function copyToClipboard() {
  let copyButton = document.querySelector("#copy");
  let textField = document.querySelector("#api-key");
  const textArea = document.createElement('textarea');
  textArea.textContent = textField.textContent;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  copyButton.textContent = "Copied";
  setTimeout(() => copyButton.textContent = "Copy", 5000);
}

// change render mode in wider screen
document.querySelector("body").onload = changeRenderStyle;
window.onresize = changeRenderStyle;
// change theme
document.querySelector("lord-icon").addEventListener("click", changeTheme);
// copy text
document.querySelector("#copy").addEventListener("click", copyToClipboard);