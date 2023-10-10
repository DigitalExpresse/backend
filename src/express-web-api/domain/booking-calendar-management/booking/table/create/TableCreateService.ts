import {ERROR_INVALID_REQUEST} from "@utils/messages/error_message";

export class TableCreateService {

    static verifyRequestData(requestData) {

        if (requestData === undefined) {
            throw new Error(ERROR_INVALID_REQUEST.message + '  is undefined');
        }

        else if (requestData === null) {
            throw new Error(ERROR_INVALID_REQUEST.message + ' request data is null');
        }

        else if (requestData.name === undefined) {
            throw new Error(ERROR_INVALID_REQUEST.message + ' name is undefined');
        }

        else if (requestData.capacity === undefined) {
            throw new Error(ERROR_INVALID_REQUEST.message + ' capacity is undefined');
        }

        else if (typeof requestData.name !== 'string') {
            throw new Error(ERROR_INVALID_REQUEST.message + ' name is not a string');
        }

        else if (typeof requestData.capacity !== 'number') {
            throw new Error(ERROR_INVALID_REQUEST.message + ' capacity is not a number');
        }
    }
}