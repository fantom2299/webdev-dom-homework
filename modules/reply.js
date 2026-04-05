import { getComments, setReplyingTo } from "./data.js";

export function setupReply(comment) {
  const nameInput = document.querySelector(".add-form-name");
  const textInput = document.querySelector(".add-form-text");

  setReplyingTo({
    id: comment.id,
    name: comment.name,
    text: comment.text,
  });

  if (!nameInput.value.trim()) {
    nameInput.value = comment.name;
  }

  if (!textInput.value.includes(`@${comment.name}`)) {
    const currentText = textInput.value;
    textInput.value = `@${comment.name}: ${currentText}`;
  }

  textInput.focus();
  showReplyIndicator(comment.name);
}

function showReplyIndicator(authorName) {
  const replyIndicator = document.getElementById("reply-indicator");
  const replyText = document.getElementById("reply-text");

  if (!replyIndicator || !replyText) return;

  replyText.textContent = `Ответ на комментарий ${authorName}`;
  replyIndicator.style.display = "flex";

  const addForm = document.querySelector(".add-form");
  if (addForm) {
    addForm.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export function cancelReply() {
  setReplyingTo(null);
  const replyIndicator = document.getElementById("reply-indicator");
  if (replyIndicator) replyIndicator.style.display = "none";
}

export function setupReplyHandlers() {
  document.querySelectorAll(".reply-button").forEach((button) => {
    const commentElement = button.closest(".comment");
    const commentId = parseInt(commentElement.dataset.id);
    const comment = getComments().find((c) => c.id === commentId);

    if (comment) {
      button.addEventListener("click", () => {
        setupReply(comment);
      });
    }
  });
}

export function initCancelReplyButton() {
  const cancelReplyBtn = document.getElementById("cancel-reply");
  if (cancelReplyBtn) {
    cancelReplyBtn.addEventListener("click", cancelReply);
  }
}
