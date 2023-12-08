import {ERROR_INVALID_REQUEST} from "@utils/messages/errorMessage";

export const verifyIdFormat = (id) => {
    if (isNaN(Number(id))) {
        throw new Error(ERROR_INVALID_REQUEST.message + " Id must be a number");
    }
}