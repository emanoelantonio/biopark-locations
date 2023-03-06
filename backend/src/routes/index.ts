import express from 'express';
import { createApartment, getAvailableApartments, renterApartment } from '../controllers/apartmentController';
import { createBuilding, getAllBuildings, getBuildingById } from '../controllers/buildingController';
import { createRenter, getRenterById } from '../controllers/renterController';

const router = express.Router();

// Rotas para os prédios
router.post('/buildings', createBuilding);
router.get('/buildings/:id', getBuildingById);
router.get('/buildings', getAllBuildings);

// Rotas para os apartamentos
router.post('/apartments', createApartment);
router.get('/apartments/available/:buildingId', getAvailableApartments);
router.post('/apartments/rent', renterApartment);

// Rotas para os locatários
router.post('/renters', createRenter);
router.get('/renters/:id', getRenterById);

export default router;