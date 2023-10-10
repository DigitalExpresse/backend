import {AboutCreateService} from "@root/domain/about/create/AboutCreateService";
import {AboutRepository} from "@root/domain/about/AboutRepository";

export class AboutCreateController {

    private readonly _requestData: AboutCreateRequestData;

    constructor(requestData: AboutCreateRequestData) {
        this._requestData = requestData;
        AboutCreateService.verifyRequestData(requestData);
    }   

    async createController(): Promise<AboutCreateControllerResponse> {
            
            try {
    
                const aboutInstance = await AboutCreateService.createAboutInstance(this._requestData);
    
                const createdAbout = await AboutRepository.create(aboutInstance)
    
                return {
                    new_about: createdAbout,
                }
            }
    
            catch (error) {
                console.log(error)
                throw error;
            }
    
        }
}

export type AboutCreateRequestData = {
    name: string;
    address: string;
    postal_code: string;
    city: string;
    mobileNumber: string;
};

type AboutCreateControllerResponse = {
    new_about: {
        name: string;
        postal_code: string;
        address: string;
        city: string;
        mobileNumber: string;
        // id: string;
       
    };
};


