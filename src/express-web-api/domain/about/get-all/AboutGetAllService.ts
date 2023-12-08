import { AboutRepository } from "@root/domain/about/AboutRepository";
import { ERROR_NOT_FOUND } from "@utils/messages/errorMessage";

export class AboutGetAllService {

    static async getAllAbout() {

        const allAbout = await AboutRepository.findAll();

        if (allAbout.length === 0) {
            throw new Error("Nobody about : " + ERROR_NOT_FOUND.message);
        }

        return allAbout;
    }
}

