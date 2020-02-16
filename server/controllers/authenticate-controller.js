const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, done) => {
    res.status(200).send(req.user.username);
};

module.exports.authenticateToken = (req, res, done) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user.tokenData;   // user.tokenData because we sign jwt with {user} instead of JSON.stringify(user)
        done(null, user);
    });
};