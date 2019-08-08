const Bowl = require('../models/bowl');

/**************
 * Get All Bowls
 */
exports.getBowls = (req, res, next) => {
    Bowl.findAll().then(bowls => {
        res.send(bowls);
    }).catch(err => console.log(err));
};

/**************
 * Get Bowl by ID
 */
exports.getBowl = (req, res, next) => {
    Bowl.findByPk(req.url.slice(1)).then(bowl => {
        res.send(bowl.dataValues);
    }).catch(err => console.log(err));
};

/**************
 * Create New Bowl
 */
exports.createBowl = (req, res, next) => {
    const params = req.body;
    
    Bowl.create({
        name: params.name,
        image: params.image,
    })
    .then(result => {
        res.send(result);
    })
    .catch(err => console.log('Bowl CreateBowl: ', err));
};

/**************
 * Update Bowl by ID
 */
exports.updateBowl = (req, res, next) => {
    Bowl.findByPk(req.url.slice(1)).then(bowl => {
        bowl.name = req.body.name || bowl.name;
        bowl.image = req.body.image || bowl.image;
        return bowl.save();
    }).then(result => res.send(result))
    .catch(err => console.log(err));
};

/**************
 * Delete Bowl by ID
 */
exports.deleteBowl = (req, res, next) => {
    Bowl.findByPk(req.url.slice(1))
    .then(bowl => {
        return bowl.destroy();
    })
    .then(result => {
        console.log('Bowl Deleted');
    })
    .catch(err => console.log(err));
};