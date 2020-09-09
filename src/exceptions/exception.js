class Exception extends Error {
    constructor(
        message,
        code,
        error
    ) {
        super(message);
        this.code = code;
        this.error = error;
    }
}

module.exports = Exception;