import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components"

const ProtectLayout = () => {
    
    const token = localStorage.getItem('token')
    
    if (token) {
        return (
            <div>
                <Navbar/>
                <Outlet/>
            </div>
        )
    }

    return <Navigate to="/"/>
    
}
export default ProtectLayout