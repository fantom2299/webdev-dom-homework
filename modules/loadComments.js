// modules/loadComments.js
import { getComments as fetchFromAPI } from "./api.js";
import { setComments } from "./data.js";
import { renderComments } from "./render.js";

export const fetchAndRender = async () => {
  try {
    const data = await fetchFromAPI();
    console.log("Ответ API:", data);
    // Раскомментируй и исправь — было закомментировано!
    const formattedComments = data.comments.map((comment) => ({
      id: comment.id,
      name: comment.author.name,
      date: new Date(comment.date).toLocaleString(),
      text: comment.text,
      likes: comment.likes,
      isLiked: false,
    }));

    const { comments } = await import("./data.js");
    setComments([...comments, ...formattedComments]);
    renderComments();
  } catch (error) {
    console.error(error);
    alert("Не удалось загрузить комментарии");
  }
};

export const loadComments = async () => {
  renderComments(); // показываем initialComments сразу
  await fetchAndRender(); // заменяем данными из API
};
