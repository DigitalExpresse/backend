export class Product {

     id?: number;
     name: string
     description?: string;
     price: number;
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }
}