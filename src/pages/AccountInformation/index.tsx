import {Input, Text, Card} from '../../components';
import { SubmitButton, PreviousButton } from '../../components/Button';
import {useFormik} from 'formik';
import * as yup from 'yup'; 

interface AddressInformationProps {
    onNext: () => void
    onPrevious: () => void
}

const AccountInformation: React.FC<AddressInformationProps> = ({onNext, onPrevious}) => {

    const formMik = useFormik ({
        initialValues: {
            userName: '',
            password: '',
            state: '',
            zipCode:''
        },


        onSubmit: (values) => {
            console.log(values)
            onNext()
        },

        // validasi data
        validationSchema: yup.object({
            userName: yup.string().min(8,'Username invalid').required(),
            password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character').required('Please enter the password'),
        })
    })

    return (
        <div>
            <Card border>
                <form onSubmit={formMik.handleSubmit}>
                    <Text className='m-5 text-xl font-semibold text-center text-sky-900'>
                        {'Account Information'}
                    </Text>
                    <div className='mb-5'>
                        <Text className='font-medium text-sky-800'>{'UserName'}</Text>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'userName'} 
                            value={formMik.values.userName}
                            onChange={formMik.handleChange('userName')}
                        />
                        {
                            formMik.errors.userName && (
                                <Text>{formMik.errors.userName}</Text>
                            )
                        }
                    </div>
                    <div className='mb-5'>
                        <Text className='font-medium text-sky-800'>{'password'}</Text>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'password'} 
                            value={formMik.values.password}
                            onChange={formMik.handleChange('password')}
                        />
                        {
                            formMik.errors.password && (
                                <Text>{formMik.errors.password}</Text>
                            )
                        }
                    </div>
                    <PreviousButton label={'Prev'} onClick={onPrevious} type={'button'}/>
                    <SubmitButton label={'Submit'} type={'submit'} disabled={!formMik.isValid}/>
                </form>
            </Card>
        </div>
    )
}
export default AccountInformation