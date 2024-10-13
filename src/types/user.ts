export interface User {
    id: string;
    name: string;
    email: string;
}

export interface UserFormData extends Omit<User, 'id'> {
    password: string;
    confirmPassword: string;
}
