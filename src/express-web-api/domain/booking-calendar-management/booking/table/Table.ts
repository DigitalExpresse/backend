export class Table {

    id?: number;
    name: string;
    capacity: number;

    constructor(name: string, capacity: number, id?: number,) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
    }

    static bindTables(freeTables: {
        id: number,
        capacity: number,
        name: string
    }[], numberOfPersons: number) {
        let availableTable = freeTables;
        let remainingPersons: number = numberOfPersons;
        const bookedTables: number[] = [];

        while (remainingPersons > 0) {
            const suitableCapacities = [remainingPersons, remainingPersons + 1, remainingPersons + 2]
            const perfectTable = availableTable.find(t => suitableCapacities.includes(t.capacity));
            if (perfectTable) {
                bookedTables.push(perfectTable.id);
                remainingPersons -= perfectTable.capacity;
                availableTable.splice(availableTable.indexOf(perfectTable), 1);
                break
            }
            let tableLessThanRemainingPersons = availableTable.filter(t => t.capacity < remainingPersons);
            let tableMoreThanRemainingPersons = availableTable.filter(t => t.capacity > remainingPersons);
            const sumOfCapacities = tableLessThanRemainingPersons.reduce((acc, t) => acc + t.capacity, 0);

            if (sumOfCapacities < remainingPersons) {
                // if sum of capacities is not enough, we pick the smallest with capacity > remainingPersons, and we add it to the bookedTables, then break
                const smallestTable = this.findSmallestTable(tableMoreThanRemainingPersons);
                bookedTables.push(smallestTable.id);
                remainingPersons -= smallestTable.capacity;
                availableTable.splice(availableTable.indexOf(smallestTable), 1);
                break

            } else {
                // if sum of capacities is enough, we pick the highest with capacity < remainingPersons, and we add it to the bookedTables, then continue
                const highestTable = this.findBiggestTable(tableLessThanRemainingPersons);
                bookedTables.push(highestTable.id);
                remainingPersons -= highestTable.capacity;
                availableTable.splice(availableTable.indexOf(highestTable), 1);
            }
        }
        return bookedTables;
    }

    static findSmallestTable(tables: {
        id: number,
        capacity: number,
        name: string
    }[]) {
        return tables.reduce((acc, t) => {
            if (t.capacity < acc.capacity) {
                return t
            }
            return acc
        })
    }

    static findBiggestTable(tables: {
        id: number,
        capacity: number,
        name: string
    }[]) {
        return tables.reduce((acc, t) => {
            if (t.capacity > acc.capacity) {
                return t
            }
            return acc
        })
    }


}