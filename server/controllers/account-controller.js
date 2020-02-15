const fs = require('fs');

module.exports.addItem = (req, res, next) => {
    let base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
    fs.writeFile("out.jpg", base64Data, 'base64', function (err) {
        console.log(err);
    });
    res.status(200).send('Successfully added item!');
};