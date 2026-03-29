import { getComments } from "./data.js";
import { renderComments } from "./render.js";

/**
 * Переключает состояние лайка для комментария
 * @param {number} commentId - ID комментария
 */
export function toggleLike(commentId) {
  const comments = getComments();
  const commentIndex = comments.findIndex((c) => c.id === commentId);

  if (commentIndex === -1) return;

  if (comments[commentIndex].isLiked) {
    comments[commentIndex].likes -= 1;
  } else {
    comments[commentIndex].likes += 1;
  }
  comments[commentIndex].isLiked = !comments[commentIndex].isLiked;
  renderComments();
}

export const setupLikeHandlers = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Берём ID комментария из родительского <li data-id="...">
      const commentId = Number(button.closest(".comment").dataset.id);

      const isLiked = button.classList.contains("-active-like");

      if (isLiked) {
        // Снимаем лайк — встряска
        button.classList.remove("-active-like");
        button.classList.add("shake");

        button.addEventListener(
          "animationend",
          () => {
            button.classList.remove("shake");
          },
          { once: true }
        );
      } else {
        // Ставим лайк — прыжок
        button.classList.add("-active-like");
      }

      // Обновляем данные и перерисовываем счётчик
      toggleLike(commentId);
    });
  });
};