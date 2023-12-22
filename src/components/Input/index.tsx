
import {InputHTMLAttributes} from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = (props:InputProps) => {
    return (
        <input type="text" {...props} className={`${props.className} block flex-1 border-3 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}/>
    )
}
export default Input