export class CustomError extends Error {
    name = 'RequestError';
    constructor(public error, message) {
        super(message);
    }
}
