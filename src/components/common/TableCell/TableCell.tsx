import { Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

type TableCellProps = {
    children: ReactNode;
    className: string;
}

const TableCell = ({ children, className }: TableCellProps) => (
    <td className={className}>
        <Typography variant="small" color="blue-gray" className="font-normal">
            {children}
        </Typography>
    </td>
);

export default TableCell;