import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
  timeout: 5000,
});

export const getDomainInfo = async (domainName, type) => {
  try {
    const response = await api.get(`/domain/${domainName}/${type}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch domain info');
  }
};
