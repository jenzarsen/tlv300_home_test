import React, { useState } from "react";
import styles from "./DomainLookup.module.css";
import { useGetDomainInfo } from "data/hooks/useGetDomainInfo.js";
import DomainInfo from "./DomainInfo";
import ContactInfo from "./ContactInfo";
import ErrorMessage from "components/common/ErrorMessage";
import LoadingSpinner from "components/common/LoadingSpinner";
import { validateDomain } from "utils/validation.js";

const DomainLookup = () => {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("domain");

  const [submittedDomain, setSubmittedDomain] = useState("");
  const [submittedType, setSubmittedType] = useState("domain");

  const { info, isLoading } = useGetDomainInfo(submittedDomain, submittedType);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDomain(domain)) {
      setError("Please enter a valid domain name (e.g., google.com).");
      return;
    }

    setSubmittedDomain(domain);
    setSubmittedType(type);
    setError(null);
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
          disabled={isLoading || !domain}
        >
          {isLoading ? "Loading..." : "Lookup Domain"}
        </button>
      </form>

      {error && <ErrorMessage message={error} />}
      {isLoading && <LoadingSpinner />}

      {!error && !isLoading && info && (
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
