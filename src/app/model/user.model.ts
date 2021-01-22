export class User {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: string;
    loggedInDate?: number;
    // isSessionExpired?: true;

    constructor() {}

    // get getIsSessionExpired() {
    //     if(this.loggedInDate < new Date().getTime()) {
    //         return true;
    //     }
    //     return null;
    // }

    // set setLoggedinDate(newDate: number) {
    //     this.loggedInDate = newDate;
    // }
}

