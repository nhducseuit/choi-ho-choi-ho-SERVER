const Exception = require('./exception');

class ServerException extends Exception {
    constructor(
        message,
        code,
        error
    ) {
        super(message, code, error);
    }
}

module.exports = ServerException;