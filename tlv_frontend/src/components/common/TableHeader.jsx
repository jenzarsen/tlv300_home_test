import React from "react";
import styles from "./TableHeader.module.css";

const TableHeader = ({ header }) => {
  return <th className={styles.th}>{header}</th>;
};

export default TableHeader;
