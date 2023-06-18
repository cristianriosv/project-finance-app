import { useContext } from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import TableCell from "../../common/TableCell/TableCell";
import TableHead from "../../common/TableHead/TableHead";
import { ProjectsContext } from "../../../store/ProjectsProvider";
import { formatNumber } from "../../../utils/numberUtils";
import { DEFAULT_INVOICE } from "../../../constants/invoiceDefaultData";
import useInvoices from "../../../hooks/useInvoices";
import { GENERAL_ACTION_COLUMN_WIDTH } from "../../../constants/tables";

type InvoicesListProps = {
    invoices: InvoiceType[];
    projectId: number;
}

const InvoicesList = ({ invoices, projectId }: InvoicesListProps) => {
    const { handleInvoiceForm, handleQuestionForm, handlePrintInvoice } = useContext(ProjectsContext);
    const { deleteInvoice } = useInvoices();
    const TABLE_HEAD = ["id", "Sub total", "Discount or Fee", "Tax", "Total"];
    const tableCellClassName = "p-2 border-b border-l border-blue-gray-50 bg-white";

    const handleClickEditInvoice = (invoice: InvoiceType) => {
        handleInvoiceForm(true, false, invoice, projectId);
    }

    const handleAddNewInvoice = () => {
        handleInvoiceForm(true, true, DEFAULT_INVOICE, projectId);
    }

    const handleDeleteInvoice = (invoiceId: number) => {
        handleQuestionForm(
            true,
            `You are going to delete the invoice number #${invoiceId} from project number #${projectId}`,
            () => {
                deleteInvoice(projectId, invoiceId);
            }
        );
    }

    return(
        <>
            <table className="w-11/12 min-w-max table-auto text-left my-3 mr-2">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => <TableHead variant="light" key={head} headName={head} />)}
                        <TableHead
                            size="sm"
                            variant="light"
                            headName={
                                <Button
                                    size="sm"
                                    variant="outlined"
                                    className="w-full m-0 text-center flex items-center justify-center gap-1 py-1 px-2"
                                    onClick={handleAddNewInvoice}
                                >
                                    <i className="fas fa-add" />
                                    <Typography variant="small">
                                        Add invoice
                                    </Typography>
                                </Button>
                            }
                        />
                    </tr>
                </thead>
                <tbody>
                    {invoices.length === 0 && (
                        <tr>
                            <td colSpan={5} className="border-l bg-white">
                                <Typography variant="h6" className="w-full text-center p-3">
                                    No invoices for this project
                                </Typography>
                            </td>
                            <td width={GENERAL_ACTION_COLUMN_WIDTH} className="bg-white"></td>
                        </tr>
                    )}
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <TableCell className={tableCellClassName}>{invoice.id}</TableCell>
                            <TableCell className={tableCellClassName}>$ {formatNumber(invoice.subTotal)}</TableCell>
                            <TableCell className={tableCellClassName}>$ {invoice.discountOrFee}</TableCell>
                            <TableCell className={tableCellClassName}>%{invoice.taxPercentage}</TableCell>
                            <TableCell className={tableCellClassName}>${formatNumber(invoice.total)}</TableCell>
                            <TableCell className={tableCellClassName} width={GENERAL_ACTION_COLUMN_WIDTH}>
                                <div className="flex gap-4 justify-center">
                                    <IconButton size="sm" variant="outlined" onClick={() => handleClickEditInvoice(invoice)}>
                                        <i className="fas fa-pen-to-square" />
                                    </IconButton>
                                    <IconButton size="sm" variant="outlined" onClick={() => handlePrintInvoice(invoice, projectId)}>
                                        <i className="fas fa-print" />
                                    </IconButton>
                                    <IconButton size="sm" variant="outlined" onClick={() => handleDeleteInvoice(invoice.id)}>
                                        <i className="fas fa-trash" />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default InvoicesList;
