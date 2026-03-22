import { sanitizeHTML } from "./utils.js";
import { postComment } from "./api.js";
import { fetchAndRender } from "./loadComments.js";
import { cancelReply } from "./reply.js";

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

export const addComment = async (name, text) => {
  if (!name.trim() || !text.trim()) {
    alert("Заполните все поля");
    return;
  }

  const safeName = sanitizeHTML(name.trim());
  const safeText = sanitizeHTML(text.trim());

  try {
    addButton.disabled = true;
    addButton.textContent = "Отправка...";

    await postComment(safeName, safeText);

    nameInput.value = "";
    textInput.value = "";

    cancelReply();

    await fetchAndRender();

  } catch (error) {
    console.error(error);
    alert("Ошибка отправки комментария");
  } finally {
    addButton.disabled = false;
    addButton.textContent = "Написать";
  }
};

export const initAddCommentHandlers = () => {
  addButton.addEventListener("click", () => {
    addComment(nameInput.value, textInput.value);
  });
};