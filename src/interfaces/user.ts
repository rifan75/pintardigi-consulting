export interface IUserData {
    id: string;
    no: number;
    name: string;
    email: string;
    role: string;
    status: string;
    url_avatar: string;
    responsible_list: string[];
}

export interface IUserSimpleData {
    id: string;
    name: string;
    email: string;
}
