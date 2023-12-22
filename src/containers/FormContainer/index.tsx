import {Input, Button, Typography, Card, Table} from '../../components';
import {Form, useFormik} from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

interface DataProps{
    fullName: string;
    email: string;
    tanggalLahir: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    userName: string;
    password: string;
}
const FormContainer = () => {

    const [users, setUsers] = useState<DataProps[]>([]);
    const [selectedUser, setSelectedUser] = useState<DataProps>();
    const [step, setStep] = useState<number>(1);

    // fungsi tombol next
    const handleNext = () => {
        if (step === 3) {
            return
        }
        setStep((prevState: number) => prevState + 1)
    }

    // fungsi tombol previous
    const handlePrevious = () => { 
        if (step === 1) {
            return
        }
        setStep((prevState) => prevState - 1)
    }

    const formMik = useFormik ({
        // ketika value diganti maka formMik akan re-render lagi
        initialValues: selectedUser ?? {
            fullName: '',
            email: '',
            tanggalLahir: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            userName: '',
            password: ''
        },

        // nilai yg ada dalam form terhapus ketika telah disubmit
        onSubmit: (values, {resetForm}) => {
            setUsers([...users, values])
            resetForm()
        },
        
        validationSchema: yup.object({
            fullName: yup.string().required(),
            email: yup.string().email().required(),
            tanggalLahir: yup.string().required(),
            // address: yup.string().required(),
            // city: yup.string().required(),
            // state: yup.string().required(),
            // zipCode: yup.string().required(),
            // userName: yup.string().required().min(8, "Must be 8 characters or more"),
            // password: yup.string().required().min(8, "Must be 8 characters or more").matches(/[a-z]+/, "One lowercase character").matches(/[A-Z]+/, "One uppercase character").matches(/[@$!%*#?&]+/, "One special character").matches(/\d+/, "One number")
        }),
        enableReinitialize: true
    });

    const onDelete = (index: number) => {
        setUsers((prevState) => prevState.filter((_, dataIndex) => dataIndex !== index))
    }

    const onEdit = (index: number) => {
        const findUser = users.find((_, dataIndex) => dataIndex === index);
        setSelectedUser(findUser);
    }

    return (
        <Card border={false} className={'flex flex-col gap-3'}>
            {step === 1 && (
                <div>
                    <Card border>
                        <form onSubmit={formMik.handleSubmit}>
                            <div className='mb-5'>
                                <Typography>{'Full Name'}</Typography>
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
                                <Typography>{'E-mail'}</Typography>
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
                                <Typography>{'Date Of Birth'}</Typography>
                                <Input 
                                    className="border-solid border-2 border-sky-500 rounded-md w-full" 
                                    name={'tanggalLahir'} 
                                    value={formMik.values.tanggalLahir}
                                    onChange={formMik.handleChange('tanggalLahir')}
                                />
                                {
                                    formMik.errors.tanggalLahir && (
                                        <Typography>{formMik.errors.tanggalLahir}</Typography>
                                    )
                                }
                            </div>
                            <Button label={'Submit'} type={'submit'} className='bg-sky-500'/>
                        </form>
                    </Card>
                    <Card border>
                        <Table headers={[
                            {
                                label: 'Full Name',
                                key: 'fullName'
                            },
                            {
                                label: 'E-mail',
                                key: 'email'
                            },
                            {
                                label: 'Date Of Birth',
                                key: 'tanggalLahir'
                            },
                        ]} data={users}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        />
                    </Card>
                </div>
            )}
            {step === 2 && (
                <div>
                    <Card border>
                    <form onSubmit={formMik.handleSubmit}>
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
                            <Typography>{'Zip Code'}</Typography>
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
                        <Button label={'Submit'} type={'submit'} className='bg-sky-500'/>
                    </form>
                    </Card>
                    <Card border>
                        <Table headers={[
                            {
                                label: 'Address',
                                key: 'address'
                            },
                            {
                                label: 'City',
                                key: 'city'
                            },
                            {
                                label: 'State',
                                key: 'state'
                            },
                            {
                                label: 'Zip Code',
                                key: 'zipCode'
                            }
                        ]} data={users}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        />
                    </Card>
                </div>                      
            )}
            {step === 3 &&(
                <div>
                    <Card border>
                    <form onSubmit={formMik.handleSubmit}>
                        <div className='mb-5'>
                            <Typography>{'Username'}</Typography>
                            <Input 
                                className="border-solid border-2 border-sky-500 rounded-md w-full" 
                                name={'userName'} 
                                value={formMik.values.userName}
                                onChange={formMik.handleChange('userName')}
                            />
                            {
                                formMik.errors.userName && (
                                    <Typography>{formMik.errors.userName}</Typography>
                                )
                            }
                        </div>
                        <div className='mb-5'>
                            <Typography>{'Password'}</Typography>
                            <Input 
                                className="border-solid border-2 border-sky-500 rounded-md w-full" 
                                name={'password'} 
                                value={formMik.values.password}
                                onChange={formMik.handleChange('password')}
                            />
                            {
                                formMik.errors.password && (
                                    <Typography>{formMik.errors.password}</Typography>
                                )
                            }
                        </div>
                        <Button label={'Submit'} type={'submit'} className='bg-sky-500'/>
                    </form>
                    </Card>
                    <Card border>
                        <Table headers={[
                            {
                                label: 'Username',
                                key: 'userName'
                            },
                            {
                                label: 'Password',
                                key: 'password'
                            },
                        ]} data={users}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        />
                    </Card>
                </div>
            )}
            <div className='flex justify-end'>
                <Button label={'Previous'} onClick={handlePrevious} type={'button'} className={'bg-green-500'}/>
                <Button label={'Next'} onClick={handleNext} type={'button'} className={'bg-green-500'}/> 
            </div>
        </Card>   
    )
}
export default FormContainer