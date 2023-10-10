export class Holiday {

    static isPayloadValid(payload: any) {
        // to be valid, the payload must be an array
        // each element of the array must be an object with the right properties :
        // - name: string
        // - startDate: Date
        // - endDate: Date

        if (Array.isArray(payload)
            && payload.every(holiday => typeof holiday === 'object'
                && holiday.hasOwnProperty('name')
                && holiday.hasOwnProperty('startDate')
                && holiday.hasOwnProperty('endDate'))) {
            return true;
        }
    }
}