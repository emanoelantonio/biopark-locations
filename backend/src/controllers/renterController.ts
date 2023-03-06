import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient()

export const createRenter = async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;

  const renter = await prisma.renter.create({
    data: { name, email, phone },
  });

  return res.status(201).json(renter);
};

export const getRenterById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const renter = await prisma.renter.findUnique({
    where: { id: Number(id) },
    include: { apartment: true },
  });

  if (!renter) {
    return res.status(404).json({ message: 'Locatário não encontrado' });
  }

  res.json(renter);
};