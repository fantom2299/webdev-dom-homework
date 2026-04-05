import { getComments as fetchFromAPI } from "./api.js";
import {
  setComments,
  initialComments,
  isInitialLoaded,
  setInitialLoaded,
} from "./data.js";
import { renderComments } from "./render.js";
import { showLoading } from "./loading.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAndRender = async () => {
  try {
    const data = await fetchFromAPI();

    const formattedComments = data.comments.map((comment) => ({
      id: comment.id,
      name: comment.name,
      date: comment.date,
      text: comment.text,
      likes: comment.likes,
      isLiked: !!comment.isLiked,
    }));

    if (!isInitialLoaded()) {
      setComments([...initialComments, ...formattedComments]);
      setInitialLoaded(true);
    } else {
      setComments(formattedComments);
    }
    renderComments();
  } catch (error) {
    console.error(error);
    alert("Не удалось загрузить комментарии");
  }
};

export const loadComments = async () => {
  showLoading();
  await sleep(2000);
  await fetchAndRender();
};
