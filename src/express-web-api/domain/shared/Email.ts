import {ERROR_ALREADY_EXIST, ERROR_INVALID_EMAIL} from "@utils/messages/errorMessage";
import {AdminRepository} from "@root/domain/admin/AdminRepository";

export class Email {

     readonly _value: string;

    constructor(email: string) {
        if (!Email.isValid(email)) {
            throw new Error(ERROR_INVALID_EMAIL.message);
        }

        else this._value = email;
    }

    static isValid(email: string): boolean {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    public async verifyIfEmailAlreadyExist() {
        if(await AdminRepository.findByEmail(this._value)) {
            throw new Error('Email ' + ERROR_ALREADY_EXIST.message);
        }
    }

    getValue(): string {
        return this._value;
    }
}
