import {TableComponent} from "../table/tableComponent.tsx";
import {makeDataRows} from "../dataExample/makeDataRows.ts";
import {makeColumns, makeData} from "../dataExample/makeDataColumns.ts";
import data from '../dataExample/basicData.json'
import {useMemo} from "react";

function App() {

    //const dataRows = makeDataRows(500)

    const firstRow = Array.isArray(data) && data.length > 0 ? data[0] : undefined;
    const columns = useMemo(
        () => makeColumns(100),
        [],
    )

    return (
        <>
            <TableComponent data={data} dataColumns={firstRow}/>
        </>
    )
}

export default App
