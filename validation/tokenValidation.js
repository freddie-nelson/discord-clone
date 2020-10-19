const jwt = require("jsonwebtoken");

function validate(token) {
    try {
        const result = jwt.verify(token, process.env.TOKEN_SECRET);
        return result;
    } catch {
        return false
    }
}

module.exports = validate;