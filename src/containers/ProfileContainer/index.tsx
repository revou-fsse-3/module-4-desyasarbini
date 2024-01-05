import { Card } from "../../components"
import ProfileDetail from "./ProfileDetail"
import { User, AppContext } from '../../providers/ContextProvider'
import { Tombol } from "../../components/Button"
import { useContext } from "react"

const ProfileContainer = () => {

    const { setUser } = useContext(AppContext)

    const fetchUser = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
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
