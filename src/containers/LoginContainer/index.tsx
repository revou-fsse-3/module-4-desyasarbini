
import { useEffect, useState } from 'react';
import {Input, Text, Card} from '../../components';
import { SubmitButton } from '../../components/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';

interface LoginData {
    email: string
    password: string
}

interface Response {
    dataLogin: LoginData[]
}

const LoginContainer = () => {

    const [dataLogin, setDatalogin] = useState<LoginData[]>([])

    const fetchDataLogin = async () => {
        const response = await fetch('https://mock-api.arikmpt.com/api/user/login')
        const data: Response = await response.json()
        setDatalogin?.(data.dataLogin)
    }

    const formMik = useFormik ({
        initialValues: {
            email: '',
            password: '',
        },

        // nilai yg ada dalam form terhapus ketika telah disubmit
        onSubmit: (data: LoginData) => submitLogin (data),

        // validasi data
        validationSchema: yup.object({
            email: yup.string().email('invalid email').required(),
            password: yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character')
            .required('Please enter the password'),
        })
    })

    const submitLogin = async (form: LoginData) => {
        const response = await fetch ('https://mock-api.arikmpt.com/api/user/login', {
            headers: {
                'Authorization' : localStorage.getItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjNzFlNjY5LTM4ZGYtNGRkNy04NDYwLTc4ODc2ZmM0NTNjOSIsImlhdCI6MTcwNDQ3NTY5MywiZXhwIjoxNzA0NDk3MjkzfQ.bBQSrTlvyEgY3dIjYxCzbxOFFUNKeHYlyu2WvjZmKm4") ?? ''
            },
            method: 'POST',
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        })
        const data: LoginData = await response.json();
        setDatalogin ([...dataLogin, data])
    }

    useEffect (
        () => {
            fetchDataLogin()
        },
        []
    )

    return (
        <div className="app">
            <Card border>
                <form onSubmit={formMik.handleSubmit}>
                    <Text className='m-5 text-xl font-bold text-center text-sky-900'>{'Login to your Account'}</Text>
                    <div className='mb-5'>
                        <Text className='text-l font-semibold text-sky-900'>{'E-mail'}</Text>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'email'} 
                            value={formMik.values.email}
                            onChange={formMik.handleChange('email')}
                        />
                        {
                            formMik.errors.email && (
                                <Text>{formMik.errors.email}</Text>
                            )
                        }
                    </div>
                    <div className='mb-5'>
                        <Text className='text-l font-semibold text-sky-900'>{'Password'}</Text>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'password'} 
                            type="password"
                            value={formMik.values.password}
                            onChange={formMik.handleChange('password')}
                        />
                        {
                            formMik.errors.password && (
                                <Text>{formMik.errors.password}</Text>
                            )
                        }
                    </div>
                    <SubmitButton label={'Login'} type={'submit'} disabled={!formMik.isValid}/>
                </form>
            </Card>
        </div>
    )
}
export default LoginContainer