import jwt from "jsonwebtoken";

export class Token {

    static async generateToken(payload: any, secret: string, options: jwt.SignOptions): Promise<string> {
        try {
            return await jwt.sign(payload, secret, options);
        } catch (e) {
            console.log(e);
            throw new Error(`Failed to generate token: ${e}`);
        }
    }

    static async generateAccessAndRefreshToken(payload: any, accessSecret: string, refreshSecret: string): Promise<{ accessToken: string, refreshToken: string }> {

        const accessTokenOptions = { expiresIn: '1400m' };
        const refreshTokenOptions = { expiresIn: '600m' };

        const accessToken = await this.generateToken(payload, accessSecret, accessTokenOptions);
        const refreshToken = await this.generateToken(payload, refreshSecret, refreshTokenOptions);

        return { accessToken, refreshToken };
    }

    static async verifyToken(token: string, secret: string): Promise<jwt> {
        try {
            return await jwt.verify(token, secret);
        } catch (e) {
            console.log(e);
            throw new Error(`Failed to verify token: ${e}`);
        }
    }

    static async generateAccessRefreshTokenFromRefreshToken(refreshToken: string, accessSecret: string, refreshSecret: string): Promise<{ newAccessToken: string, newRefreshToken: string }> {

            const decodedRefreshToken = await this.verifyToken(refreshToken, refreshSecret);
            const { id, email } = decodedRefreshToken;
            const payload = { id, email };
            const accessTokenOptions = { expiresIn: '60m' };
            const refreshTokenOptions = { expiresIn: '600m' };

            const newAccessToken = await this.generateToken(payload, accessSecret, accessTokenOptions);
            const newRefreshToken = await this.generateToken(payload, refreshSecret, refreshTokenOptions);

            return { newAccessToken, newRefreshToken };

    }

}


