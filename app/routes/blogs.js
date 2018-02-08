const express = require('express');
const router = express.Router();
const blogContoller = require("../controllers/blogController.js")



router.get('/:id',  blogContoller.getById);

router.get('/', blogContoller.getAll);

router.post('/', blogContoller.postBlog);

router.delete('/:id', blogContoller.deleteBlog);

router.put('/:id', blogContoller.updateBlog);

module.exports = router;
