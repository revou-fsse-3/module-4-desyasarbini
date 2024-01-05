import { Card } from "../../components"
import ProfileDetail from "./ProfileDetail"
import { User, AppContext } from '../../providers/ContextProvider'
import { Tombol } from "../../components/Button"
import { useContext } from "react"

const ProfileContainer = () => {

    const { setUser } = useContext(AppContext)

    const fetchUser = async () => {
        const response = await fetch('https://mock-api.arikmpt.com/api/user/profile',{
            headers: {
                'Authorization' : localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjNzFlNjY5LTM4ZGYtNGRkNy04NDYwLTc4ODc2ZmM0NTNjOSIsImlhdCI6MTY4NjY3MzQzOSwiZXhwIjoxNjg2Njk1MDM5fQ.IKZrgbPGEYULE_G7E8vopOMDmnCLxZaFKuArnXkcL6U') ?? ''
            },
            method: 'GET',
        })
        const data: User = await response.json()
        setUser?.(data)
    }

    return (
        <Card border>
            <ProfileDetail/>
            <Tombol label="Get User"onClick={() => fetchUser()}/>
        </Card>
    )
}
export default ProfileContainer
