import { useParams } from 'react-router-dom';

const EditCategory = () => {
    const { id } = useParams();
    console.log('Category ID:', id);
    
    return (
        <div>ini halaman edit</div>
    )
}
export default EditCategory