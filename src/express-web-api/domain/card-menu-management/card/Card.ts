export class Card {
    private readonly id?: number;
    private readonly name: string;
    private readonly description?: string;

    constructor(id: number, name: string, description?: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    getId(): number {
        return this.id;
    }

    // all getter
    getName(): string {
        return this.name;
    }

    getDescription(): string | undefined {
        return this.description;
    }
}