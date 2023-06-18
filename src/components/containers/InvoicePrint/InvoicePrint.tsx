import { useContext, useEffect, useMemo, useRef } from "react";
import {
  DialogHeader,
  DialogBody,
  Input,
  Typography,
  Card,
} from "@material-tailwind/react";
import { useReactToPrint } from 'react-to-print';
import { formatDateString } from "../../../utils/dateUtils";
import { formatNumber } from "../../../utils/numberUtils";
import InvoiceItemForm from "../../domains/InvoiceItemForm/InvoiceItemForm";
import { ProjectsContext } from "../../../store/ProjectsProvider";
 
const InvoicePrint = () => {
    const { dataToPrint: { projectData, invoiceData }, handlePrintInvoice } = useContext(ProjectsContext);
    const dialogRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => dialogRef.current,
        onAfterPrint: () => {
            handlePrintInvoice(null, -1);
        }
    });

    useEffect(() => {
        if (invoiceData && projectData) {
            handlePrint();
        }
    }, [invoiceData, projectData]);

    const getSubtotal = useMemo(() => (
        invoiceData?.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
    ), [invoiceData]);

    const getTotal = () => {
        const withDescountOrFee = getSubtotal + Number(invoiceData?.discountOrFee);
        return withDescountOrFee + (withDescountOrFee) * Number(invoiceData?.taxPercentage) / 100;
    }

    return (
        <div style={{ display: "none" }}>
            {invoiceData && projectData && (
                <Card ref={dialogRef} className="max-w-4xl min-w-min m-5">
                    <div className="flex items-center justify-between">
                        <DialogHeader>{`Invoice number #${invoiceData?.id} for project #${projectData?.id}`}</DialogHeader>
                    </div>
                    <DialogBody divider>
                        <Typography variant="h6">
                            Client: {projectData?.client}
                        </Typography>
                        <Typography variant="h6">
                            Project: {projectData?.title}
                        </Typography>
                        <div className="flex flex-col gap-6 mt-3">
                            Items:
                            {invoiceData?.items.map((item, index) => (
                                <InvoiceItemForm
                                    key={index}
                                    handleOnItemChange={() => {}}
                                    handleRemoveItem={() => {}}
                                    item={item}
                                    index={index}
                                    withActions={false}
                                />
                            ))}
                            <div className="flex w-full justify-between">
                                <div className="flex flex-col w-1/3">
                                        <Input
                                            type="date"
                                            className="text-right"
                                            label="Due date"
                                            value={invoiceData ? formatDateString(invoiceData.dueDate) : ''}
                                            onChange={() => {}}
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
                                        value={invoiceData?.discountOrFee}
                                        onChange={() => {}}
                                    />
                                    <Input
                                        className="text-right"
                                        type="number"
                                        label="Tax %"
                                        value={invoiceData?.taxPercentage}
                                        onChange={() => {}}
                                    />
                                    <div className="w-full">
                                        <Typography variant="h6">Total:</Typography>
                                        <Typography className="text-right" variant="h5">$ {formatNumber(getTotal())}</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogBody>
                </Card>
            )}
        </div>
    );
}

export default InvoicePrint;
