import * as React from "react";
import {useEffect, useRef, useState} from "react";

export interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
    items: {
        value: number | string,
        option: number | string,
    }[]
    onSelected?: (value: any) => void;
}

const Select = ({items, onSelected, defaultValue}: SelectProps) => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>();
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsSelectOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={selectRef} className="flex flex-col gap-2 relative">
            <div
                className="flex justify-between gap-3 items-center border px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
                <span className={"text-sm"}>{selectedOption || defaultValue || "Select"}</span>
                <img src="/down.svg" alt="#" className={`${isSelectOpen && "rotate-180"} select-none`}/>
            </div>

            {isSelectOpen && (
                <div className="border bg-white py-1 rounded-lg absolute top-12 flex flex-col gap-1 w-full z-50">
                    {items.map((item, index) => (
                        <span
                            key={item.value}
                            onClick={() => {
                                onSelected?.(item.value);
                                setSelectedOption(item.option as string);
                                setIsSelectOpen(false);
                            }}
                            className={`cursor-pointer text-sm px-3 py-1 ${items.length - 1 !== index && "border-b"}`}
                        >
                            {item.option}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
