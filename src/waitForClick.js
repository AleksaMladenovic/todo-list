export default function waitForClick(buttons) {
    return new Promise((resolve) => {
      buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          resolve(e.target.textContent);
        });
      });
    });
  }