

interface IDateProvider {
    compare(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date,
    comparteInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider }