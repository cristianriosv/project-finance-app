import { Typography } from "@material-tailwind/react";

type TableHeadProps = {
    headName: string;
}

const TableHead = ({ headName }: TableHeadProps) => (
    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
        <Typography
            variant="small"
            color="blue-gray"
            className="font-normal leading-none opacity-70"
        >
            {headName}
        </Typography>
    </th>
);

export default TableHead;
