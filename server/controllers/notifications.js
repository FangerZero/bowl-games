exports.getNotifications = (req, res, next) => {
    res.send();
};

exports.postNotifications = (req, res, next) => {
    console.log('Meow');
    res.send({"notification":{"title":"Notifications are cool","body":"Know how to send notifications through Angular with this article!","icon":"https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png","vibrate":[100,50,100],"data":{"url":"https://medium.com/@arjenbrandenburgh/angulars-pwa-swpush-and-swupdate-15a7e5c154ac"}}});
};