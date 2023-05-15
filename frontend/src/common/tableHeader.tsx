import React from "react";
import { Column } from "./types";

type Props = {
  columns: Column[];
};

function TableHeader({ columns }: Props) {
  return (
    <>
      <thead>
        <tr>
          {columns.map((column) => (
            <th className="clickable" key={column.path}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

export default TableHeader;
