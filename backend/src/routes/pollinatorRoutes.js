import express from 'express';
import {
  getPollinatorStats,
  addPollinatorStats,
  getPollinatorHealthSummary,
  getThirdPartyPollinatorData
} from '../controllers/pollinatorController.js';

const router = express.Router();

// Specific routes must come before parameterized routes
router.get('/health-summary', getPollinatorHealthSummary);
router.post('/stats', addPollinatorStats);
router.get('/:countryCode/:regionName/external', getThirdPartyPollinatorData);
router.get('/:countryCode/:regionName', getPollinatorStats);

export default router;
