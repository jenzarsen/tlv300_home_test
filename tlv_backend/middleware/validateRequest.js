import { ValidationError } from '../middleware/errorHandler.js';

export const validateDomainRequest = (req, res, next) => {
  try {
    const { domainName, type } = req.params;
    
    // Domain name validation
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domainName)) {
      throw new ValidationError('Invalid domain name format');
    }

    // Type validation
    const validTypes = ['domain', 'contact'];
    if (!validTypes.includes(type)) {
      throw new ValidationError('Invalid type. Must be either "domain" or "contact"');
    }

    next();
  } catch (error) {
    next(error);
  }
};