import {AdminRegistrationService} from "@root/domain/admin/registration/AdminRegistrationService";
import {AdminRepository} from "@root/domain/admin/AdminRepository";
import {Token} from "@root/domain/shared/Token";

export class AdminRegistrationController {

    private readonly _requestData: AdminRegistrationRequestData;

    constructor(requestData: AdminRegistrationRequestData) {
        this._requestData = requestData;
        AdminRegistrationService.verifyRequestData(requestData);
    }

    async registerController(): Promise<AdminRegistrationControllerResponse> {

        try {

            const adminInstance = await AdminRegistrationService.createAdminInstance(this._requestData);

            const registeredAdmin = await AdminRepository.create(adminInstance)

            const {accessToken, refreshToken} = await Token.generateAccessAndRefreshToken({email: registeredAdmin.email}, process.env.JWT_ACCESS_ADMIN_SECRET, process.env.JWT_REFRESH_ADMIN_SECRET);

            return {
                new_admin_without_password: registeredAdmin,
                access_token: accessToken,
                refresh_token: refreshToken
            };
        }

        catch (error) {
            console.log(error)
            throw error;
        }

    }

}

export type AdminRegistrationRequestData = {
    firstname: string;
    lastname?: string;
    email: string;
    mobileNumber?: number;
    password: string;
};

type AdminRegistrationControllerResponse = {
    new_admin_without_password: {
        firstname: string;
        lastname?: string;
        email: string;
        mobileNumber?: number;
        id?: number;
    };
    access_token: string;
    refresh_token: string;
};
