export class About {
    public id: string;
    public name: string;
    public postal_code: string;
    public address: string;
    public city: string;
    public mobileNumber: string;

    constructor(id: string, name: string, postal_code: string, city: string, mobileNumber: string, address: string) {
        this.id = id;
        this.postal_code = postal_code;
        this.city = city;
        this.address = address;
        this.mobileNumber = mobileNumber;
        this.name = name;
    }
}
