import { useContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { DEFAULT_INVOICE } from "../../../constants/invoiceDefaultData";
import { ProjectsContext } from "../../../store/ProjectsProvider";
import { UNITS } from "../../../constants/units";
import { formatDateToString } from "../../../utils/dateUtils";
import InputNumber from "../../common/InputNumber/InputNumber";
import { formatNumber } from "../../../utils/numberUtils";
 
const InvoiceForm = () => {
    const { handleInvoiceForm, invoiceForm: { open, isNew, data } } = useContext(ProjectsContext);
    const [invoiceData, setInvoiceData] = useState<InvoiceProps>(DEFAULT_INVOICE);
    useEffect(() => {
        if (!isNew && data) {
            setInvoiceData(data);
        } else {
            setInvoiceData(DEFAULT_INVOICE);
        }
    }, [open, isNew, data]);

    const handleClickSave = () => {
        handleInvoiceForm(false, false);
    }

    const handleClickClose = () => {
        handleInvoiceForm(false, false);
    }

    const handleOnFormChange = (field: string, value: number | string | Date) => {
        setInvoiceData({ ...invoiceData, [field]: value })
    }

    const handleOnItemChange = (field: string, itemIndex: number, value: number | string) => {
        const fieldKey = field as keyof ItemInvoiceProps;
        invoiceData.items[itemIndex][fieldKey] = value;
        setInvoiceData({ ...invoiceData, items: invoiceData.items })
    }

    const getSubtotal = useMemo(() => (
        invoiceData.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
    ), [invoiceData]);

    const getTotal = () => {
        const withDescountOrFee = getSubtotal + Number(invoiceData.discountOrFee);
        return withDescountOrFee + (withDescountOrFee) * invoiceData.taxPercentage / 100;
    }
    
    return (
        <Dialog open={open} handler={handleClickClose}>
            <div className="flex items-center justify-between">
                <DialogHeader>{isNew ? 'New invoice' : 'Edit invoice'}</DialogHeader>
                <XMarkIcon className="mr-3 h-5 w-5" onClick={handleClickClose} />
            </div>
            <DialogBody divider>
                <div className="flex flex-col gap-6">
                    Items:
                    {invoiceData.items.map((item, index) => (
                        <div className="w-full flex items-center gap-1">
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
                    ))}
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col w-1/3">
                                <Input
                                    type="date"
                                    className="text-right"
                                    label="Due date"
                                    value={formatDateToString(invoiceData.dueDate)}
                                    onChange={(e) => handleOnFormChange('dueDate', new Date(e.target.value))}
                                />
                        </div>
                        <div className="flex flex-col w-1/3 gap-4">
                            <div className="w-full">
                                <Typography variant="h6">Subtotal:</Typography>
                                <Typography className="text-right" variant="h6">$ {formatNumber(getSubtotal)}</Typography>
                            </div>
                            <Input
                                className="text-right"
                                type="number"
                                label="Dicount or Fee"
                                value={invoiceData.discountOrFee}
                                onChange={(e) => handleOnFormChange('discountOrFee', e.target.value)}
                            />
                            <Input
                                className="text-right"
                                type="number"
                                label="Tax %"
                                value={invoiceData.taxPercentage}
                                onChange={(e) => handleOnFormChange('taxPercentage', e.target.value)}
                            />
                            <div className="w-full">
                                <Typography variant="h6">Total:</Typography>
                                <Typography className="text-right" variant="h5">$ {formatNumber(getTotal())}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="outlined" color="red" onClick={handleClickClose}>
                    Cancel
                </Button>
                <Button variant="gradient" color="green" onClick={handleClickSave}>
                    Save
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default InvoiceForm;
