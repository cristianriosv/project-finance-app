import { Input } from "@material-tailwind/react"

type InputNumberProps = {
    onChange: (value: number) => void;
    label: string;
    className: string;
    value: number;
    isOnlyPositive?: boolean;
}

const InputNumber = ({
    onChange,
    label,
    className,
    value,
    isOnlyPositive = false
}: InputNumberProps) => {
    const ONLY_POSITIVE = /^\d*\.{0,1}\d+$/;
    const ALL_NUMBERS = /^-?\d*\.{0,1}\d+$/;
    const handleOnChange = (value: string) => {
        if (isOnlyPositive && ONLY_POSITIVE.test(value)) {
            onChange(Number(value));
        } else if (!isOnlyPositive && ALL_NUMBERS.test(value)) {
            onChange(Number(value));
        } else {
            onChange(0);
        }
    }
    return (
        <Input
            type="number"
            className={className}
            label={label}
            value={value}
            onChange={(e) => handleOnChange(e.target.value)}
        />
    )
}

export default InputNumber;