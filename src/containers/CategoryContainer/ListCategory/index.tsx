import { Navigate, useSubmit } from 'react-router-dom'
import { Text, Card, Input } from '../../../components'
import { useEffect, useState } from 'react'
import { Tombol } from '../../../components/Button'
import * as yup from 'yup';
import { useFormik } from 'formik';

interface CategoryProps {
    name?: string;
    is_active?: boolean;
}
interface Category {
    id: string;
    name: string;
    is_active: boolean;
}

const ListCategory = () => {

    const [categories, setCategory] = useState<Category[]>([])
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://mock-api.arikmpt.com/api/category', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            })
            const data = await response.json()
            setCategory?.(data.data)
        }
        catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    useEffect(
        () => {
            fetchCategories()
        }, []
    )

    const formMik = useFormik({
        initialValues: {
            name: '',
            is_active: true
        },
        onSubmit: async (values, { resetForm }) => {
            if (editingCategory) {
                await updateCategory({ ...editingCategory, ...values });
            } else {
                await createCategory(values);
            }
            resetForm();
            setEditingCategory(null); // Reset editingCategory after submit
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            is_active: yup.boolean().required()
        })
    })

    const createCategory = async (data: CategoryProps) => {
        try {
            const response = await fetch('https://mock-api.arikmpt.com/api/category/create', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    name: data.name,
                    is_active: data.is_active
                })
            })
            const newCategory = await response.json()
            fetchCategories()
            console.log(newCategory)
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateCategory = async (data: Category) => {
        try {
            const response = await fetch('https://mock-api.arikmpt.com/api/category/update', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify({
                    id: data.id,
                    name: data.name,
                    is_active: data.is_active,
                }),
            });
    
            console.log('Update Response:', response);
    
            if (response.status === 204) {
                // Successful update, but no content to parse
                fetchCategories();
                console.log('Category updated successfully');
            } else if (response.ok) {
                const updatedCategory = await response.json();
                fetchCategories();
                console.log(updatedCategory);
            } 
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };
      
    

    const editCategory = async (id: string) => {
        try {
            const response = await fetch(`https://mock-api.arikmpt.com/api/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                },
                method: 'GET'
            });
    
            if (response.ok) {
                const responseData = await response.json();
                const getCategory = responseData.data; // Access the nested 'data' property
                if (getCategory && typeof getCategory.is_active === 'boolean') {
                    setEditingCategory(getCategory);
                } else {
                    console.error('Invalid category data:', getCategory);
                }
            }
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
    
        

    const deleteCategory = async (id: string) => {
        try {
            const response = await fetch(`https://mock-api.arikmpt.com/api/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'DELETE'
            })
            fetchCategories()
        }
        catch (error) {
            console.log(error)
        }
    }

    const { errors, values, handleChange, handleSubmit } = formMik;
    const { name, is_active } = values;
    const token = localStorage.getItem("token")

    
    return (
        <Card border>
            <Card border={false}>
                <table className="border-solid border-2 border-sky-500 rounded-md w-full">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((data) => (
                            <tr key={data.id}>
                                <td>{data.name}</td>
                                <td>{data.is_active? 'active' : 'inactive'}</td>
                                <td>
                                    <button type='button' onClick={() => editCategory(data.id)}>Edit</button>
                                </td>
                                <td>
                                    <button type='button' onClick={() => deleteCategory(data.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card> 
            <Card border={false}>
                <form onSubmit={formMik.handleSubmit}>
                    <div>
                        <Text>{'Category Name'}</Text>
                        <Input
                            className="border-solid border-2 border-sky-500 rounded-md w-full" 
                            name={'name'} 
                            type="text"
                            value={editingCategory ? editingCategory.name : formMik.values.name}
                            onChange={(e) => {
                                if (editingCategory) {
                                    // Update the editingCategory directly
                                    setEditingCategory({
                                        ...editingCategory,
                                        name: e.target.value,
                                    });
                                } else {
                                    // Update formMik.values
                                    formMik.handleChange('name')(e);
                                }
                            }}
                        />
                        {formMik.errors.name && (
                            <Text>{formMik.errors.name}</Text>
                        )}
                    </div>
                    <div>
                        <Text>{'Status'}</Text>
                        <label>
                            <select 
                                className="border-solid border-2 border-sky-500 rounded-md w-full"
                                name="is_active" 
                                value={editingCategory ? editingCategory.is_active.toString() : formMik.values.is_active.toString()}
                                onChange={(e) => {
                                    if (editingCategory) {
                                        // Update the editingCategory directly
                                        setEditingCategory({
                                            ...editingCategory,
                                            is_active: e.target.value === 'true',
                                        });
                                    } else {
                                        // Update formMik.values
                                        formMik.handleChange('is_active')(e);
                                    }
                                }}
                            >
                                <option value="">-- Select --</option>
                                <option value='true'>Active</option>
                                <option value='false'>Inactive</option>
                            </select>
                        </label>
                    </div>
                    <Tombol label={'Add Category'} type={"submit"}/>
                    <Tombol label={'Update'} type={"submit"}/>
                </form>
            </Card>
        </Card>
    )    
}
export default ListCategory