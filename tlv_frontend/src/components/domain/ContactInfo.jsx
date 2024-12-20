import React from "react";
import Table from "components/common/Table";

const ContactInfo = (props) => {
  if (!props.contactInfo) return null;

  const tableHeaders = [
    "Registrant Name",
    "Technical Contact Name",
    "Administrative Contact Name",
    "Contact Email",
  ];

  const {
    registrantName,
    technicalContactName,
    administrativeContactName,
    contactEmail,
  } = props.contactInfo;

  return (
    <Table
      headers={tableHeaders}
      data={[
        registrantName,
        technicalContactName,
        administrativeContactName,
        contactEmail,
      ]}
    />
  );
};

export default DomainInfo;
