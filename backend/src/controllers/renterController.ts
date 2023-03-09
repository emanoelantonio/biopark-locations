import { Request, Response } from 'express';
import {
  createRenterRepository,
  getRenterByIdRepository,
  getRentersRepository,
  removeRenterRepository,
  updateRenterRepository
} from '../repositories/renterRepository';


export const createRenterController = async (req: Request, res: Response) => {
  try {
    const renter = await createRenterRepository(req.body);
  
    return res.status(201).json(renter);
  } catch (error) {
    res.status(400).send(error)
  }
};

export const getAllRentersController = async (req: Request, res: Response) => {
  try {
    const renters = await getRentersRepository();
    
    res.status(200).json(renters);
  } catch (error) {
    res.status(400).send(error)
  }
}

export const getRenterByIdController = async (req: Request, res: Response) => {
  try {
    const renterId = await getRenterByIdRepository(req.params.id);
    
    if (!renterId) {
      return res.status(404).json({ message: 'Locatário não encontrado' });
    }

    res.status(200).send(renterId)
  } catch (error) {
    res.status(400).send(error)
  }
  
};

export const updateRenterController = async (req: Request, res: Response) => {
  try {
    const renter = await updateRenterRepository((req.params.id), req.body);
    
    return res.status(200).json(renter);
  } catch (error) {
    res.status(400).send(error)
  }
}

export const removeRenterController = async (req: Request, res: Response) => {
  try {
    await removeRenterRepository((req.params.id))

    res.status(200).send({message: "Renter removed!"})
  } catch (error) {
    res.status(400).send(error)
  }
}