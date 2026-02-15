// Модуль рендеринга комментариев

import { comments } from "./data.js";
import { setupLikeHandlers } from "./likes.js";
import { setupReplyHandlers } from "./reply.js";

/**
 * Создает HTML-разметку для одного комментария
 * @param {Object} comment - объект комментария
 * @returns {string} - HTML-строка комментария
 */
export function createCommentHTML(comment) {
  const likeClass = comment.isLiked ? "-active-like" : "";

  return `
    <li class="comment" data-id="${comment.id}">
      <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${likeClass}"></button>
        </div>
      </div>
    </li>
  `;
}

/**
 * Отрисовывает все комментарии на странице
 */
export function renderComments() {
  const commentsContainer = document.querySelector(".comments");
  commentsContainer.innerHTML = "";

  comments.forEach((comment) => {
    const commentHTML = createCommentHTML(comment);
    commentsContainer.insertAdjacentHTML("beforeend", commentHTML);
  });

  // Подключаем обработчики событий
  setupLikeHandlers();
  setupReplyHandlers();
}
