// При загрузке страницы — очищает список и показывает лоадер
export const showLoading = () => {
  const container = document.querySelector(".comments");
  container.innerHTML = "<li class='loading'>Загрузка комментариев...</li>";
};
