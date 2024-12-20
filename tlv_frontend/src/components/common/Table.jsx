import React from "react";
import TableHeader from "./TableHeader.jsx";
import TableRow from "./TableRow.jsx";
import styles from "./Table.module.css";

const Table = ({ headers, data }) => {
  return (
    <table className={styles.table}>
      <thead>
        {headers?.map((entry, index) => {
          return <TableHeader key={index} header={entry} />;
        })}
      </thead>

      <tbody>
        <TableRow rowEntries={data} />
      </tbody>
    </table>
  );
};

export default Table;
