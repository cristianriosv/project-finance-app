import { ReactNode } from "react";
import { Typography } from "@material-tailwind/react";

type TableHeadProps = {
    headName: string | ReactNode;
    size?: 'sm' | 'md';
    variant?: 'dark' | 'light'
}

const TableHead = ({ headName, size = 'md', variant = 'dark' }: TableHeadProps) => {
    const padding = size === 'sm' ? 'p-2' : 'p-4';
    const bgColor = variant === 'dark' ? 'bg-blue-gray-50' : 'bg-white';
    return(
        <th className={`border-b border-blue-gray-100 ${bgColor} ${padding}`}>
            {typeof headName === 'string' ?
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                >
                    {headName}
                </Typography>
                :
                <>{headName}</>
            }
        </th>
    );
}

export default TableHead;
