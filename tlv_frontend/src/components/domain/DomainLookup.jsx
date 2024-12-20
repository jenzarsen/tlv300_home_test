import React, { useState } from "react";
import styles from "./DomainLookup.module.css";
import { useGetDomainInfo } from "data/hooks/useGetDomainInfo.js";
import DomainInfo from "./DomainInfo";
import ContactInfo from "./ContactInfo";

const DomainLookup = () => {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("domain");

  const [submittedDomain, setSubmittedDomain] = useState("");
  const [submittedType, setSubmittedType] = useState("domain");

  const [loading, setLoading] = useState(false);

  const { info } = useGetDomainInfo(submittedDomain, submittedType);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedDomain(domain);
    setSubmittedType(type);
    setLoading(true);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain name (e.g., example.com)"
          required
        />

        <select
          className={styles.select}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="domain">Domain Information</option>
          <option value="contact">Contact Information</option>
        </select>

        <button
          className={styles.button}
          type="submit"
          disabled={loading || !domain}
        >
          {loading ? "Loading..." : "Lookup Domain"}
        </button>
      </form>
      
      {info && (
        <div className={styles.container + " " + styles.fadeIn}>
          {type === "domain" ? (
            <DomainInfo domainInfo={info} />
          ) : (
            <ContactInfo contactInfo={info} />
          )}
        </div>
      )}
    </div>
  );
};

export default DomainLookup;
