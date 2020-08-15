import Exception from "./exception";

export class ServerException extends Exception {
    constructor(
        message,
        code,
        error
    ) {
        super(message, code, error);
    }
}