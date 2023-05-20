import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Column } from "./types";

type Props = {
  columns: Column[];
  data: any[];
};

function Table({ columns, data }: Props) {
  return (
    <div className="table-responsive">
      <table className="table">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
      </table>
    </div>
  );
}

export default Table;
