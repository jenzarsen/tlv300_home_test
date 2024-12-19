import whoIsApi from "../data/configs/whoIsApi.js";
import { ApiServiceError } from "../middleware/errorHandler.js";
import logger from "../services/logger.service.js";
import { config } from "../data/configs/index.js";

export const getDomainData = async (domain, type) => {
  try {
    const params = {
      apiKey: config.api.key,
      domainName: domain,
      outputFormat: "JSON",
      ignoreRawTexts: 1,
    };

    const result = await whoIsApi.get(`/WhoisService?`, { params });
    if (type === "domain") {
      return extractDomainInfo(result?.data);
    } else if (type === "contact") {
      return extractContactInfo(result?.data);
    }
    return [];
  } catch (error) {
    logger.error(`Error in domain repository: ${error.message}`);

    if (error instanceof ApiServiceError) {
      throw error;
    }

    throw new ApiServiceError(
      error.response?.status || 500,
      error.message || `Failed to fetch ${type} information`
    );
  }

  function extractDomainInfo(data) {
    const {
      domainName: domain,
      registrarName: registrar,
      createdDate,
      expiresDate,
      estimatedDomainAge: age,
      nameServers: { hostNames: hosts },
    } = data.WhoisRecord;

    if (hosts.length > 25) {
      hosts = hosts.splice(25);
    }

    return {
      domainName: domain || "undefined",
      registrarName: registrar || "undefined",
      registrationDate: createdDate || "undefined",
      expirationDate: expiresDate || "undefined",
      estimatedDomainAge: age || "undefined",
      hostNames: hosts || "undefined",
    };
  }

  function extractContactInfo(data) {
    const {
      registrant: { name: registrant },
      technicalContact: { name: technicalContact },
      administrativeContact: { name: administrativeContact },
      contactEmail: email,
    } = data.WhoisRecord;

    console.log(data.WhoisRecord);
    return {
      registrantName: registrant || "undefined",
      technicalContactName: technicalContact || "undefined",
      administrativeContactName: administrativeContact || "undefined",
      contactEmail: email || "undefined",
    };
  }
};
