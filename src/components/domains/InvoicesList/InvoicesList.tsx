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
    const { handleInvoiceForm, handleQuestionForm } = useContext(ProjectsContext);
    const { deleteInvoice } = useInvoices();
    const TABLE_HEAD = ["id", "Sub total", "Discount or Fee", "Tax", "Total"];
    const tableCellClassName = "p-4 border-t border-blue-gray-50";

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
            <table className="w-11/12 min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => <TableHead key={head} headName={head} />)}
                        <TableHead
                            headName={
                                <Button
                                    size="sm"
                                    variant="outlined"
                                    className="w-full m-0 text-center flex items-center gap-1"
                                    onClick={handleAddNewInvoice}
                                >
                                    <i className="fas fa-add" />
                                    <Typography variant="small">
                                        Add new invoice
                                    </Typography>
                                </Button>
                            }
                        />
                    </tr>
                </thead>
                <tbody>
                    {invoices.length === 0 && (
                        <tr>
                            <td colSpan={7}>
                                <Typography variant="h6" className="w-full text-center">
                                    No invoices for project
                                </Typography>
                            </td>
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
                                <div className="flex gap-4">
                                    <IconButton size="sm" variant="outlined" onClick={() => handleClickEditInvoice(invoice)}>
                                        <i className="fas fa-pen-to-square" />
                                    </IconButton>
                                    <IconButton size="sm" variant="outlined">
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
