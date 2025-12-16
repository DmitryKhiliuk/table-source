import {createColumnHelper} from "@tanstack/react-table";

export const useCreateColumns = ({data}: {data: { [key: string]: string }}) => {

    const columnHelper = createColumnHelper<{ [key: string]: string }>()

    return Object.keys(data).map((key) =>
        columnHelper.accessor(key, {
            header: key,
            cell: (info) => info.getValue(),
        })
    );

    /*return [
        columnHelper.accessor('firstName', {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.lastName, {
            id: 'lastName',
            cell: (info) => <i>{info.getValue()}</i>,
            header: () => <span>Last Name</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('age', {
            header: () => 'Age',
            cell: (info) => info.renderValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('visits', {
            header: () => <span>Visits</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('progress', {
            header: 'Profile Progress',
            footer: (info) => info.column.id,
        }),
    ]*/

};

