import { Accordion, AccordionBody } from "@material-tailwind/react";
import TableCell from "../../common/TableCell";
import InvoicesList from "../InvoicesList/InvoicesList";

type ProjectTableRowProps = Pick<ProjectType, 'id' | 'client' | 'title' | 'total' | 'invoices'> & {
    handleOpen: (id: number) => void;
    isOpened: boolean;
    isLast: boolean;
}

const ProjectTableRow = ({
    id,
    client,
    title,
    total,
    isLast,
    isOpened,
    handleOpen,
    invoices
}: ProjectTableRowProps) => {
    const className = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    const iconOpenStyle = `rotate(${isOpened ? 180 : 0}deg)`;
    return (
        <>
            <tr key={id} onClick={() => handleOpen(id)}>
                <TableCell className={className}>
                    {id}
                </TableCell>
                <TableCell className={className}>
                    {client}
                </TableCell>
                <TableCell className={className}>
                    {title}
                </TableCell>
                <TableCell className={className}>
                    $ {total}
                </TableCell>
                <TableCell className={className}>
                    <i className="fas fa-chevron-up" style={{ transform: iconOpenStyle }} />
                </TableCell>
            </tr>
            <tr>
                <td colSpan={6}>
                    <Accordion open={isOpened}>
                        <AccordionBody className="py-0 flex justify-end">
                            <InvoicesList invoices={invoices} projectId={id} />
                        </AccordionBody>
                    </Accordion>
                </td>
            </tr>
        </>
    )
};

export default ProjectTableRow;
