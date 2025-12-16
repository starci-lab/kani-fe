import {
    Table, 
    TableProps, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell
} from "@heroui/react"
import React, { forwardRef } from "react"

export const KaniTable = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
    return <Table {...props} ref={ref} />
})
KaniTable.displayName = "KaniTable"

export const KaniTableHeader = TableHeader
export const KaniTableColumn = TableColumn
export const KaniTableBody = TableBody
export const KaniTableRow = TableRow
export const KaniTableCell = TableCell