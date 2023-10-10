import {AdminConnectionService} from "@root/domain/admin/connection/AdminConnectionService";
import {Token} from "@root/domain/shared";

export class AdminConnectionController {

    private readonly _requestData: AdminConnectionRequestData;

    constructor(requestData: AdminConnectionRequestData) {
        this._requestData = requestData;
        AdminConnectionService.verifyRequestData(this._requestData);
    }

    async connectionController(): Promise<AdminConnectionControllerResponse> {

        try {

            const foundAdmin = await AdminConnectionService.verifyIfAdminExist(this._requestData.email);

            const hashedPassword = foundAdmin.password;
            await AdminConnectionService.verifyIsCorrectPassword(this._requestData.password, hashedPassword);

            delete foundAdmin.password;

            const {accessToken, refreshToken} = await Token.generateAccessAndRefreshToken({email: foundAdmin.email, id: foundAdmin.id}, process.env.JWT_ACCESS_ADMIN_SECRET, process.env.JWT_REFRESH_ADMIN_SECRET);

            return {admin: foundAdmin, access_token: accessToken, refresh_token: refreshToken};

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}

type AdminConnectionRequestData = {
  notifiable_token: string | any;
  email: string;
  password: string;
};

type AdminConnectionControllerResponse = {
    admin: {
        firstname: string;
        lastname?: string;
        email: string;
        mobileNumber?: number;
        role?: string;
        id?: number;
    };
    access_token: string;
    refresh_token: string;
};
