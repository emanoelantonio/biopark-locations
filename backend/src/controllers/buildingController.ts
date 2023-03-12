import { Request, Response } from 'express';
import {
  createBuildingRepository,
  getBuildingByIdRepository,
  getBuildingRepository,
  updateBuildingRepository
} from '../repositories/buildingRepository';


export const createBuildingController = async (req: Request, res: Response) => {
  try {
    const building = await createBuildingRepository(req.body);
    
    return res.status(201).json(building);
  } catch (error) {
    res.status(400).send(error)
  }
};

export const getBuildingByIdController = async (req: Request, res: Response) => {
  try {
    const buildingId = await getBuildingByIdRepository(req.params.id)
    
    if (!buildingId) {
      return res.status(404).json({ message: 'Edifícil não encontrado' });
    }

    res.status(200).send(buildingId);
  } catch (error) {
    res.status(400).send(error)
  }
};

export const getAllBuildingsController = async (req: Request, res: Response) => {
  try {
    const buildings = await getBuildingRepository();
    
    res.status(200).json(buildings);
  } catch (error) {
    res.status(400).send(error)
  }
};

export const updateBuldingController = async (req: Request, res: Response) => {
  try {
    const building = await updateBuildingRepository((req.params.id), req.body)

    return res.status(200).send(building);
  } catch (error) {
    res.status(400).send(error)
  }
}