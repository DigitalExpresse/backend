import about from "@prisma/client";
import { AboutGetAllService } from "@root/domain/about/get-all/AboutGetAllService";

export class AboutGetAllController {

    async getAllController(): Promise<AboutGetAllControllerResponse> {

        try {

            const allAbout = await AboutGetAllService.getAllAbout();

            return allAbout;

        }

        catch (error) {
            console.log(error)
            throw error;
        }

    }

}

type AboutGetAllControllerResponse =
    Omit<about.About, "id">[]

    