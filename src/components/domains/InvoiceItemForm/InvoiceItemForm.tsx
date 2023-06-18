import { Input, Select, Typography, Option } from "@material-tailwind/react";
import InputNumber from "../../common/InputNumber";
import { formatNumber } from "../../../utils/numberUtils";
import { UNITS } from "../../../constants/units";

type InvoiceItemFormProps = {
    handleOnItemChange: (field: string, index: number, value: string | number) => void;
    item: ItemType;
    index: number;
}

const InvoiceItemForm = ({
    handleOnItemChange,
    item,
    index
}: InvoiceItemFormProps) => (
    <div key={index} className="w-full flex items-center gap-1">
        <div className="w-2/5">
            <Input
                label="Description"
                value={item.title}
                onChange={(e) => handleOnItemChange('title', index, e.target.value)}
            />
        </div>
        <div className="w-3/5 flex items-center gap-1">
            <InputNumber
                isOnlyPositive
                className="text-right"
                label="Unit price"
                value={item.unitPrice}
                onChange={(value) => handleOnItemChange('unitPrice', index, value)}
            />
            <Select value={item.unit} label="Unit" onChange={(value) => handleOnItemChange('unit', index, value || UNITS.UN)}>
                {Object.values(UNITS).map((unit) => (
                    <Option key={unit} value={unit}>{unit}</Option>
                ))}
            </Select>
            <InputNumber
                isOnlyPositive
                className="text-right"
                label="Quantity"
                value={item.quantity}
                onChange={(value) => handleOnItemChange('quantity', index, value)}
            />
            <div className="w-full">
                <Typography className="text-right" variant="h6">$ {formatNumber(item.unitPrice * item.quantity || 0)}</Typography>
            </div>
        </div>
    </div>
);

export default InvoiceItemForm;
