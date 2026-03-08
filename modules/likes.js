// Модуль функционала лайков

import { comments } from "./data.js";
import { renderComments } from "./render.js";

/**
 * Переключает состояние лайка для комментария
 * @param {number} commentId - ID комментария
 */
export function toggleLike(commentId) {
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

/**
 * Устанавливает обработчики событий для кнопок лайков
 */
export function setupLikeHandlers() {
  document.querySelectorAll(".like-button").forEach((button) => {
    const commentElement = button.closest(".comment");
    const commentId = parseInt(commentElement.dataset.id);

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleLike(commentId);
    });
  });
}