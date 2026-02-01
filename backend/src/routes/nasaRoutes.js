import express from 'express';
import {
  getRegionImagery,
  getRegionVegetationIndex
} from '../controllers/nasaController.js';

const router = express.Router();

router.get('/:countryCode/:regionName/imagery', getRegionImagery);
router.get('/:countryCode/:regionName/vegetation-index', getRegionVegetationIndex);

export default router;
