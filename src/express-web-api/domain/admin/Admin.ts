import { Email } from "@root/domain/shared/Email";
import { Password } from "@root/domain/shared/Password";

export class Admin {

    firstname: string;
    lastname?: string;
    email: Email;
    mobileNumber?: number;
    password: Password;
    id?: number;

    constructor(
        firstname: string,
        lastname: string,
        email: Email,
        mobileNumber: number,
        password: Password,
        id?: number
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.mobileNumber = Number(mobileNumber);
        this.password = password;
        this.id = id;
    }

}
