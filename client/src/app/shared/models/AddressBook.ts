export interface AddressBook{
    id: string,
    fullName: string,
    jobId: number,
    departmentId: number,
    mobileNumber: string,
    dateOfBirth: Date;
    address: string,
    email: string,
    password: string,
    photo: string,
    age: number,
    jobName?:string,
    departmentName?:string,
}