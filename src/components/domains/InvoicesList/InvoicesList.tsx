import { useContext } from "react";
import { IconButton } from "@material-tailwind/react";
import TableCell from "../../common/TableCell/TableCell";
import TableHead from "../../common/TableHead/TableHead";
import { ProjectsContext } from "../../../store/ProjectsProvider";

type InvoicesListProps = {
    invoices: InvoiceProps[];
    projectId: number;
}

const InvoicesList = ({ invoices, projectId }: InvoicesListProps) => {
    const { handleInvoiceForm } = useContext(ProjectsContext);
    const TABLE_HEAD = ["Invoices", "id", "Sub total", "Discount or Fee", "Tax", "Total", ""];
    const tableCellClassName = "p-4 border-b border-blue-gray-50";

    const handleClickEditInvoice = (invoice: InvoiceProps) => {
        handleInvoiceForm(true, false, invoice, projectId);
    }

    return(
        <>
            {invoices.length ?
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => <TableHead key={head} headName={head} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <TableCell>{}</TableCell>
                                <TableCell className={tableCellClassName}>{invoice.id}</TableCell>
                                <TableCell className={tableCellClassName}>$ {invoice.subTotal}</TableCell>
                                <TableCell className={tableCellClassName}>$ {invoice.discountOrFee}</TableCell>
                                <TableCell className={tableCellClassName}>%{invoice.taxPercentage}</TableCell>
                                <TableCell className={tableCellClassName}>${invoice.total}</TableCell>
                                <TableCell className={tableCellClassName}>
                                    <div className="flex gap-4">
                                        <IconButton size="sm" variant="outlined" onClick={() => handleClickEditInvoice(invoice)}>
                                            <i className="fas fa-pen-to-square" />
                                        </IconButton>
                                        <IconButton size="sm" variant="outlined">
                                            <i className="fas fa-print" />
                                        </IconButton>
                                        <IconButton size="sm" variant="outlined">
                                            <i className="fas fa-trash" />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <>No invoices</>
            }
        </>
    );
}

export default InvoicesList;
