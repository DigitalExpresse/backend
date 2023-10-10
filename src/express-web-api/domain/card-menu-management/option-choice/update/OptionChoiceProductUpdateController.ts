import {
    OptionChoiceProductUpdateService
} from "@root/domain/card-menu-management/option-choice/update/OptionChoiceProductUpdateService";
import {verifyIdFormat} from "@utils/service/verifyIdFormat";

export class OptionChoiceProductUpdateController {

    _requestData: OptionChoiceProductUpdateRequest
    _response: OptionChoiceProductUpdateResponseDto

    constructor(requestData: OptionChoiceProductUpdateRequest) {
        verifyIdFormat(requestData.optionId)
        OptionChoiceProductUpdateService.verifyRequestData(requestData)
        this._requestData = requestData

    }

    async execute(): Promise<OptionChoiceProductUpdateService> {
        const updatedOption = await OptionChoiceProductUpdateService.updateOption(this._requestData.optionId, this._requestData.name)

        this._response = {
            optionId: updatedOption.id,
            name: updatedOption.name
        }

        return this._response;
    }
}

export type OptionChoiceProductUpdateRequest = {
    optionId: number;
    name: string;
}

export type OptionChoiceProductUpdateResponseDto = {
    optionId: number;
    name: string;
}