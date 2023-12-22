
import {HTMLAttributes} from "react"

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children: string;
}

const Typography = ({children, ...props}: Props) => {
    return (
        <p {...props}>{children}</p>
    )
}
export default Typography