import { useEffect, useState } from 'react';
import {Input, Text, Card} from '../../components';
import { SubmitButton } from '../../components/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';

interface RegisterData {
    name: string
    email: string
    password: string
}

interface Response {
    register: RegisterData[]
}

const RegisterContainer = () => {

    const [register, setRegister] = useState<RegisterData[]>([])

    const fetchDataRegister = async () => {
        const response = await fetch('https://mock-api.arikmpt.com/api/user/register')
        const data: Response = await response.json()
        setRegister?.(data.register)
    }
    
    const formMik = useFormik ({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },

        // nilai yg ada dalam form terhapus ketika telah disubmit
        onSubmit: (data: RegisterData) => submitRegistrasi (data),

        // validasi data
        validationSchema: yup.object({
            name: yup.string().min(2,'Too Short!').required(),
            email: yup.string().email('invalid email').required(),
            password: yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character')
            .required('Please enter the password'),
        })
    })

    const submitRegistrasi = async (form: RegisterData) => {
        const response = await fetch ('https://mock-api.arikmpt.com/api/user/register', {
            headers: {
                'Authorization' : localStorage.getItem('token') ?? ''
            },
            method: 'POST',
            body: JSON.stringify({
                name: form.email,
                email: form.email,
                password: form.password
            })
        })
        const data: RegisterData = await response.json();
        setRegister ([...register, data])
    }

    useEffect (
        () => {
            fetchDataRegister()
        },
        []
    )

    return (
        <div className="app">
            <Card border>
                <form onSubmit={formMik.handleSubmit}>
                    <Text className='m-5 text-xl font-bold text-center text-sky-900'>{'Create your Account'}</Text>
                    <div className='mb-5'>
                        <Text className='text-l font-semibold text-sky-900'>{'Name'}</Text>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full"
                            name={'name'} 
                            value={formMik.values.name}
                            onChange={formMik.handleChange('name')}
                        />
                        {
                            formMik.errors.name && (
                                <Text>{formMik.errors.name}</Text>
                            )
                        }
                    </div>
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
                    <SubmitButton label={'Register'} type={'submit'} disabled={!formMik.isValid}/>
                </form>
            </Card>
        </div>
    )
}
export default RegisterContainer
