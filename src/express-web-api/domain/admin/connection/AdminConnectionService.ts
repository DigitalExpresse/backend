import {
  ERROR_INVALID_CREDENTIALS,
  ERROR_INVALID_REQUEST,
  ERROR_NOT_FOUND,
} from "@utils/messages/errorMessage";
import { Password } from "@root/domain/shared";
import { AdminRepository } from "@root/domain/admin/AdminRepository";

export class AdminConnectionService {
  static async verifyIsCorrectPassword(
    password: string,
    hashedPassword: string
  ) {
    const passwordIsValid = await Password.compare(password, hashedPassword);

    if (!passwordIsValid) {
      throw new Error(ERROR_INVALID_CREDENTIALS.message);
    }
  }

  static async verifyIfAdminExist(email: string) {
    const admin = await AdminRepository.findByEmail(email);

    if (!admin) {
      throw new Error("Admin " + ERROR_NOT_FOUND.message);
    }

    return admin;
  }

  static verifyRequestData(requestData): void {
    const { email, password } = requestData;

    if (email === undefined && password === undefined) {
      throw new Error(
        ERROR_INVALID_REQUEST.message + ": email and password are undefined"
      );
    } else if (typeof email !== "string") {
      throw new Error(
        ERROR_INVALID_REQUEST.message + ": email must be a non-empty string"
      );
    } else if (typeof password !== "string") {
      throw new Error(
        ERROR_INVALID_REQUEST.message + ": password must be a non-empty string"
      );
    }
  }

  static async saveNotifiableToken(notifiableToken: string, adminId: number) {
    try {
      await AdminRepository.update({
        dataToUpdate: {
          notifiable_token: notifiableToken,
        },
        id: adminId,
      });
    } catch (error) {
      throw new Error("Failed to save notifiable token: " + error);
    }
  }
}
