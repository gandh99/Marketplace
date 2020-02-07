const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Routes
app.use("/users", require("./routes/users"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server listening on port ${PORT}...`));