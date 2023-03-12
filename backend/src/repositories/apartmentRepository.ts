import { Apartment, PrismaClient, Renter } from '@prisma/client';

interface ApartmentProps extends Apartment{}
interface RenterProps extends Renter{}

const prisma = new PrismaClient();

export const createApartmentRepository = async (apartment: ApartmentProps) => {
  const newApartment = await prisma.apartment.create({
    data: {
      id: apartment.id,
      number: apartment.number,
      floor: apartment.floor,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      size: apartment.size,
      rent_amount: apartment.rent_amount,
      building: {
        connect: { id: apartment.buildingId },
      },
      renter: {
        connect: apartment.renterId ? { id: apartment.renterId } : undefined,
      },
    },
  });
  return newApartment;
}

export const getApartmentRepository = async (): Promise<ApartmentProps[]> => {
  const apartments = await prisma.apartment.findMany({})
  
  return apartments;
}

export const getApartmentByIdRepository = async (id: string): Promise<Apartment | null> => {
  const apartmentId = await prisma.apartment.findUnique({
    where: {
      id: id,
    },
  })
  if (!apartmentId) {
    throw new Error('Apartment not found');
  }

  return apartmentId;
}

export const getAvailableApartmentsRepository = async(buildingId: string) => {
  const apartmentsAvaliable = await prisma.apartment.findMany({
    where: {
      buildingId,
      renterId: null,
    },
  });

  return apartmentsAvaliable;
}

export const findRentedApartmentsRepository = async (): Promise<Apartment[]> => {
  const rentedApartments = await prisma.apartment.findMany({
    where: {
      renterId: {
        not: null,
      },
    },
  });
  return rentedApartments;
};

export const rentApartmentRepository = async (apartmentId: RenterProps, renterId: ApartmentProps) => {
  const apartment = await prisma.apartment.findUnique({
    where: { id: apartmentId.id },
  });
  
  const renter = await prisma.renter.findUnique({
    where: { id: renterId.id },
  });

  if (!apartment || !renter) throw new Error('Could not find apartment or renter');

  await prisma.apartment.update({
    where: { id: apartmentId.id },
    data: { renter: { connect: { id: renterId.id } } },
  });
}

export const updateApartmentRepository = async (id: string, apartment: Partial<ApartmentProps>): Promise<Apartment> => {
  const updatedApartment = await prisma.apartment.update({
    where: { id },
    data: {
      number: apartment.number,
      floor: apartment.floor,
      bedrooms: apartment.bedrooms,
      bathrooms: apartment.bathrooms,
      size: apartment.size,
      rent_amount: apartment.rent_amount,
      building: {
        connect: { id: apartment.buildingId },
      },
      renter: {
        connect: apartment.renterId ? { id: apartment.renterId } : undefined,
      },
    },
  });
  return updatedApartment;
}
