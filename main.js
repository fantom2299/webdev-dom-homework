// Главный файл приложения — точка входа

import { loadComments } from "./modules/loadComments.js";
import { initAddCommentHandlers } from "./modules/addComment.js";
import { initCancelReplyButton } from "./modules/reply.js";

loadComments();
initAddCommentHandlers();
initCancelReplyButton();