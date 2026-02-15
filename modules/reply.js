// Модуль функционала ответов на комментарии

import { comments, replyingTo, setReplyingTo } from "./data.js";

// Получаем элементы DOM
const replyIndicator = document.getElementById("reply-indicator");
const replyText = document.getElementById("reply-text");
const cancelReplyBtn = document.getElementById("cancel-reply");
const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");

/**
 * Настраивает режим ответа на комментарий
 * @param {Object} comment - комментарий, на который отвечаем
 */
export function setupReply(comment) {
  // Сохраняем информацию о комментарии, на который отвечаем
  setReplyingTo({
    id: comment.id,
    name: comment.name,
    text: comment.text,
  });

  // Подставляем имя автора, если поле пустое
  if (!nameInput.value.trim()) {
    nameInput.value = comment.name;
  }

  // Подставляем текст с упоминанием автора
  const replyPrefix = `@${comment.name}: ${comment.text}\n\n`;
  textInput.value = replyPrefix + textInput.value;

  // Фокусируемся на текстовом поле
  textInput.focus();
  textInput.setSelectionRange(replyPrefix.length, replyPrefix.length);

  // Показываем индикатор ответа
  showReplyIndicator(comment.name);
}

/**
 * Отображает индикатор ответа
 * @param {string} authorName - имя автора комментария
 */
function showReplyIndicator(authorName) {
  replyText.textContent = `Ответ на комментарий ${authorName}`;
  replyIndicator.style.display = "flex";

  // Прокручиваем к форме
  document.querySelector(".add-form").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

/**
 * Отменяет режим ответа
 */
export function cancelReply() {
  setReplyingTo(null);
  replyIndicator.style.display = "none";
}

/**
 * Устанавливает обработчики для клика по комментариям (ответ)
 */
export function setupReplyHandlers() {
  document.querySelectorAll(".comment").forEach((commentElement) => {
    commentElement.addEventListener("click", (event) => {
      // Не запускаем ответ при клике на лайк
      if (event.target.closest(".likes")) {
        return;
      }

      const commentId = parseInt(commentElement.dataset.id);
      const comment = comments.find((c) => c.id === commentId);

      if (comment) {
        setupReply(comment);
      }
    });
  });
}

/**
 * Инициализирует обработчик отмены ответа
 */
export function initCancelReplyButton() {
  if (cancelReplyBtn) {
    cancelReplyBtn.addEventListener("click", cancelReply);
  } else {
    console.error("Элемент cancel-reply не найден");
  }
}

/**
 * Получает текущий объект replyingTo
 * @returns {Object|null}
 */
export function getReplyingTo() {
  return replyingTo;
}
