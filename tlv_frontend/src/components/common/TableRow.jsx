import React from "react";
import styles from "./TableRow.module.css";

const TableRow = ({ rowEntries }) => {
  return (
    <tr className={styles.tr}>
      {rowEntries?.map((data, index) => {
        if (Array.isArray(data)) {
          return (
            <td className={styles.td}>
              {data?.map((arrayData, index) => {
                if(arrayData.length > 25){
                    arrayData = arrayData.substring(0,25) + '...' + (index + 1 === data.length? '':',');
                }
                return ( <div> {arrayData}</div>);
              })}
            </td>
          );
        } else {
          return <td className={styles.td}>{data}</td>;
        }
      })}
    </tr>
  );
};

export default TableRow;
