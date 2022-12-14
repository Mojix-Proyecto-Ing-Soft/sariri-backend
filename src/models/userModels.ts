export type NewUser = {
    user_id: string,
    user_name: string,
    user_lastName: string,
    user_email: string,
    user_phone: string
};

export type UpdateUser = {
    user_name?: string,
    user_lastName?: string,
    user_phone?: string
};