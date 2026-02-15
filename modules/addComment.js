// Модуль добавления новых комментариев

import { comments, incrementNextId } from "./data.js";
import { sanitizeHTML, formatDate } from "./utils.js";
import { renderComments } from "./render.js";
import { cancelReply, getReplyingTo } from "./reply.js";

// Получаем элементы DOM
const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

/**
 * Добавляет новый комментарий
 * @param {string} name - имя автора
 * @param {string} text - текст комментария
 */
export function addComment(name, text) {
  // Проверяем заполнение полей
  if (!name.trim() || !text.trim()) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  // Очищаем HTML из ввода
  const safeName = sanitizeHTML(name.trim());
  const safeText = sanitizeHTML(text.trim());

  // Убираем префикс ответа, если он есть
  let finalText = safeText;
  const replyingTo = getReplyingTo();

  if (replyingTo) {
    // Удаляем строку с упоминанием из начала текста
    const replyPrefix = `@${replyingTo.name}: ${replyingTo.text}\n\n`;
    if (safeText.startsWith(replyPrefix)) {
      finalText = safeText.slice(replyPrefix.length);
    }
  }

  // Создаем новый комментарий
  const newComment = {
    id: incrementNextId(),
    name: safeName,
    date: formatDate(),
    text: finalText,
    likes: 0,
    isLiked: false,
  };

  // Добавляем комментарий в массив
  comments.push(newComment);

  // Очищаем форму
  nameInput.value = "";
  textInput.value = "";

  // Сбрасываем режим ответа
  cancelReply();

  // Обновляем отображение
  renderComments();

  // Прокручиваем к новому комментарию
  setTimeout(() => {
    const newCommentElement = document.querySelector(
      `[data-id="${newComment.id}"]`
    );
    if (newCommentElement) {
      newCommentElement.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
}

/**
 * Инициализирует обработчики для добавления комментария
 */
export function initAddCommentHandlers() {
  if (addButton) {
    addButton.addEventListener("click", () => {
      addComment(nameInput.value, textInput.value);
    });
  }

  // Добавляем возможность отправки по Enter (Shift+Enter для новой строки)
  if (textInput) {
    textInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        addComment(nameInput.value, textInput.value);
      }
    });

    // Добавляем возможность отправки по Ctrl+Enter
    textInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.ctrlKey) {
        event.preventDefault();
        addComment(nameInput.value, textInput.value);
      }
    });
  }
}
