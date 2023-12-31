export interface DatabaseConfig {
    type: string;
    synchronize: boolean;
    logging: boolean;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}