import { sanitizeHTML } from "./utils.js";
import { postComment } from "./api.js";
import { fetchAndRender } from "./loadComments.js";
import { cancelReply } from "./reply.js";
import { getReplyingTo } from "./data.js";
import { getUserName } from "./auth.js";

const validate = (text) => {
  if (text.trim().length < 3) {
    alert("Комментарий должен содержать минимум 3 символа");
    return false;
  }
  return true;
};

export const initAddCommentHandlers = () => {
  const textInput = document.querySelector(".add-form-text");
  const addButton = document.querySelector(".add-form-button");
  const addForm = document.querySelector(".add-form");
  const nameInput = document.querySelector(".add-form-name");
  const addingLabel = document.querySelector("#adding-label");

  const name = getUserName();
  if (name && nameInput) {
    nameInput.value = name;
    nameInput.setAttribute("readonly", true);
  }

  const addComment = async (text) => {
    if (!validate(text)) return;

    const safeText = sanitizeHTML(text.trim());
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const replyingTo = getReplyingTo();
    const parentId = replyingTo ? replyingTo.id : null;

    try {
      addButton.disabled = true;
      addButton.textContent = "Отправка...";
      addForm.style.display = "none";
      if (addingLabel) addingLabel.style.display = "block";

      await postComment(safeText, parentId);

      textInput.value = "";
      cancelReply();

      await sleep(2000);
      await fetchAndRender();
    } catch (error) {
      console.error(error);
      alert("Нет соединения с интернетом. Повторите попытку позже.");
    } finally {
      addForm.style.display = "flex";
      if (addingLabel) addingLabel.style.display = "none";
      addButton.disabled = false;
      addButton.textContent = "Написать";
    }
  };

  addButton.addEventListener("click", () => {
    addComment(textInput.value);
  });
};
