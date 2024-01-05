import { useContext } from "react"
import { Card, Text } from "../../components"
import { AppContext } from '../../providers/ContextProvider'

const ProfileDetail = () => {
    const { user } = useContext(AppContext)

    return (
        <Card border={false} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
            }}>

            <Text>{`Nama User: ${user?.name ?? '-'}`}</Text>
            <Text>{`Email User: ${user?.email ?? '-'}`}</Text>
            <Text>{`Username User: ${user?.username ?? '-'}`}</Text>
        </Card>
    )
}
export default ProfileDetail