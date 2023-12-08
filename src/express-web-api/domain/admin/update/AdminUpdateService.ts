import {AdminRepository} from "@root/domain/admin/AdminRepository";
import {ERROR_INVALID_EMAIL, ERROR_INVALID_REQUEST} from "@utils/messages/errorMessage";
import {Email} from "@root/domain/shared";

export class AdminUpdateService {

    static async updateAdmin(requestData: any) {

        const allowedFields = ['firstname', 'lastname', 'email', 'mobileNumber', 'password'];
        const dataToUpdate = AdminUpdateService.returnFieldsNotNull(requestData, allowedFields);
        const updatedAdmin = await AdminUpdateService.updateFieldsNotNull(dataToUpdate, requestData.id);

        return updatedAdmin;
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

            const updatedAdmin = await AdminRepository.update({dataToUpdate, id});

            return updatedAdmin;

        } catch (error) {
            throw new Error(error);
        }
    }




static verifyRequestData(requestData) {

            const {id, firstname, lastname, email, role, mobileNumber} = requestData;

            if (id === undefined) {
                throw new Error(ERROR_INVALID_REQUEST.message + ' AdminUpdateService: id is undefined');
            }

            else if (firstname === undefined && lastname === undefined && email === undefined && role === undefined && mobileNumber === undefined) {
                throw new Error(ERROR_INVALID_REQUEST.message + ' AdminUpdateService: no data to update');
            }

            else if (firstname !== undefined && typeof firstname !== 'string') {
                throw new Error(ERROR_INVALID_REQUEST.message + ' AdminUpdateService: firstname is not a string');
            }

            else if (lastname !== undefined && typeof lastname !== 'string') {
                throw new Error(ERROR_INVALID_REQUEST.message + ' AdminUpdateService: lastname is not a string');
            }

            else if (email !== undefined && !Email.isValid(email)) {
                throw new Error(ERROR_INVALID_EMAIL.message);
            }


            else if (role !== undefined && typeof role !== 'string') {
                throw new Error(ERROR_INVALID_REQUEST.message + ' AdminUpdateService: role is not a string');
            }

            else if (mobileNumber !== undefined && typeof mobileNumber !== 'number') {
                throw new Error(ERROR_INVALID_REQUEST.message + ' AdminUpdateService: mobileNumber is not a string');
            }

    }
}