import { Textarea } from "@headlessui/react";
import { InputHTMLAttributes } from "react";


export const CustomTextarea = ({
    className,
    ...props
}: InputHTMLAttributes<HTMLTextAreaElement>) => {
    return(
        <Textarea
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
        />
    );
}