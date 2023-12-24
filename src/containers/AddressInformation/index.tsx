import {Input, Typography, Card} from '../../components';
import { SubmitButton, PreviousButton } from '../../components/Button';
import {useFormik} from 'formik';
import * as yup from 'yup'; 

interface AddressInformationProps {
    onNext: () => void
    onPrevious: () => void
}

const AddressInformation: React.FC<AddressInformationProps> = ({onNext, onPrevious}) => {

    const formMik = useFormik ({
        initialValues: {
            address: '',
            city: '',
            state: '',
            zipCode:''
        },

        // nilai yg ada dalam form terhapus ketika telah disubmit
        onSubmit: (values) => {
            console.log(values)
            onNext()
        },

        // validasi data
        validationSchema: yup.object({
            address: yup.string().min(10,'incorrect address').required(),
            city: yup.string().min(4,'invalid city').required(),
            state: yup.string().min(4,'invalid state').required(),
            zipCode: yup.string().matches(/^\d{5}$/,'Please enter the valid ZIP code').required('Please enter your zip code')
        })
    })

    return (

        <div>

            <Card border>
                <form onSubmit={formMik.handleSubmit}>
                    <Typography className='mb-5 text-2xl font-semibold text-center text-sky-900'>
                        {'Address Information'}
                    </Typography>
                    <div className='mb-5'>
                        <Typography>{'Address'}</Typography>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'address'} 
                            value={formMik.values.address}
                            onChange={formMik.handleChange('address')}
                        />
                        {
                            formMik.errors.address && (
                                <Typography>{formMik.errors.address}</Typography>
                            )
                        }
                    </div>
                    <div className='mb-5'>
                        <Typography>{'City'}</Typography>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'city'} 
                            value={formMik.values.city}
                            onChange={formMik.handleChange('city')}
                        />
                        {
                            formMik.errors.city && (
                                <Typography>{formMik.errors.city}</Typography>
                            )
                        }
                    </div>
                    <div className='mb-5'>
                        <Typography>{'State'}</Typography>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'state'} 
                            value={formMik.values.state}
                            onChange={formMik.handleChange('state')}
                        />
                        {
                            formMik.errors.state && (
                                <Typography>{formMik.errors.state}</Typography>
                            )
                        }
                    </div>
                    <div className='mb-5'>
                        <Typography>{'ZIP Code'}</Typography>
                        <Input 
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'zipCode'} 
                            value={formMik.values.zipCode}
                            onChange={formMik.handleChange('zipCode')}
                        />
                        {
                            formMik.errors.zipCode && (
                                <Typography>{formMik.errors.zipCode}</Typography>
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
export default AddressInformation
