const Post = require("../models/Post");
const { errorHandler } = require('../auth');

module.exports.addPost = (req, res) => {

    let newPost = new Post({
        userId : req.user.id,
        title : req.body.title,
        content : req.body.content
    });

    return newPost.save()
    .then(result => res.status(201).send({ 
        success: true,
        message: 'Post added successfully', 
        result: result 
    }))
    .catch(error => errorHandler(error, req, res));
}

module.exports.getAllPosts = (req, res) => {

    return Post.find({})
    .then(result => {
        
        if(result.length > 0) {

            return res.status(200).send(result);

        } else {

            return res.status(404).send({ message: 'No posts found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.getPost = (req, res) => {

    Post.findById(req.params.id)
    .then(post => {
        if(post) {

            return res.status(200).send(post);

        } else {

            return res.status(404).send({ message: 'Post not found' });
        }
    })
    .catch(err => err);
};

module.exports.updatePost = (req, res)=>{

    let updatedPost = {
        title: req.body.title,
        content: req.body.content
    }

    return Post.findByIdAndUpdate(req.params.postId, updatedPost)
    .then(post => {
        
        if (post) {

            res.status(200).send({ success: true, message: 'Post updated successfully' });

        } else {

            res.status(404).send({ message: 'Post not found' });
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.deletePost = (req, res) => {

    return Post.findByIdAndDelete(req.params.postId)
    .then(post => {

        if (post) {

            return res.status(200).send({
                success: true,
                message: 'Post deleted successfully'
            });

        } else {

            return res.status(404).send({
                message: 'Post not found'
            });

        }
    })
    .catch(error => errorHandler(error, req, res));
};