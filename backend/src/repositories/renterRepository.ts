import { PrismaClient, Renter } from '@prisma/client';


interface RenterProps {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  apartmentId: string | null;
}

const prisma = new PrismaClient();

export const createRenterRepository = async (data: RenterProps): Promise<Renter> => {
  const renter = await prisma.renter.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      apartmentId: true,
      apartment: false,
      createdAt: true,
      updatedAt: true
    }
  });
  return renter;
}

export const getRentersRepository = async (): Promise<RenterProps[]> => {
  const renters = await prisma.renter.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: false,
      apartmentId: true,
      apartment: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return renters;
}

export const getRenterByIdRepository = async (id: string) => {
  const renterId = await prisma.renter.findUnique({
    where: {
      id: id,
    },
    include: { apartment: true}
  })
  if (renterId) {
    const renter: RenterProps = {
      id: renterId.id,
      name: renterId.name,
      email: renterId.email,
      phone: renterId.phone,
      apartmentId: renterId.apartmentId,
    };
    return renter;
  }
  return null;
}

export const updateRenterRepository = async (id: string, data: RenterProps) => {
  const renter = await prisma.renter.update({
    where: {
      id: id,
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: false,
      apartmentId: true,
      apartment: true,
      createdAt: true,
      updatedAt: true
    }
  })
  return renter;
}

export const removeRenterRepository = async (id: string) => {
  await prisma.renter.delete({
    where: {
      id: id,
    },
  })
  return;
}
