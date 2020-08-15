class Exception {
    constructor(
        message,
        code,
        error
    ) {
        this.message = message;
        this.code = code;
        this.error = error;
    }
}

module.exports = Exception;