import express from 'express';
import {
  getRegionWeather,
  getRegionForecast,
  getRegionAirQuality
} from '../controllers/weatherController.js';

const router = express.Router();

router.get('/:countryCode/:regionName/current', getRegionWeather);
router.get('/:countryCode/:regionName/forecast', getRegionForecast);
router.get('/:countryCode/:regionName/air-quality', getRegionAirQuality);

export default router;
