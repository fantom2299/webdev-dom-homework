import { sanitizeHTML } from "./utils.js";
import { postComment } from "./api.js";
import { fetchAndRender } from "./loadComments.js";
import { cancelReply } from "./reply.js";
import { showLoadingBottom } from "./loading.js";

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

// Валидация полей
const validate = (name, text) => {
  if (name.trim().length < 3) {
    alert("Имя должно содержать минимум 3 символа");
    return false;
  }

  if (text.trim().length < 3) {
    alert("Комментарий должен содержать минимум 3 символа");
    return false;
  }

  return true;
};

export const addComment = async (name, text) => {
  if (!validate(name, text)) return;

  const safeName = sanitizeHTML(name.trim());
  const safeText = sanitizeHTML(text.trim());

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    addButton.disabled = true;
    addButton.textContent = "Отправка...";

    await postComment(safeName, safeText);

    nameInput.value = "";
    textInput.value = "";

    cancelReply();

    showLoadingBottom();
    await sleep(4000);
    await fetchAndRender();
  } catch (error) {
    console.error(error);
    alert("Нет соединения с интернетом. Повторите попытку позже.");
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