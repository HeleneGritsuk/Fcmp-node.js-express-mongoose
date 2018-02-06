const dbModel = require("../models/Blog");
var ObjectID = require('mongodb').ObjectID;

exports.getById = (req, res) => {
  const id = req.params.id;
  const details = {
    '_id': new ObjectID(id)
  };
  dbModel.findById(details, (err, item) => {
    if (err) {
      res.send({
        'error': 'An error has occurred'
      });
    }
    if (item) {
      res.status(200).send(item);
    }
    else {
      res.status(404).send("No blog found with that ID")
    }
  });
}
exports.getAll = (req, res) => {
  dbModel.find((err, item) => {
    if (err) {
      res.send({
        'error': 'An error has occurred'
      });
    } else {
      res.send(item);
    }
  });
}
exports.postBlog =(req, res) => {
  const postObj = {
    text: req.body.body,
    title: req.body.title
  };

  let post = new dbModel(postObj);
  post.save((err, createdTodoObject) => {
  if (err) {
      res.status(500).send(err);
  }

  res.status(200).send(createdTodoObject);
  });
}
exports.deleteBlog = (req, res) => {
  const id = req.params.id;
  const objId = {
    '_id': new ObjectID(id)
  };
  dbModel.findByIdAndRemove(objId, (err, item) => {
    if (err) {
      res.send({
        'error': 'An error has occurred'
      });
    }
    if(item) {
      res.status(200).send('Blog ' + id + ' deleted!');
    }
    else {
      res.status(404).send('Blog ' + id + ' not found!');
    }
  });
}
exports.updateBlog = (req, res) => {
  const id = req.params.id;
  const objId = {
    '_id': new ObjectID(id)
  };
  const blog = {
    text: req.body.body,
    title: req.body.title
  };
  dbModel.findById(objId, (err, blog) => {
    if (err) {
      res.send({
        'error': 'An error has occurred'
      });
    }
    else {

      blog.text = req.body.body || blog.text;
      blog.title = req.body.title || blog.title;
      blog.save((err, todo) => {
          if (err) {
              res.status(500).send(err)
          }
          res.status(200).send(todo);
      });
    }
  });
}
