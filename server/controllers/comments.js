const Comments = require('../models/comment');

/**************
 * Get All Commentss
 */
exports.getCommentss = (req, res, next) => {
    Comments.findAll().then(comments => {
        res.send(comments);
    }).catch(err => console.log(err));
};

/**************
 * Get Comments by ID
 */
exports.getComments = (req, res, next) => {
    Comments.findByPk(req.url.slice(1)).then(comment => {
        res.send(comment.dataValues);
    }).catch(err => console.log(err));
};

/**************
 * Create New Comments
 */
exports.createComments = (req, res, next) => {
    const params = req.body;
    
    Comments.create({
        name: params.name,
        image: params.image,
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => console.log('Comments CreateComments: ', err));
};

/**************
 * Delete Comments by ID
 */
exports.deleteComments = (req, res, next) => {
    Comments.findByPk(req.url.slice(1))
    .then(comment => {
        return comment.destroy();
    })
    .then(result => {
        console.log('Comments Deleted');
    })
    .catch(err => console.log(err));
};
