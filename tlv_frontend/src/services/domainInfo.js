import whoIsApi from '../data/configs/whoIsApi';

export const getDomainInfo = async (domainName, type) => {
  try {
    const response = await whoIsApi.get(`/whoisserver/${domainName}/${type}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch domain info');
  }
};
