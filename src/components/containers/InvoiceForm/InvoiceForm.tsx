import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { DEFAULT_INVOICE, DEFAULT_ITEM } from "../../../constants/invoiceDefaultData";
import { ProjectsContext } from "../../../store/ProjectsProvider";
import { formatDateString } from "../../../utils/dateUtils";
import { formatNumber } from "../../../utils/numberUtils";
import InvoiceItemForm from "../../domains/InvoiceItemForm/InvoiceItemForm";
import useInvoices from "../../../hooks/useInvoices";
 
const InvoiceForm = () => {
    const {
        handleInvoiceForm,
        invoiceForm: { open, isNew, data, projectId },
        handlePrintInvoice
    } = useContext(ProjectsContext);
    const { saveInvoiceData } = useInvoices();
    const [invoiceData, setInvoiceData] = useState<InvoiceType>(DEFAULT_INVOICE);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!isNew && data) {
            setInvoiceData({...data});
        } else {
            setInvoiceData({...DEFAULT_INVOICE});
        }
    }, [open, isNew, data]);

    const handleClickSave = () => {
        projectId && saveInvoiceData(projectId, invoiceData, isNew);
        handleInvoiceForm(false, false);
    }

    const handleClickClose = () => {
        handleInvoiceForm(false, false);
    }

    const handleOnFormChange = (field: string, value: number | string | Date) => {
        setInvoiceData({ ...invoiceData, [field]: value })
    }

    const handleOnItemChange = (field: string, itemIndex: number, value: number | string) => {
        const fieldKey = field as keyof ItemInvoiceType;
        invoiceData.items[itemIndex][fieldKey] = value;
        setInvoiceData({ ...invoiceData, items: invoiceData.items })
    }

    const handleAddNewItem = () => {
        const newItem = {
            ...DEFAULT_ITEM,
            id: invoiceData.items.length
        }
        setInvoiceData({...invoiceData, items: invoiceData.items.concat(newItem)})
    }

    const handleRemoveItemAt = (index: number) => {
        if (!invoiceData.items[index]) {
            return;
        }
        invoiceData.items.splice(index, 1);
        setInvoiceData({...invoiceData})
    }

    const handlePrint = () => {
        projectId && handlePrintInvoice(invoiceData, projectId);
    }

    const getSubtotal = useMemo(() => (
        invoiceData.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
    ), [invoiceData]);

    const getTotal = () => {
        const withDescountOrFee = getSubtotal + Number(invoiceData.discountOrFee);
        return withDescountOrFee + (withDescountOrFee) * Number(invoiceData.taxPercentage) / 100;
    }

    return (
        <Dialog open={open} handler={handleClickClose} ref={dialogRef}>
            <div className="flex items-center justify-between">
                <DialogHeader>{isNew ? 'New invoice' : `Invoice number #${invoiceData.id} for project #${projectId}`}</DialogHeader>
                <XMarkIcon className="mr-3 h-5 w-5" onClick={handleClickClose} />
            </div>
            <DialogBody divider className="h-[40rem] overflow-scroll">
                <div className="flex flex-col gap-6">
                    Items:
                    {invoiceData.items.map((item, index) => (
                        <InvoiceItemForm
                            key={index}
                            handleOnItemChange={handleOnItemChange}
                            handleRemoveItem={handleRemoveItemAt}
                            item={item}
                            index={index}
                        />
                    ))}
                    <Button
                        variant="outlined"
                        className="w-2/4 text-center"
                        onClick={handleAddNewItem}
                    >
                        <i className="fas fa-add mr-1" />
                        Add new item
                    </Button>
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col w-1/3">
                                <Input
                                    type="date"
                                    className="text-right"
                                    label="Due date"
                                    value={formatDateString(invoiceData.dueDate)}
                                    onChange={(e) => handleOnFormChange('dueDate', e.target.value)}
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
                {!isNew && (
                    <Button variant="outlined" color="blue" onClick={handlePrint}>
                        Print
                    </Button>
                )}
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
