import { Accordion, AccordionBody, Button, Typography } from "@material-tailwind/react";
import TableCell from "../../common/TableCell";
import InvoicesList from "../InvoicesList/InvoicesList";
import { GENERAL_ACTION_COLUMN_WIDTH } from "../../../constants/tables";

type ProjectTableRowProps = Pick<ProjectType, 'id' | 'client' | 'title' | 'total' | 'invoices'> & {
    handleOpen: (id: number) => void;
    isOpened: boolean;
}

const ProjectTableRow = ({
    id,
    client,
    title,
    total,
    isOpened,
    handleOpen,
    invoices
}: ProjectTableRowProps) => {
    const className = "p-4 border-t border-b border-blue-gray-50";
    const iconOpenStyle = `rotate(${isOpened ? 0 : 180}deg)`;
    return (
        <>
            <tr key={id} onClick={() => handleOpen(id)} className="cursor-pointer">
                <TableCell className={className}>
                    {id}
                </TableCell>
                <TableCell className={className}>
                    {title}
                </TableCell>
                <TableCell className={className}>
                    {client}
                </TableCell>
                <TableCell className={className} width={150}>
                    $ {total}
                </TableCell>
                <TableCell className={className} width={GENERAL_ACTION_COLUMN_WIDTH}>
                    <Button
                        size="sm"
                        variant="text"
                        className="w-full m-0 text-center flex items-center justify-center gap-1 py-1 px-2"
                    >
                        <i className="fas fa-chevron-up" style={{ transform: iconOpenStyle }} />
                        <Typography variant="small">
                            {isOpened ? 'Hide' : 'View invoices'}
                        </Typography>
                    </Button>
                </TableCell>
            </tr>
            <tr>
                <td colSpan={6}>
                    <Accordion open={isOpened}>
                        <AccordionBody className="py-0 flex justify-end bg-gray-100">
                            <InvoicesList invoices={invoices} projectId={id} />
                        </AccordionBody>
                    </Accordion>
                </td>
            </tr>
        </>
    )
};

export default ProjectTableRow;
