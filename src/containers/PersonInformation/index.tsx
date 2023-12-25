import {Input, Typography, Card, Date} from '../../components';
import { SubmitButton} from '../../components/Button';
import {useFormik} from 'formik';
import * as yup from 'yup';

interface PersonInformationProps{
    onNext: () => void
}

const PersonInformation: React.FC<PersonInformationProps> = ({onNext}) => {

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
                    <Typography className='m-5 text-xl font-semibold text-center text-sky-900'>
                        {'Personal Information'}
                    </Typography>
                    <div className='mb-5'>
                        <Typography className='font-medium text-sky-800'>{'Full Name'}</Typography>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'fullName'} 
                            value={formMik.values.fullName}
                            onChange={formMik.handleChange('fullName')}
                        />
                        {
                            formMik.errors.fullName && (
                                <Typography>{formMik.errors.fullName}</Typography>
                            )
                        }
                    </div>
                    <div className='mb-5'>
                        <Typography className='font-medium text-sky-800'>{'E-mail'}</Typography>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'email'} 
                            value={formMik.values.email}
                            onChange={formMik.handleChange('email')}
                        />
                        {
                            formMik.errors.email && (
                                <Typography>{formMik.errors.email}</Typography>
                            )
                        }
                    </div>
                    <div className='mb-5'>
                        <Typography className='font-medium text-sky-800'>{'Birth Date'}</Typography>
                        <Date
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'birthDate'} 
                            value={formMik.values.birthDate}
                            onChange={formMik.handleChange('birthDate')}
                        />
                        {
                            formMik.errors.birthDate && (
                                <Typography>{formMik.errors.birthDate}</Typography>
                            )
                        }
                    </div>
                    <SubmitButton label={'Submit'} type={'submit'} disabled={!formMik.isValid}/>
                </form>
            </Card>
        </div>  
    )
}
export default PersonInformation