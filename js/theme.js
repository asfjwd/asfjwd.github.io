(function () {
  "use strict";

  var storageKey = "asfjwd-theme";
  var root = document.documentElement;
  var savedTheme = null;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    // The switch still works when storage is unavailable.
  }

  if (savedTheme !== "light" && savedTheme !== "dark") savedTheme = null;

  function activeTheme() {
    return savedTheme || "dark";
  }

  function applyTheme() {
    var theme = activeTheme();
    root.setAttribute("data-theme", theme);
    var button = document.querySelector(".theme-toggle");
    if (button) {
      var label = "Switch to " + (theme === "dark" ? "light" : "dark") + " theme";
      button.setAttribute("aria-label", label);
      button.title = label;
    }
  }

  applyTheme();

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme-toggle");
    if (button) {
      button.addEventListener("click", function () {
        savedTheme = activeTheme() === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(storageKey, savedTheme);
        } catch (error) {
          // Keep the selected theme for this page even without storage.
        }
        applyTheme();
      });
    }
    applyTheme();
  });
}());
