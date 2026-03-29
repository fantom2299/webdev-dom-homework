import { getComments as fetchFromAPI } from "./api.js";
import { setComments, initialComments } from "./data.js";
import { renderComments } from "./render.js";
import { showLoading } from "./loading.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Только загружает данные с API и рендерит — без лоадера вверху
export const fetchAndRender = async () => {
  try {
    const data = await fetchFromAPI();
    console.log("Ответ API:", data);

    const formattedComments = data.comments.map((comment) => ({
      id: comment.id,
      name: comment.author.name,
      date: new Date(comment.date).toLocaleString(),
      text: comment.text,
      likes: comment.likes,
      isLiked: false,
    }));

    // initialComments всегда первые, потом API-комментарии
    setComments([...initialComments, ...formattedComments]);
    renderComments();
  } catch (error) {
    console.error(error);
    alert("Не удалось загрузить комментарии");
  }
};

// Только при первой загрузке страницы показываем лоадер вверху
export const loadComments = async () => {
  showLoading();
  await sleep(2000);
  await fetchAndRender();
};