const Exception = require('./exception');

class ServerException extends Exception {
    constructor(
        message,
        code,
        error
    ) {
        super(message, code, 500, error);
    }
}

module.exports = ServerException;