import React, { useState } from "react";
import styles from "./DomainLookup.module.css";

const DomainLookup = () => {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("domain");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/v1/domain/${domain}/${type}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch domain information: ${response.statusText}`
        );
      }
      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderDomainInfo = () => {
    if (!data) return null;
    return (
      <table>
        <thead>
          <th>Domain Name</th>
          <th>Registrar</th>
          <th>Registration Date</th>
          <th>Expiration Date</th>
          <th>Domain Age</th>
        </thead>

        <tbody>
          <tr>
            <td>{data.domainName}</td>
          </tr>
          <tr>
            <td>{data.registrarName}</td>
          </tr>
          <tr>
            <td>{data.registrationDate}</td>
          </tr>
          <tr>
            <td>{data.expirationDate}</td>
          </tr>
          <tr>
            <td>{data.estimatedDomainAge} days</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderContactInfo = () => {
    if (!data) return null;
    return (
      <table>
        <thead>
          <th>Registrant Name</th>
          <th>Technical Contact</th>
          <th>Administrative Contact</th>
          <th>Contact Email</th>
        </thead>
        <tbody>
          <tr>
            <td>{data.registrantName}</td>
          </tr>
          <tr>
            <td>{data.technicalContactName}</td>
          </tr>
          <tr>
            <td>{data.administrativeContactName}</td>
          </tr>
          <tr>
            <td>{data.contactEmail}</td>
          </tr>
        </tbody>
      </table>
    );
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

        <select className={styles.select} value={type} onChange={(e) => setType(e.target.value)}>
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

      {error && <p>{error}</p>}

      {data && (
        <div>
          {type === "domain" ? renderDomainInfo() : renderContactInfo()}
        </div>
      )}
    </div>
  );
};

export default DomainLookup;
