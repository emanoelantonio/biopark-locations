import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient()

export const createBuilding = async (req: Request, res: Response) => {
  const { name, address, apartments } = req.body;

  const building = await prisma.building.create({
    data: {
      name,
      address,
      apartments: {
        create: apartments
      }
    },
  });

  res.json(building);
};

export const getBuildingById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const building = await prisma.building.findUnique({
    where: { id: Number(id) },
    include: { apartments: true },
  });

  if (!building) {
    return res.status(404).json({ message: 'Edifícil não encontrado' });
  }

  res.json(building);
};

export const getAllBuildings = async (req: Request, res: Response) => {
  const buildings = await prisma.building.findMany({});

  res.json(buildings);
};
