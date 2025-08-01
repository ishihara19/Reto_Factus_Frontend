export type ResponseUserMe = {
    code:    number;
    message: string;
    data:    Datum;
}

export type Datum = {
    id:                 string;
    username:           string;
    email:              string;
    roles:              string[];
    direct_permissions: string[];
}
