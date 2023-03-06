import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient()

export const createApartment = async (req: Request, res: Response) => {
  const { number, floor, bedrooms, bathrooms, size, rent, buildingId } = req.body;

  const apartment = await prisma.apartment.create({
    data: { number, floor, bedrooms, bathrooms, size, rent, buildingId },
  });

  return res.status(201).json(apartment);
};

export const getAvailableApartments = async (req: Request, res: Response) => {
  const { buildingId } = req.params;

  const apartments = await prisma.apartment.findMany({
    where: { rentertId: null, buildingId: Number(buildingId) },
  });

  res.json(apartments);
};

export const renterApartment = async (req: Request, res: Response) => {
  const { apartmentId, rentertId } = req.body;

  const apartment = await prisma.apartment.update({
    where: { id: Number(apartmentId) },
    data: { rentertId: Number(rentertId) },
  });

  res.json(apartment);
};