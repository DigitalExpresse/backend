export class AdminDisconnectService {
    static async disconnectAdmin(res) {

        res.cookie('accessToken', '', {  maxAge: 0 });
        res.cookie('refreshToken', '', {  maxAge: 0 });

    }

}