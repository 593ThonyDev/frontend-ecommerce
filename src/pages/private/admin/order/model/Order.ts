export interface OrderModel {
    idOrder: string
    customer: {
        idCustomer: string
        fullName: string
        email: string
        address: string
        country: string
        zip: string
        photo:string
    }
    code: string
    ammount: string
    address: string
    email: string
    status: string
    date: string
}