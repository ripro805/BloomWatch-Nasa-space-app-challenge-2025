import express from 'express';
import {
  getAllObservations,
  getObservationById,
  createObservation,
  getObservationsStats
} from '../controllers/observationController.js';
import { optionalAuth } from '../middleware/auth.js';
import { 
  validateRequired, 
  validateDate, 
  validateCoordinates,
  validateZone,
  sanitizeInput
} from '../middleware/validation.js';

const router = express.Router();

// Apply sanitization to all routes
router.use(sanitizeInput);

router.get('/', getAllObservations);
router.get('/stats', getObservationsStats);
router.get('/:id', getObservationById);
router.post('/', 
  optionalAuth, 
  validateRequired(['countryCode', 'regionName', 'cropName', 'pollinatorCount', 'observationDate']),
  validateDate('observationDate'),
  validateCoordinates,
  validateZone,
  createObservation
);

export default router;
