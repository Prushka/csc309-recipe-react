import * as React from 'react';
import '../styles/Grid.css';
import GridRow from "./GridRow";

export default function Grid({tableData, onClickHandler, excludeHeader = []}) {
    const headers = []
    tableData.forEach((item) => {
        if (Object.keys(item).length > headers.length) {
            headers.length = 0
            for (let key in item) {
                if (!excludeHeader.includes(key)) {
                    headers.push(key)
                }
            }
        }
    })
    return (
        <table>
            <tbody>
            <GridRow key={-1} rowId={-1} headers={headers} values={headers} isHeader={true}
                     onClickHandler={onClickHandler}/>
            {tableData.map(value => {
                const rowValues = []
                headers.forEach((item) => {
                    if (value[item]) {
                        rowValues.push(value[item])
                    } else {
                        rowValues.push("")
                    }
                })
                return <GridRow key={value["rowId"]} rowId={value["rowId"]} values={rowValues}
                                headers={headers}
                                onClickHandler={onClickHandler}/>
            })}
            </tbody>
        </table>
    );
}