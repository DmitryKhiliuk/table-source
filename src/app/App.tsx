import {TableComponent} from "../table/tableComponent.tsx";
import data from '../dataExample/basicData.json'

function App() {

    const firstRow = Array.isArray(data) && data.length > 0 ? data[0] : undefined;

    return (
        <>
            <TableComponent data={data} dataColumns={firstRow}/>
        </>
    )
}

export default App
