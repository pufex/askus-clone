import type { HTMLAttributes } from "react"
import type { HTMLButtonRole, HTMLButtonTypes } from "../types"

import { ImSpinner8 as LoadingIcon } from "react-icons/im";
import { cn } from "../utils/cn";

interface ButtonProps extends HTMLAttributes<Omit<HTMLButtonElement, 
    "disabled" |
    "type" 
>> {
    isLoading?: boolean,
    isDisabled?: boolean,
    role?: HTMLButtonRole,
    children?: React.ReactNode
    type?: HTMLButtonTypes,
}

const Button = ({
    isDisabled,
    isLoading,
    role,
    children,
    type = "primary", 
    ...rest
}: ButtonProps) => {
    const {className} = rest
    return <button
        {...rest}
        type={role}
        className={cn(
            className ?? "",
            type,
            "button",
            isLoading ? "loading" : "",
            isDisabled ? "disabled" : ""
        )}
        disabled={isDisabled}
    >
        {children}
        {
            isLoading
                && <LoadingIcon 
                    size={20}
                    className="loading-icon"
                />
        }
    </button>
}

export default Button
