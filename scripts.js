const textInput = document.querySelector("#input");
const textOutput = document.querySelector("#output");
const buttons = document.querySelectorAll("button");
const cssBtn = document.querySelector("#btn-css");
const cssContainer = document.querySelector("#container-css");
const colorPicker = document.querySelector("input");

textInput.addEventListener("input", cloneText);
buttons.forEach((button) => button.addEventListener("click", handleNewStyle));

function cloneText() {
  const text = this.value;
  textOutput.textContent = text;
  changeColor();
}

/* object keys are the buttons 'ids' & values objects {css : , js : } */
const styleInfos = {
  right: { css: "text-align", js: "textAlign" },
  left: { css: "text-align", js: "textAlign" },
  center: { css: "text-align", js: "textAlign" },
  bold: { css: "font-weight", js: "fontWeight" },
  underline: { css: "text-decoration", js: "textDecoration" },
};

/* 2nd object for outputting css code : keys are : color , text-align , text-decoration ; values 'ids' of button clicked */
/* for example css[firstObj.id.css] = id ; */

const cssDefaultStyle = {
  "text-align": "left",
  "text-decoration": "",
  "font-weight": "",
};

const cssNewStyle = {
  "text-align": "left",
  "text-decoration": "",
  "font-weight": "",
};

/* function handleNewStyle() invoked when you click on a button */
function handleNewStyle() {
  if (!textInput.value) return;
  let style = this.id;
  const { css, js } = styleInfos[style];
  style = cssNewStyle[css] == style ? cssDefaultStyle[css] : style;
  cssNewStyle[css] = style;
  changeStyle(js, style);
  showCssNewCode();
}

function changeStyle(style, styleValue) {
  textOutput.style[style] = styleValue;
}

function changeColor() {
  if (!textInput.value) return;
  textOutput.style.color = colorPicker.value;
  showCssNewCode();
}

function showCssNewCode() {
  cssContainer.innerHTML = "CSS-SELECTOR {";
  for (code in cssNewStyle) {
    if (cssNewStyle[code]) {
      const p = document.createElement("p");
      p.style.marginBottom = "0.5px";
      p.innerHTML += `${code}  :  ${cssNewStyle[code]};`;
      cssContainer.appendChild(p);
    }
  }

  cssContainer.innerHTML += `color : ${colorPicker.value}`;
  cssContainer.innerHTML += "}";
}

colorPicker.addEventListener("change", changeColor);
