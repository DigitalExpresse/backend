import {ERROR_INVALID_REQUEST} from "@utils/messages/errorMessage";
import {About} from "@root/domain/about/About";
import {AboutCreateRequestData} from "@root/domain/about/create/AboutCreateController";

    export class AboutCreateService {

static verifyRequestData(requestData: AboutCreateRequestData): void {
    
            const {name, address, postal_code, city, mobileNumber} = requestData;
    
            if (
                name === undefined &&
                postal_code === undefined &&
                address === undefined &&
                city === undefined &&
                mobileNumber === undefined
            ) {
                throw new Error(ERROR_INVALID_REQUEST.message + ": no data to create about");
    
            } else if (typeof name !== "string") {
                throw new Error(ERROR_INVALID_REQUEST.message + ": name must be a non-empty string");
    
            } else if (typeof postal_code !== "string") {
                throw new Error(ERROR_INVALID_REQUEST.message + ": postal_code must be a non-empty string");
    
            } else if (typeof city !== "string") {
                throw new Error(ERROR_INVALID_REQUEST.message + ": city must be a non-empty string");
    
            } else if (typeof mobileNumber !== "string") {
                throw new Error(ERROR_INVALID_REQUEST.message + ": mobileNumber must be a non-empty string");
            }else if (typeof address !== "string") {
                throw new Error(ERROR_INVALID_REQUEST.message + ": address must be a non-empty string");
            }
    

    
    }

    static async createAboutInstance(requestData): Promise<About> {

        const {id,name,address, postal_code, city, mobileNumber} = requestData;

       

        return new About(
            id,
            name,
            address,
            postal_code,
            city,
            mobileNumber
        );
    }

}