import {
    ERROR_ALREADY_EXIST, ERROR_EMAIL_NOT_SENT,
    ERROR_INVALID_CREDENTIALS,
    ERROR_INVALID_EMAIL,
    ERROR_INVALID_PASSWORD,
    ERROR_INVALID_REQUEST, ERROR_NOT_FOUND
} from "@utils/messages/errorMessage";

const errorMappings: Record<number, string[]> = {
    400: [
        ERROR_INVALID_REQUEST.message,
        ERROR_INVALID_EMAIL.message,
        ERROR_INVALID_PASSWORD.message,
    ],
    401: [ERROR_INVALID_CREDENTIALS.message],
    404: [ERROR_NOT_FOUND.message, ],
    409: [ERROR_ALREADY_EXIST.message],
    500: [ERROR_EMAIL_NOT_SENT.message],
};

const defaultStatusCode = 500;

export function handleErrors(error: Error): { status: number; error: string } {
    for (const [statusCode, errorMessages] of Object.entries(errorMappings)) {
        const code = Number(statusCode);
        for (const errorMessage of errorMessages) {
            if (error.message.includes(errorMessage)) {
                return { status: code, error: error.message };
            }
        }
    }

    return {status: defaultStatusCode, error: error.message};
}