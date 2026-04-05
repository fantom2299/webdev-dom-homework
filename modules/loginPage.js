import { login } from "./api.js";
import { saveUser } from "./auth.js";

export const renderLoginPage = (container, onSuccess) => {
  container.innerHTML = `
    <div class="login-form">
      <h2 class="login-title">Вход</h2>
      <input type="text" class="login-input" id="login-input" placeholder="Логин" />
      <input type="password" class="login-input" id="password-input" placeholder="Пароль" />
      <p class="login-error" id="login-error"></p>
      <div class="login-row">
        <button class="login-button" id="login-button">Войти</button>
      </div>
    </div>
  `;

  const loginInput = container.querySelector("#login-input");
  const passwordInput = container.querySelector("#password-input");
  const loginButton = container.querySelector("#login-button");
  const loginError = container.querySelector("#login-error");

  const handleLogin = async () => {
    const loginValue = loginInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (!loginValue || !passwordValue) {
      loginError.textContent = "Заполните все поля";
      return;
    }

    try {
      loginButton.disabled = true;
      loginButton.textContent = "Вхожу...";
      loginError.textContent = "";

      const user = await login(loginValue, passwordValue);

      saveUser(user.token, user.name);
      onSuccess();
    } catch (error) {
      loginError.textContent = error.message;
    } finally {
      loginButton.disabled = false;
      loginButton.textContent = "Войти";
    }
  };

  loginButton.addEventListener("click", handleLogin);

  loginInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
  });

  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
  });
};
