const mv = require('mv');
const path = require('path');
const formidable = require('formidable');

module.exports.addItem = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) throw err; // process error

        // Get root directory of project
        let appDir = path.dirname(require.main.filename);

        // Move file from /tmp/ to another location
        let oldPath = files.imageFile.path;
        let newPath = appDir + '/itemImages/' + files.imageFile.name;
        mv(oldPath, newPath, function (err) {
            if (err) throw err;
            res.status(200).send('Successfully added item.');
        });
    });

}