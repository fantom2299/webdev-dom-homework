import { sanitizeHTML } from "./utils.js";
import { postComment } from "./api.js";
import { fetchAndRender } from "./loadComments.js";
import { cancelReply } from "./reply.js";


const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");
const addForm = document.querySelector(".add-form");

// Надпись "Комментарий добавляется"
const addingLabel = document.createElement("p");
addingLabel.classList.add("adding-label");
addingLabel.textContent = "Комментарий добавляется...";
addForm.after(addingLabel);
addingLabel.style.display = "none";

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
    // Скрываем форму, показываем надпись
    addForm.style.display = "none";
    addingLabel.style.display = "block";

    await postComment(safeName, safeText);

    nameInput.value = "";
    textInput.value = "";

    cancelReply();

    // showLoadingBottom();
    await sleep(4000);
    await fetchAndRender();
  } catch (error) {
    console.error(error);
    alert("Нет соединения с интернетом. Повторите попытку позже.");
  } finally {
    // Показываем форму обратно, скрываем надпись
    addForm.style.display = "flex";
    addingLabel.style.display = "none";
    addButton.disabled = false;
    addButton.textContent = "Написать";
  }
};

export const initAddCommentHandlers = () => {
  addButton.addEventListener("click", () => {
    addComment(nameInput.value, textInput.value);
  });
};