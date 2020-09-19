const Exception = require("./exception");

class BadRequestException extends Exception {
    constructor(
        message,
        code,
        error
    ) {
        super(message, code, 400, error);
    }
}

module.exports = BadRequestException;