const Exception = require("./exception");

class BadRequestException extends Exception {
    constructor(
        message,
        code,
        error
    ) {
        super(message, code, error);
    }
}

module.exports = BadRequestException;