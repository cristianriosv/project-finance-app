import { ReactNode } from "react";
import { Typography } from "@material-tailwind/react";

type TableHeadProps = {
    headName: string | ReactNode;
}

const TableHead = ({ headName }: TableHeadProps) => (
    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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

export default TableHead;
