function codeTextFrom(pre) {
  const codeCell = pre.querySelector("td.code");
  const source = codeCell || pre.querySelector("code") || pre;
  return source.textContent.replace(/\n$/, "");
}

const COPY_ICON =
  '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M3.5 10.5h-1A1.5 1.5 0 0 1 1 9V2.5A1.5 1.5 0 0 1 2.5 1H9a1.5 1.5 0 0 1 1.5 1.5v1"/></svg>';
const CHECK_ICON =
  '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5l4 4 8-9"/></svg>';

function addCopyButton(pre) {
  if (pre.querySelector(":scope > .copy-code-button")) return;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "copy-code-button";
  button.innerHTML = COPY_ICON;
  button.setAttribute("aria-label", "Copy code");
  button.title = "Copy";

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(codeTextFrom(pre));
      button.innerHTML = CHECK_ICON;
      button.title = "Copied!";
    } catch {
      button.title = "Copy failed";
    }

    setTimeout(() => {
      button.innerHTML = COPY_ICON;
      button.title = "Copy";
    }, 1500);
  });

  pre.appendChild(button);
}

document
  .querySelectorAll("figure.highlight > pre, div.highlighter-rouge pre")
  .forEach(addCopyButton);
