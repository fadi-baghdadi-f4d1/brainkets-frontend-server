export interface SendTestEmailRequest {
    mailDriver: string;
    mailHost: string;
    mailPort: number;
    mailUsername: string;
    mailPassword: string;
    mailFromName: string;
    mailFromEmail: string;
    mailEncryption: string;
    isVerified: boolean;
    mailConnection: string;
}
