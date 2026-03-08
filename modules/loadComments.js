import { getComments as fetchFromAPI } from "./api.js";
import { setComments } from "./data.js";
import { renderComments } from "./render.js";

export const fetchAndRender = async () => {
  try {
    const data = await fetchFromAPI();

    const formattedComments = data.comments.map((comment) => ({
      id: comment.id,
      name: comment.author.name,
      date: new Date(comment.date).toLocaleString(),
      text: comment.text,
      likes: comment.likes,
      isLiked: false,
    }));

    setComments(formattedComments);
    renderComments();
  } catch (error) {
    console.error(error);
    alert("Не удалось загрузить комментарии");
  }
};

// При первом запуске — сначала показываем заглушки, потом данные из API
export const loadComments = async () => {
  renderComments(); // показываем initialComments сразу
  await fetchAndRender(); // заменяем данными из API
};
