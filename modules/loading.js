// При загрузке страницы — очищает список и показывает лоадер
export const showLoading = () => {
  const container = document.querySelector(".comments");
  container.innerHTML = "<li class='loading'>Загрузка комментариев...</li>";
};

// При добавлении комментария — добавляет лоадер в конец списка
export const showLoadingBottom = () => {
  const container = document.querySelector(".comments");
  container.insertAdjacentHTML(
    "beforeend",
    "<li class='loading'>Загрузка комментариев...</li>"
  );
};
