const express = require("express");

const router = express.Router();

const commentController = require("../controllers/commentController");

router.get(
    "/comments/:bookId",
    commentController.getComments
);

router.post(
    "/comments",
    commentController.addComment
);

router.delete(
    "/comments/:id",
    commentController.deleteComment
);

module.exports = router;