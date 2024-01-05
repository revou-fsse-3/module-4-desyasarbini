import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children: string
}

const Text = ({children, ...props}: Props) => {
    return (
        <p {...props}>{children}</p>
    )
}
export default Text