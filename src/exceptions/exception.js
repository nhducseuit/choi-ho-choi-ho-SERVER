class Exception extends Error {
    constructor(
        message,
        code,
        status,
        error
    ) {
        super(message);
        this.code = code;
        this.error = error;
        this.status = status;
    }
}

module.exports = Exception;