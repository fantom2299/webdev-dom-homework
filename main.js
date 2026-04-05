import { loadComments } from "./modules/loadComments.js";
import { initAddCommentHandlers } from "./modules/addComment.js";
import { initCancelReplyButton } from "./modules/reply.js";
import { isLoggedIn, logout } from "./modules/auth.js";
import { renderLoginPage } from "./modules/loginPage.js";

const formArea = document.querySelector(".form-area");

const renderAuthLink = () => {
  formArea.innerHTML = `
    <p class="auth-link-text">
      <a href="#" class="auth-link">Чтобы добавить комментарий, авторизуйтесь</a>
    </p>
  `;

  formArea.querySelector(".auth-link").addEventListener("click", (e) => {
    e.preventDefault();
    renderLoginPage(formArea, () => renderCommentForm());
  });
};

const renderCommentForm = () => {
  formArea.innerHTML = `
    <div id="reply-indicator" class="reply-indicator" style="display: none;">
      <span id="reply-text">Ответ на комментарий</span>
      <button id="cancel-reply" class="cancel-reply-btn">×</button>
    </div>
    <div class="add-form">
      <input type="text" class="add-form-name" placeholder="Ваше имя" />
      <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
      <div class="add-form-row">
        <button class="logout-button" id="logout-button">Выйти</button>
        <button class="add-form-button">Написать</button>
      </div>
    </div>
    <p class="adding-label" id="adding-label" style="display:none;">Комментарий добавляется...</p>
  `;

  initAddCommentHandlers();
  initCancelReplyButton();

  document.querySelector("#logout-button").addEventListener("click", () => {
    logout();
    renderAuthLink();
  });
};

loadComments();

if (isLoggedIn()) {
  renderCommentForm();
} else {
  renderAuthLink();
}
