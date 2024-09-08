export interface CompanyResponse {
    success: boolean;
    data: {
        id: number;
        name: string;
        email: string;
        phoneNumber: string;
        website: string;
        address: string;
    };
}
