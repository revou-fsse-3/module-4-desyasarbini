import {Input, Text, Card} from '../../components';
import { SubmitButton } from '../../components/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';

const RegisterContainer = () => {
    
    const formMik = useFormik ({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
        },

        // nilai yg ada dalam form terhapus ketika telah disubmit
        onSubmit: (values) => {
            console.log(values)
        },

        // validasi data
        validationSchema: yup.object({
            fullName: yup.string().min(2,'Too Short!').required(),
            email: yup.string().email('invalid email').required(),
            password: yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character')
            .required('Please enter the password'),
        })
    })

    return (
        <div className="app">
            <Card border>
                <form onSubmit={formMik.handleSubmit}>
                    <Text className='m-5 text-xl font-semibold text-center text-sky-900'>{'Signup'}</Text>
                    <div>
                        <Text>{'Full Name'}</Text>
                        <Input 
                            name={'Full Name'} 
                            value={formMik.values.fullName}
                            onChange={formMik.handleChange('Full Name')}
                        />
                        {
                            formMik.errors.fullName && (
                                <Text>{formMik.errors.fullName}</Text>
                            )
                        }
                    </div>
                    <div>
                        <Text>{'E-mail'}</Text>
                        <Input 
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
                    <div>
                        <Text>{'Password'}</Text>
                        <Input 
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
                    <SubmitButton label={'Signup'} type={'submit'} disabled={!formMik.isValid}/>
                </form>
            </Card>
        </div>
    )
}
export default RegisterContainer
