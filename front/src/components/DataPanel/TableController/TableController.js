import { useEffect, useState } from 'react'
import TableComponent from './TableComponent'

const TableController = ({ labelMap = {}, unitMap = {}, tableData = [] }) => {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (tableData.length > 0) {
      let [first] = tableData
      let columnData = Object.keys(first).slice(1)

      if (labelMap) {
        columnData = columnData.map((v) => {
          let label = labelMap[v] || v

          if (Object.keys(unitMap).includes(v)) {
            label += ` (${unitMap[v]})`
          }

          return label
        })
      }

      let rowData = tableData.map((entry) => Object.values(entry).slice(1))
      setColumns(columnData)
      setRows(rowData)
    }
  }, [tableData, labelMap, unitMap])

  return <TableComponent columns={columns} rows={rows} />
}

export default TableController
