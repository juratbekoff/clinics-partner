import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "../../lib/utils.tsx";

const buttonVariants = cva(
    "py-2 px-[20px] rounded-md select-none text-sm",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-white disabled:bg-opacity-70",
                outline:
                    "bg-white text-primary border border-primary disabled:bg-gray-200 disabled:border-none disabled:text-gray-400",
            }
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant = "default", asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({variant, className}))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export {Button, buttonVariants}
