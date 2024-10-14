export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AddUserFormData extends Omit<User, 'id'> {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
   phoneNumber: string;
   role: string;
}
