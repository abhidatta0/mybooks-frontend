import { FC, HTMLInputTypeAttribute, ChangeEvent } from 'react';

interface InputProps {
    label: string;
    type: HTMLInputTypeAttribute;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const Input: FC<InputProps> = ({ label, type, placeholder, value, onChange, error }) => {
    return (
        <div className="flex flex-col">
            <label className="text-sm">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input input-bordered w-full"
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};
export default Input;
