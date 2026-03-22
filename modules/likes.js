export const setupLikeHandlers = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isLiked = button.classList.contains("-active-like");

      if (isLiked) {
        // Снимаем лайк — встряска
        button.classList.remove("-active-like");
        button.classList.add("shake");

        // Убираем класс после анимации
        button.addEventListener(
          "animationend",
          () => {
            button.classList.remove("shake");
          },
          { once: true }
        );
      } else {
        // Ставим лайк — прыжок (анимация уже в CSS через -active-like)
        button.classList.add("-active-like");
      }
    });
  });
};