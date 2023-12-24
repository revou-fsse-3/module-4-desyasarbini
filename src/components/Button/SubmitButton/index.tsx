import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const SubmitButton = ({label, disabled, ...props}: Props) => {
  return (
    <button 
      {...props} 
      className = {`rounded-md ${
          disabled ? 'bg-gray-400' : 'bg-sky-400 hover:bg-sky-600'
        } px-3 py-2 text-sm font-semibold text-sky-900 shadow-sm ${
          !disabled && 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        }`} disabled={disabled}>
          {label}  
    </button>
  )
}
export default SubmitButton