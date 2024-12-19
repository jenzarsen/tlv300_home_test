import { ApiError } from '../middleware/errorHandler.js';
import { getDomainData } from '../repository/domain.repository.js';
import logger from '../services/logger.service.js';

export const getDomainInfo = async (req, res, next) => {
    try {
        const { domainName, type } = req.params;

        // Validate domain name
        if (!domainName) {
            throw new ApiError(400, 'Domain name is required');
        }

        // Validate type parameter
        if (!['domain', 'contact'].includes(type)) {
            throw new ApiError(400, 'Invalid type parameter. Must be either "domain" or "contact"');
        }
        // Fetch from API
        const data = await getDomainData(domainName, type);

        return res.status(200).json({
            status: 'success',
            data
        });

    } catch (error) {
        logger.error(`Error fetching domain info: ${error.message}`);
        next(error);
    }
};
