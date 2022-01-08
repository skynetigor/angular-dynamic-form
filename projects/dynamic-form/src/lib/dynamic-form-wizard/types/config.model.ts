export interface Config {
    name: string;
    displayName: string;
    viewType: string;
    data?: any;
    multiple?: boolean;
    required?: boolean;
    displayProperty?: string;
    valueProperty?: string;
}
