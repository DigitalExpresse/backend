import { AboutRepository } from "@root/domain/about/AboutRepository";


export class AboutGetOneService {

    static async getOneAbout(id) {

        const about = await AboutRepository.findById(Number(id));
        return about;

    }

    static verifyRequestId(requestId) {

        const id = Number(requestId);

        if (requestId === undefined) {
            throw new Error('Request ID is undefined');
        }

        else if (typeof id !== 'number' || isNaN(id)) {
            throw new Error('Request ID is not a string');
        }
    }
}
