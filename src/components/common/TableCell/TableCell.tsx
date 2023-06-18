import { Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

type TableCellProps = {
    children: ReactNode | string;
    className?: string;
}

const TableCell = ({ children, className }: TableCellProps) => (
    <td className={className}>
        {typeof children === 'string' ?
            <Typography variant="small" color="blue-gray" className="font-normal">
                {children}
            </Typography>
            :
            <>{children}</>
        }
    </td>
);

export default TableCell;