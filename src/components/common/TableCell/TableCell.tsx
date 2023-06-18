import { Typography } from "@material-tailwind/react";
import { ReactNode } from "react";

type TableCellProps = {
    children: ReactNode | string;
    className?: string;
    width?: number | string;
}

const TableCell = ({ children, className, width }: TableCellProps) => (
    <td className={className} width={width}>
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