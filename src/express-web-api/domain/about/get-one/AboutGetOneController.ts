import {ERROR_NOT_FOUND} from "@utils/messages/error_message";
import { AboutGetOneService } from "@root/domain/about/get-one/AboutGetOneService";





export class AboutGetOneController {
    _requestId: string;

    constructor(requestId: string) {
        this._requestId = requestId;
        AboutGetOneService.verifyRequestId(this._requestId);
    }

    public async GetOneController() {

        const about = await AboutGetOneService.getOneAbout(this._requestId);

        if (about === null) {
            throw new Error('About ' + ERROR_NOT_FOUND.message );
        }
        return about;

    }
}

