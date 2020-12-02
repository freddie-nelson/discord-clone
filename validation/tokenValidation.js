const jwt = require("jsonwebtoken");
const cookie = require("cookie");

function validate(req) {
    try {
        const cookies = cookie.parse(req.headers.cookie || "");

        if (cookies.token && jwt.verify(cookies.token, process.env.TOKEN_SECRET)) {
            return jwt.decode(cookies.token);
        } else {
            return false
        }
    } catch (e) {
        console.log(e);
        return false
    }
}

module.exports = validate;