export class Client {

    private id: string;
    private firstname: string;
    private lastname: string;
    private email: string;
    private mobileNumber?: string;
    private countNoShow?: number;
    private countReservation?: number;

    constructor(id: string, firstname: string, lastname: string, email: string, mobileNumber?: string, countNoShow?: number, countReservation?: number) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.countNoShow = countNoShow;
        this.countReservation = countReservation;
    }

}
