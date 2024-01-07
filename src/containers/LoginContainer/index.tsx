
import { useState } from 'react';
import {Input, Text, Card} from '../../components';
import { SubmitButton } from '../../components/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';

interface LoginData {
    email: string
    password: string
}

interface Response {
    dataLogin: LoginData[]
}

const LoginContainer = () => {

    const formMik = useFormik ({
        initialValues: {
            email: '',
            password: '',
        },

        // nilai yg ada dalam form terhapus ketika telah disubmit
        onSubmit: (values, {resetForm}) => {
            submitLogin(values)
            console.log(values)
            resetForm()
            alert("login berhasil!")
        },

        // validasi data
        validationSchema: yup.object({
            email: yup.string().email('invalid email').required(),
            password: yup.string()
            .matches(/.{5,}/,
            'Password must be at least 5 characters')
            .required('Please enter the password'),
        })
    })

    const token = localStorage.getItem("token")

    const submitLogin = async (form: {
        email: string
        password: string
    }) => {
        try {
            const response = await fetch ('https://mock-api.arikmpt.com/api/user/login', 
            {
                headers: {
                    'Content-Type': "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })
            })

            const data = await response.json();
            console.log(data)
            if (data?.data.token) 
            {
                localStorage.setItem("token", data.data.token);
            }
        } 
        catch (err) {
            alert("please check again!");
        }
    }

    const { values, handleChange, handleSubmit } = formMik
    const { email, password } = values

    if (!token) {
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
    } return <Navigate to={'/'}/>
}
export default LoginContainer