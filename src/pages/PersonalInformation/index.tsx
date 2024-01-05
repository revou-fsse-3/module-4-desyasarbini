import {Input, Text, Card, Date} from '../../components';
import { SubmitButton} from '../../components/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';

interface PersonalInformationProps{
    onNext: () => void
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({onNext}) => {

    const formMik = useFormik ({
        initialValues: {
            fullName: '',
            email: '',
            birthDate: '',
        },

        // nilai yg ada dalam form terhapus ketika telah disubmit
        onSubmit: (values) => {
            console.log(values)
            onNext()
        },

        // validasi data
        validationSchema: yup.object({
            fullName: yup.string().min(2,'Too Short!').required(),
            email: yup.string().email('invalid email').required(),
            birthDate: yup.date().required(),
        })
    })

    return (
        <div>
            <Card border>
                <form onSubmit={formMik.handleSubmit}>
                    <Text className='m-5 text-xl font-semibold text-center text-sky-900'>
                        {'Personal Information'}
                    </Text>
                    <div className='mb-5'>
                        <Text className='font-medium text-sky-800'>{'Full Name'}</Text>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'fullName'} 
                            value={formMik.values.fullName}
                            onChange={formMik.handleChange('fullName')}
                        />
                        {
                            formMik.errors.fullName && (
                                <Text>{formMik.errors.fullName}</Text>
                            )
                        }
                    </div>
                    <div className='mb-5'>
                        <Text className='font-medium text-sky-800'>{'E-mail'}</Text>
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
                        <Text className='font-medium text-sky-800'>{'Birth Date'}</Text>
                        <Date
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'birthDate'} 
                            value={formMik.values.birthDate}
                            onChange={formMik.handleChange('birthDate')}
                        />
                        {
                            formMik.errors.birthDate && (
                                <Text>{formMik.errors.birthDate}</Text>
                            )
                        }
                    </div>
                    <SubmitButton label={'Submit'} type={'submit'} disabled={!formMik.isValid}/>
                </form>
            </Card>
        </div>  
    )
}
export default PersonalInformation