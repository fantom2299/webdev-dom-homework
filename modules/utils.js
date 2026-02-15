// Модуль вспомогательных функций

/**
 * Функция для экранирования HTML и предотвращения XSS-атак
 * @param {string} text - текст для экранирования
 * @returns {string} - безопасный HTML
 */
export function sanitizeHTML(text) {
  if (!text) return "";

  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Функция для форматирования текущей даты в формате DD.MM.YY HH:MM
 * @returns {string} - отформатированная дата
 */
export function formatDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
