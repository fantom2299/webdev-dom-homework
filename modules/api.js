// Mock API implementation using localStorage. This replaces the external wedev-api.

import { formatDate } from "./utils.js";
import { initialComments } from "./data.js";

const STORAGE_KEY = "comments-data";

// Helper to load comments from localStorage
function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Helper to save comments to localStorage
function saveToStorage(comments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

export const getComments = async () => {
  // Simulate async API call, merging stored comments with defaults
  const stored = loadFromStorage();
  const combined = [...stored];
  // Add any initial comments that are missing in storage
  initialComments.forEach((ic) => {
    if (!combined.some((c) => c.id === ic.id)) combined.push(ic);
  });
  return { comments: combined };
};

export const postComment = async (text, parentId = null) => {
  const name = localStorage.getItem("userName") || "Anonymous";
  const newComment = {
    id: Date.now(),
    name,
    date: formatDate(),
    text,
    likes: 0,
    isLiked: false,
    parentId: parentId || null,
  };
  const comments = loadFromStorage();
  comments.unshift(newComment); // add to start
  saveToStorage(comments);
  // Return a shape similar to real API
  return { comment: newComment };
};

export const toggleLike = async (commentId) => {
  // Load stored comments and try to find the target comment.
  let comments = loadFromStorage();
  let comment = comments.find((c) => c.id === commentId);

  // If it is not in storage, it might be one of the predefined initialComments.
  if (!comment) {
    const ic = initialComments.find((c) => c.id === commentId);
    if (!ic) throw new Error("Comment not found");
    // Clone the initial comment and add it to storage so future updates persist.
    comment = { ...ic };
    comments.push(comment);
  }

  // Toggle like state.
  if (comment.isLiked) {
    comment.isLiked = false;
    comment.likes = Math.max(0, comment.likes - 1);
  } else {
    comment.isLiked = true;
    comment.likes += 1;
  }

  saveToStorage(comments);
  return { likes: comment.likes, isLiked: comment.isLiked };
};

export const login = async (loginValue, password) => {
  // Mock login: store token and user name in localStorage
  const token = btoa(`${loginValue}:${password}`);
  // Persist for auth module
  localStorage.setItem("token", token);
  localStorage.setItem("userName", loginValue);
  return { token, name: loginValue };
};
