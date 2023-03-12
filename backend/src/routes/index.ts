import express from 'express';
import {
  createApartmentController,
  getAllApartmentController,
  getApartmentByIdController,
  getAvailableApartmentsController,
  rentApartmentController,
  renterApartmentController,
  updateApartmentController
} from '../controllers/apartmentController';
import {
  createBuildingController,
  getAllBuildingsController,
  getBuildingByIdController,
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


// Rotas para os apartamentos
router.post('/apartments', createApartmentController);
router.get('/apartments', getAllApartmentController);
router.get('/apartments/:id', getApartmentByIdController);
router.put('/apartments/:id', updateApartmentController);
router.get('/apartments/available/:buildingId', getAvailableApartmentsController);
router.get('/apartments/rented', renterApartmentController);
router.post('/apartments/rent', rentApartmentController)

// Rotas para os locatários
router.post('/renters', createRenterController);
router.get('/renters', getAllRentersController)
router.get('/renters/:id', getRenterByIdController);
router.put('/renters/:id', updateRenterController);
router.delete('/renters/:id', removeRenterController);

export default router;