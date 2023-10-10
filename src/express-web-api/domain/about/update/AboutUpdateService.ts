import {AboutRepository} from "@root/domain/about/AboutRepository";
import {ERROR_INVALID_REQUEST} from "@utils/messages/error_message";


export class AboutUpdateService {

    static async updateAbout(requestData: any) {
        const allowedFields = ['name', 'address', 'postal_code', 'city', 'mobileNumber'];
        const dataToUpdate = AboutUpdateService.returnFieldsNotNull(requestData, allowedFields);
        const updatedAbout = await AboutUpdateService.updateFieldsNotNull(dataToUpdate, requestData.id);

        return updatedAbout;

    }


    static returnFieldsNotNull(requestData: any, allowedFields: string[]): any {

        const fieldsNotNull: any = {};

        for (const field of allowedFields) {
            if (requestData[field] !== undefined) {
                fieldsNotNull[field] = requestData[field];

            }
        }

        return fieldsNotNull;

    }

    static async  updateFieldsNotNull(dataToUpdate: any, id: number) {

        try {

            const updatedAbout = await AboutRepository.update({dataToUpdate, id});

            return updatedAbout;

        } catch (error) {
            throw new Error(error);

        }

    }

    static verifyRequestData(requestData) {
        const {id, name, address, postal_code, city, mobileNumber} = requestData;

        if (id === undefined) {

            throw new Error(ERROR_INVALID_REQUEST.message + ' AboutUpdateService: id is undefined');

        }

        else if (name === undefined && address === undefined && postal_code === undefined && city === undefined && mobileNumber === undefined) {

            throw new Error(ERROR_INVALID_REQUEST.message + ' AboutUpdateService: no data to update');

        }

        else if (name !== undefined && typeof name !== 'string') {

            throw new Error(ERROR_INVALID_REQUEST.message + ' AboutUpdateService: name is not a string');

        }

        else if (address !== undefined && typeof address !== 'string') {

            throw new Error(ERROR_INVALID_REQUEST.message + ' AboutUpdateService: address is not a string');

        }

        else if (postal_code !== undefined && typeof postal_code !== 'string') {

            throw new Error(ERROR_INVALID_REQUEST.message + ' AboutUpdateService: postal_code is not a string');

        }

        else if (city !== undefined && typeof city !== 'string') {

            throw new Error(ERROR_INVALID_REQUEST.message + ' AboutUpdateService: city is not a string');

        }

        else if (mobileNumber !== undefined && typeof mobileNumber !== 'string') {

            throw new Error(ERROR_INVALID_REQUEST.message + ' AboutUpdateService: mobileNumber is not a string');

        }

    }

}
