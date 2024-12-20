import React from "react";
import styles from "./App.module.css";
import DomainLookup from "./components/domain/DomainLookup";

function App() {
  return (
    <div className={styles.container}>
        <DomainLookup />  
    </div>
  );
}

export default App;
