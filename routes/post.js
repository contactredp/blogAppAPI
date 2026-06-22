const express = require("express");
const postController = require("../controllers/post");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

router.post("/", verify, postController.addPost);
router.get("/all", verify, postController.getAllPosts); 
router.get("/specific/:id", verify, postController.getPost);
router.patch("/:postId", verify, postController.updatePost);
router.delete('/:postId', verify, postController.deletePost);

module.exports = router;