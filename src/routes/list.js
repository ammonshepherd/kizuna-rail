import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion, getRoutesBySeason } from '../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();

    // Get the sort by region
    const regionSort = req.query.region || '';
    // Create an empty array;
    let regionRoutes = [];
    // If there is a sort region, get only routes of that region, otherwise, get all of the routes.
    if (regionSort != ''){
        regionRoutes = await getRoutesByRegion(regionSort);
    } else {
        regionRoutes = await getAllRoutes();
    }

    // Get the sort by season
    const seasonSort = req.query.season || '';
    // Create an empty array
    let seasonRoutes = [];
    // If there is a sort season, get only routes in that season, otherwise return all routes.
    if (seasonSort != ''){
        seasonRoutes = await getRoutesBySeason(seasonSort);
    } else {
        seasonRoutes = await getAllRoutes();
    }

    // Compare the seasonRoutes and regionRoutes and return only the routes that are the same in both routes. Comparison can be done by using the key named id.
    let regionIds = new Set(regionRoutes.map(o => o['id']));
    let routes = seasonRoutes.filter(o => regionIds.has(o['id']));

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};