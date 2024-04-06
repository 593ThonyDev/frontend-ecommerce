interface LoginResponse {
    username?: string
    password?: string
    token?: string;
    userDetails?: {
        idUser: number;
        idCustomer?: number;
        idEmploye?: number;
        username: string;
        fullName: string;
        role: string;
        status?: string;
        photo?: string;
    };
}