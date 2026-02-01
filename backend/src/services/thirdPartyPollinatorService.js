import axios from 'axios';

/**
 * Third-party Pollinator Data APIs Integration
 * These services provide real-world biodiversity and pollinator observation data
 */

/**
 * iNaturalist API - Community science platform
 * FREE, no API key needed
 * https://www.inaturalist.org/pages/api+reference
 */
export const getINaturalistPollinators = async (lat, lon, radius = 10) => {
  try {
    const response = await axios.get('https://api.inaturalist.org/v1/observations', {
      params: {
        iconic_taxa: 'Insecta', // Focus on insects
        lat,
        lng: lon,
        radius, // km
        per_page: 100,
        order_by: 'created_at',
        order: 'desc',
        quality_grade: 'research', // Only verified observations
        taxon_id: [630955, 47224, 47157, 47158, 81769], // Bees, butterflies, moths, beetles, flies
      },
      timeout: 15000
    });

    const observations = response.data.results.map(obs => ({
      id: obs.id,
      species: obs.taxon?.name || 'Unknown',
      commonName: obs.taxon?.preferred_common_name,
      pollinatorType: determinePollinatorType(obs.taxon?.iconic_taxon_name),
      latitude: obs.location ? parseFloat(obs.location.split(',')[0]) : null,
      longitude: obs.location ? parseFloat(obs.location.split(',')[1]) : null,
      observedAt: obs.observed_on,
      imageUrl: obs.photos[0]?.url,
      observer: obs.user?.login,
      quality: obs.quality_grade
    }));

    return {
      success: true,
      source: 'iNaturalist',
      count: observations.length,
      data: observations
    };
  } catch (error) {
    console.error('iNaturalist API Error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * GBIF API - Global Biodiversity Information Facility
 * FREE, no API key needed
 * https://www.gbif.org/developer/summary
 */
export const getGBIFPollinators = async (lat, lon, radius = 10000) => {
  try {
    // Calculate bounding box
    const latOffset = radius / 111000; // approx 111km per degree
    const lonOffset = radius / (111000 * Math.cos(lat * Math.PI / 180));
    
    const response = await axios.get('https://api.gbif.org/v1/occurrence/search', {
      params: {
        decimalLatitude: `${lat - latOffset},${lat + latOffset}`,
        decimalLongitude: `${lon - lonOffset},${lon + lonOffset}`,
        class: 'Insecta',
        basisOfRecord: 'HUMAN_OBSERVATION',
        limit: 100,
        order: 'Apiformes,Lepidoptera,Diptera,Coleoptera' // Bees, butterflies/moths, flies, beetles
      },
      timeout: 15000
    });

    const observations = response.data.results.map(obs => ({
      id: obs.key,
      species: obs.species || 'Unknown',
      scientificName: obs.scientificName,
      pollinatorType: determinePollinatorTypeFromOrder(obs.order),
      latitude: obs.decimalLatitude,
      longitude: obs.decimalLongitude,
      observedAt: obs.eventDate,
      country: obs.country,
      observer: obs.recordedBy,
      institutionCode: obs.institutionCode
    }));

    return {
      success: true,
      source: 'GBIF',
      count: observations.length,
      totalRecords: response.data.count,
      data: observations
    };
  } catch (error) {
    console.error('GBIF API Error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Aggregated Pollinator Data from Multiple Sources
 */
export const getAggregatedPollinatorData = async (lat, lon, radius = 10) => {
  try {
    // Fetch from multiple sources in parallel
    const [iNatData, gbifData] = await Promise.allSettled([
      getINaturalistPollinators(lat, lon, radius),
      getGBIFPollinators(lat, lon, radius * 1000) // Convert to meters
    ]);

    const results = {
      success: true,
      location: { lat, lon, radius },
      sources: []
    };

    if (iNatData.status === 'fulfilled' && iNatData.value.success) {
      results.sources.push(iNatData.value);
    }

    if (gbifData.status === 'fulfilled' && gbifData.value.success) {
      results.sources.push(gbifData.value);
    }

    // Calculate aggregate statistics
    const allObservations = results.sources.flatMap(s => s.data || []);
    results.statistics = calculatePollinatorStats(allObservations);

    return results;
  } catch (error) {
    console.error('Aggregated pollinator data error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Helper Functions
 */

function determinePollinatorType(iconicTaxonName) {
  const mapping = {
    'Insecta': 'other',
    'Hymenoptera': 'bee',
    'Apoidea': 'bee',
    'Lepidoptera': 'butterfly',
    'Diptera': 'fly',
    'Coleoptera': 'beetle'
  };
  return mapping[iconicTaxonName] || 'other';
}

function determinePollinatorTypeFromOrder(order) {
  const mapping = {
    'Apiformes': 'bee',
    'Hymenoptera': 'wasp',
    'Lepidoptera': 'butterfly',
    'Diptera': 'fly',
    'Coleoptera': 'beetle'
  };
  return mapping[order] || 'other';
}

function calculatePollinatorStats(observations) {
  const stats = {
    total: observations.length,
    beeCount: 0,
    butterflyCount: 0,
    mothCount: 0,
    beetleCount: 0,
    flyCount: 0,
    waspCount: 0,
    otherCount: 0
  };

  observations.forEach(obs => {
    const type = obs.pollinatorType || 'other';
    switch(type) {
      case 'bee': stats.beeCount++; break;
      case 'butterfly': stats.butterflyCount++; break;
      case 'moth': stats.mothCount++; break;
      case 'beetle': stats.beetleCount++; break;
      case 'fly': stats.flyCount++; break;
      case 'wasp': stats.waspCount++; break;
      default: stats.otherCount++; break;
    }
  });

  // Calculate diversity index (Shannon diversity)
  const types = Object.values(stats).filter((_, i) => i > 0); // Exclude total
  const total = stats.total || 1;
  stats.diversityIndex = types.reduce((sum, count) => {
    if (count === 0) return sum;
    const p = count / total;
    return sum - (p * Math.log(p));
  }, 0).toFixed(4);

  return stats;
}

export default {
  getINaturalistPollinators,
  getGBIFPollinators,
  getAggregatedPollinatorData
};
