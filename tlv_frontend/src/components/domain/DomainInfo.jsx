import React from "react";
import Table from "components/common/Table";

const DomainInfo = (props) => {
  if (!props.domainInfo) return null;

  const tableHeaders = [
    "Domain Name",
    "Registrar",
    "Registration Date",
    "Expiration Date",
    "Estimated Domain Age",
    "Hostnames",
  ];

  const {
    domainName,
    registrantName,
    registrationDate,
    expirationDate,
    estimatedDomainAge,
    hostNames,
  } = props.domainInfo;

  return (
    <Table
      headers={tableHeaders}
      data={[
        domainName,
        registrationDate,
        expirationDate,
        estimatedDomainAge,
        hostNames,
      ]}
    />
  );
};

export default DomainInfo;
