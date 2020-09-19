const Exception = require("./exception");

class NotFoundException extends Exception {
    constructor(
        message,
        code,
        error
    ) {
        super(message, code, 404, error);
    }
}

module.exports = NotFoundException;