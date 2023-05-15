import React from "react";
import _ from "lodash";
import { Column } from "./types";

type Props = {
  data: any[];
  columns: Column[];
};

function TableBody({ data, columns }: Props) {
  const renderCell = (item: any, column: Column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path || "");
  };

  const createKey = (item: any, column: Column) => {
    return item._id + (column.path || "");
  };
  return (
    <>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default TableBody;
