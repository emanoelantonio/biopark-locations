import express from 'express';
import {
  createApartment,
  getAvailableApartments,
  renterApartment
} from '../controllers/apartmentController';
import {
  createBuildingController,
  getAllBuildingsController,
  getBuildingByIdController,
  removeBuildingController,
  updateBuldingController
} from '../controllers/buildingController';
import {
  createRenterController,
  getAllRentersController,
  getRenterByIdController,
  removeRenterController,
  updateRenterController
} from '../controllers/renterController';


const router = express.Router();

// Rotas para os prédios
router.post('/buildings', createBuildingController);
router.get('/buildings/:id', getBuildingByIdController);
router.get('/buildings', getAllBuildingsController);
router.put('/buildings/:id', updateBuldingController);
router.delete('/buildings/:id', removeBuildingController);

// Rotas para os apartamentos
router.post('/apartments', createApartment);
router.get('/apartments/available/:buildingId', getAvailableApartments);
router.post('/apartments/rent', renterApartment);

// Rotas para os locatários
router.post('/renters', createRenterController);
router.get('/renters', getAllRentersController)
router.get('/renters/:id', getRenterByIdController);
router.put('/renters/:id', updateRenterController);
router.delete('/renters/:id', removeRenterController);

export default router;