const dbModel = require("../models/Blog");
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.getById = (req, res, next) => {
  const id = req.params.id;
  const details = {
    '_id': new ObjectID(id)
  };
  dbModel.findById(details)
    .then(blog => {
      if(!blog) {
        next({message: "No blog found with that ID"});
      }
      res.status(200).send(blog);
    })
    .catch(next);
}
exports.getAll = (req, res, next) => {
  dbModel.find()
  .then(blogs => {
    res.send(blogs);
  })
  .catch(next);
}
exports.postBlog = (req, res) => {
  const postObj = {
    text: req.body.body,
    title: req.body.title
  };

  let post = new dbModel(postObj);
  post.save((err, createdTodoObject) => {
  res.status(200).send(createdTodoObject);
  });
}
exports.deleteBlog = (req, res, next) => {
  const id = req.params.id;
  const objId = {
    '_id': new ObjectID(id)
  };
  dbModel.findByIdAndRemove(objId)
    .then(blog => {
      if(!blog) {
        next({message: "No blog found with that ID"});
      }
      res.status(200).send('Blog ' + id + ' deleted!')
    })
    .catch(next);
}
exports.updateBlog = (req, res, next) => {
  const id = req.params.id;
  const objId = {
    '_id': new ObjectID(id)
  };
  const blog = {
    text: req.body.body,
    title: req.body.title
  };
  dbModel.findById(objId)
  .then(blog => {

    if(!blog) {
      next({message: "No blog found with that ID"});
    }
    else {
      blog.text = req.body.body || blog.text;
      blog.title = req.body.title || blog.title;
      blog.save()
          .then(todo => {
            res.status(200).send(todo);
          })
          .catch(next);
      }
    })
  .catch(next);
}
