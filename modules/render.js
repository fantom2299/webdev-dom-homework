import { comments } from "./data.js";
import { setupLikeHandlers } from "./likes.js";
import { setupReplyHandlers } from "./reply.js";

export const createCommentHTML = (comment) => {
  const likeClass = comment.isLiked ? "-active-like" : "";

  return `
<li class="comment" data-id="${comment.id}">
  <div class="comment-header">
    <div>${comment.name}</div>
    <div>${comment.date}</div>
  </div>
  <div class="comment-body">
    <div class="comment-text">
      ${comment.text}
    </div>
  </div>
  <div class="comment-footer">
    <div class="likes">
      <span class="likes-counter">${comment.likes}</span>
      <button class="like-button ${likeClass}"></button>
    </div>
    
  </div>
</li>
`;
};

export const renderComments = () => {
  const container = document.querySelector(".comments");

  container.innerHTML = "";

  comments.forEach((comment) => {
    container.insertAdjacentHTML("beforeend", createCommentHTML(comment));
  });

  setupLikeHandlers();
  setupReplyHandlers();
};