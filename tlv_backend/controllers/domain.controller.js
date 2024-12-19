import { NotFoundError, asyncHandler } from '../middleware/errorHandler.js';
import { getDomainData } from '../repository/domain.repository.js';
import logger from '../services/logger.service.js';

export const getDomainInfo = asyncHandler(async (req, res) => {
    const { domainName, type } = req.params;
    
    logger.info('Fetching domain info', { domainName, type });
    
    const data = await getDomainData(domainName, type);
    
    if (!data) {
      throw new NotFoundError('Domain information');
    }
  
    // Log successful response
    logger.info('Domain info retrieved successfully', { 
      domainName, 
      type,
      responseSize: JSON.stringify(data).length 
    });
  
    return res.status(200).json({
      status: 'success',
      data
    });
  });