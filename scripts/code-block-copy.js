const svgCopy =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
const svgCheck =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';
const svgError =
  '<svg height="32" style="overflow:visible;enable-background:new 0 0 32 32" viewBox="0 0 32 32" width="32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g id="Error_1_"><g id="Error"><circle cx="16" cy="16" id="BG" r="16" style="fill:#D72828;"/><path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style="fill:#E6E6E6;"/></g></g></g></svg>';

/** @param {Clipboard} clipboard */
const addCopyButton = (clipboard) => {
  document.querySelectorAll("pre > code").forEach((code) => {
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = svgCopy;
    button.addEventListener("click", () => {
      clipboard.writeText(code.innerText).then(
        () => {
          button.blur();
          button.innerHTML = svgCheck;
          setTimeout(() => {
            button.innerHTML = svgCopy;
          }, 2000);
        },
        () => {
          button.innerHTML = svgError;
        }
      );
    });
    const div = document.createElement("div");
    div.className = 'code-copy-wrapper'
    const pre = code.parentNode;
    pre.parentNode.insertBefore(div, pre)
    div.appendChild(pre)
    div.insertBefore(button, pre);
  });
};

if (navigator && navigator.clipboard) {
  addCopyButton(navigator.clipboard);
} else {
  import(
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js"
  ).then((clipboardPolyfill) => {
    const script = document.createElement("script");
    script.src = clipboardPolyfill;
    script.integrity = "sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=";
    script.crossOrigin = "anonymous";
    script.onload = () => addCopyButton(clipboard);
    document.body.appendChild(script);
  });
}
