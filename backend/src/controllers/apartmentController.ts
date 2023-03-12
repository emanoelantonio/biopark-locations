import { Request, Response } from 'express';
import {
  createApartmentRepository,
  findRentedApartmentsRepository,
  getApartmentByIdRepository,
  getApartmentRepository,
  getAvailableApartmentsRepository,
  rentApartmentRepository,
  updateApartmentRepository
} from '../repositories/apartmentRepository';


export const createApartmentController = async (req: Request, res: Response) => {
  try {
    const newApartment = await createApartmentRepository(req.body);

    return res.status(201).json(newApartment);
  } catch (error) {
    res.status(400).send(error)
  }
};

export const getAllApartmentController = async (req: Request, res: Response) => {
  try {
    const apartments = await getApartmentRepository();

    res.status(200).json(apartments);
  } catch (error) {
    res.status(400).send({ message: 'Error list apartments', error });
  }
};

export const getApartmentByIdController = async (req: Request, res: Response) => {
  try {
    const apartmentId = await getApartmentByIdRepository(req.params.id)

    res.status(200).send(apartmentId);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Apartment not found') {
      res.status(404).send({ message: 'Apartment not found' });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
}

export const getAvailableApartmentsController = async (req: Request, res: Response) => {
  try {
    const avaliableApartments = await getAvailableApartmentsRepository(req.params.buildingId)

    return res.status(200).json(avaliableApartments);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: 'Error getting available apartments' });
  }
};

export const renterApartmentController = async (req: Request, res: Response) => {
  try {
    const rentedApartment = await findRentedApartmentsRepository();

    return res.status(200).json(rentedApartment);
  } catch (error) {
    return res.status(500).json({ message: 'Error renting apartment', error });
  }
};

export const rentApartmentController = async (req: Request, res: Response) => {
  try {
    const { apartmentId, renterId } = req.body;
    await rentApartmentRepository(apartmentId, renterId);
    return res.status(200).json({ message: 'Apartment rented successfully' });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: 'Error renting apartment' });
  }
}

export const updateApartmentController = async (req: Request, res: Response) => {
  try {
    const updateApartment = await updateApartmentRepository((req.params.id), req.body);

    return res.status(200).send(updateApartment);
  } catch (error) {
    res.status(400).send(error)
  }
}