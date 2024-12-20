import React, { useState } from "react";
import styles from "./DomainLookup.module.css";
import { useGetDomainInfo } from "data/hooks/useGetDomainInfo.js";
import DomainInfo from "./DomainInfo";
import {sampleDomainInfo} from "context/sampleDomainInfo.js";

const DomainLookup = () => {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("domain");

  const [submittedDomain, setSubmittedDomain] = useState("");
  const [submittedType, setSubmittedType] = useState("domain");

  const [loading, setLoading] = useState(false);

  //const { info } = useGetDomainInfo(submittedDomain, submittedType);
  
  const [info,setInfo] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setSubmittedDomain(domain);
    //setSubmittedType(type);
    //setLoading(true);
    setInfo(sampleDomainInfo);
    console.log(sampleDomainInfo, type);
  };

  const renderContactInfo = () => {
    if (!info) return null;
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
            <td>{info.registrantName}</td>
          </tr>
          <tr>
            <td>{info.technicalContactName}</td>
          </tr>
          <tr>
            <td>{info.administrativeContactName}</td>
          </tr>
          <tr>
            <td>{info.contactEmail}</td>
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

      {/*{error && <p>{error}</p>} */}

      {info && (
        <div className={styles.container+' '+styles.fadeIn}>
          {type === "domain" ? <DomainInfo domainInfo = {info} />: renderContactInfo()}
        </div>
      )}
    </div>
  );
};

export default DomainLookup;
