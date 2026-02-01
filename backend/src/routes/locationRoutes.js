import express from 'express';
import {
  getAllCountries,
  getCountryByCode,
  getRegionsByCountry,
  addCountry,
  addRegion
} from '../controllers/locationController.js';
import { 
  validateRequired, 
  validateCoordinates,
  sanitizeInput
} from '../middleware/validation.js';

const router = express.Router();

// Apply sanitization to all routes
router.use(sanitizeInput);

// Country routes
router.get('/countries', getAllCountries);
router.get('/countries/:code', getCountryByCode);
router.post('/countries', 
  validateRequired(['code', 'name']),
  validateCoordinates,
  addCountry
);

// Region routes
router.get('/countries/:code/regions', getRegionsByCountry);
router.post('/regions', 
  validateRequired(['countryCode', 'name']),
  validateCoordinates,
  addRegion
);

export default router;
