
require('dotenv').config();
const webpush = require('web-push');
const { Op } = require('sequelize');
const User = require('../models/user');

const vapidKeys = {
    "publicKey":process.env.VAPID_PUBLIC_KEY,
    "privateKey":process.env.VAPID_PRIVATE_KEY
};

webpush.setVapidDetails(
    'mailto:kplageman@prokarma.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

exports.sendRankNotif = (req, res) => {
    // notification payload
    const notificationPayload = {
        "notification": {
            "title": "Ranks Updated",
            "body": "Check where you rank!",
            "icon": "assets/icon/stadium-48.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    User.findAll({
        attributes: { exclude: ['password'] },
        where: {
            sub: {
                [Op.ne]: null
            }
        }
      }).then(users => {
        Promise.all(users.map(user => webpush.sendNotification(
            user.sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Rank update sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
    }).catch(err => console.log(err));
};
