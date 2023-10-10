import { AboutUpdateService } from "@root/domain/about/update/AboutUpdateService";

export class AboutUpdateController {
  private readonly _requestData: AboutUpdateControllerRequestBody;

      constructor(requestData: AboutUpdateControllerRequestBody) {
        AboutUpdateService.verifyRequestData(requestData);
        this._requestData = requestData;
      }

      async updateController() {

          const updatedAbout = await AboutUpdateService.updateAbout(this._requestData);

          return { updatedAbout };
      }
}

type AboutUpdateControllerRequestBody = {
    id: number;
    name?: string;
    address?: string;
    postal_code?: string;
    city?: string;
    mobileNumber?: string;
};
