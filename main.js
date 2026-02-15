// Главный файл приложения - точка входа

import { renderComments } from "./modules/render.js";
import { initCancelReplyButton } from "./modules/reply.js";
import { initAddCommentHandlers } from "./modules/addComment.js";

/**
 * Инициализация приложения при загрузке страницы
 */
function init() {
  // Рендерим начальные комментарии
  renderComments();

  // Инициализируем обработчики
  initCancelReplyButton();
  initAddCommentHandlers();

  console.log("It works!");
}

// Запускаем инициализацию когда DOM полностью загружен
document.addEventListener("DOMContentLoaded", init);
