function Input({ type="text", placeholder="placeholder", onChange, value }: { type: string, placeholder: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, value: string } ) {
    return ( <input type={type} placeholder={placeholder} onChange={onChange} value={value} /> );
}

export default Input;