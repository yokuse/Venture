import { array, number, object, string, TypeOf } from 'yup';

export const loginSchema = object({
    email: string().required().email(),
    password: string().required().min(8).max(25).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\%\^\&\*])[a-zA-Z\d\w\!\@\#\%\^\&\*]+$/),
    mfa: string().required().min(6).max(6).matches(/^(?=.*\d)[\d]+$/),
    csrf_token: string().required().min(40).max(40).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]+$/)
})

export type Login = TypeOf<typeof loginSchema>;