export const initialComments = [
  {
    id: -1,
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
    isLiked: false,
  },
  {
    id: -2,
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
    isLiked: true,
  },
];

let comments = [...initialComments];
let replyingTo = null;
let initialLoaded = false;

export function getComments() {
  return comments;
}

export function setComments(newComments) {
  comments = newComments;
}

export function isInitialLoaded() {
  return initialLoaded;
}

export function setInitialLoaded(value) {
  initialLoaded = value;
}

export function getReplyingTo() {
  return replyingTo;
}

export function setReplyingTo(value) {
  replyingTo = value;
}

export function clearComments() {
  comments = [];
  initialLoaded = false;
}
