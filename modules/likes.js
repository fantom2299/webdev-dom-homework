import { getComments } from "./data.js";

export function updateCommentLike(commentId, data) {
  const comments = getComments();
  const commentIndex = comments.findIndex((c) => c.id === commentId);

  if (commentIndex === -1) return;

  comments[commentIndex].likes = data.likes;
  comments[commentIndex].isLiked = data.isLiked;
}

export const setupLikeHandlers = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const commentElement = button.closest(".comment");
      const commentId = Number(commentElement.dataset.id);

      const isLiked = button.classList.contains("-active-like");

      if (isLiked) {
        button.classList.remove("-active-like");
        button.classList.add("shake");
        button.addEventListener(
          "animationend",
          () => {
            button.classList.remove("shake");
          },
          { once: true }
        );
      } else {
        button.classList.add("-active-like");
      }

      try {
        const response = await import("./api.js");
        const data = await response.toggleLike(commentId);
        updateCommentLike(commentId, data);

        const counter = button.parentElement.querySelector(".likes-counter");
        if (counter) {
          counter.textContent = data.likes;
        }
      } catch (error) {
        console.error(error);
        button.classList.toggle("active-like");
        alert("Не удалось обновить лайк");
      }
    });
  });
};
