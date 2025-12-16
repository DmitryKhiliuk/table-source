import {createColumnHelper} from "@tanstack/react-table";

export const useCreateColumns = (data?: Record<string, any>) => {

    const columnHelper = createColumnHelper<Record<string, any>>()

    // Приведение данных к нужному виду

    const keys = data && typeof data === 'object' ? Object.keys(data) : [];

    // Дефолтные столбцы, где key -> id, header -> name
    return keys.map((key) =>
        columnHelper.accessor(key, {
            header: key,
            cell: (info) => info.getValue(),
        })
    );

};
