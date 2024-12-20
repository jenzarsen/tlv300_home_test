import React from "react";
import styles from "./App.module.css";
import DomainLookup from "components/domain/DomainLookup";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Domain Information Lookup</h1>
      </header>
      <main className={styles.main}>
        <DomainLookup />
      </main>
    </div>
  );
}

export default App;
