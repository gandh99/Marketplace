const mv = require('mv');
const path = require('path');
const formidable = require('formidable');

module.exports.addItem = (req, res, next) => {
    var form = new formidable.IncomingForm();

    form.parse(req)
        .on('field', (name, field) => {
            console.log(field);
        })
        .on('file', (name, file) => {
            // Get root directory of project
            let appDir = path.dirname(require.main.filename);

            // Move file from /tmp/ to new path
            let oldPath = file.path;
            let newPath = appDir + '/itemImages/' + file.name;
            mv(oldPath, newPath, function (err) {
                if (err) throw err;
                res.status(200).send('Successfully added item.');
            });
        })
}