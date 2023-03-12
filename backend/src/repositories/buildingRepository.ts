import { Apartment, Building, PrismaClient } from '@prisma/client';

interface BuildingProps {
  id: string;
  name: string;
  address: string;
  apartments: Apartment[];
}


const prisma = new PrismaClient();

export const createBuildingRepository = async (data: BuildingProps): Promise<Building> => {
  const apartmentsData = data.apartments.map(apartment => ({ ...apartment }));
  const newBuilding = await prisma.building.create({
    data: {
      id: data.id,
      name: data.name,
      address: data.address,
      apartments: {
        create: apartmentsData
      }
    },
    include: {
      apartments: true
    }
  });
  return newBuilding;
}

export const getBuildingRepository = async (): Promise<Building[]> => {
  const building = await prisma.building.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      apartments: true
    }
  })
  return building;
}

export const getBuildingByIdRepository = async (id: string) => {
  const buildingId = await prisma.building.findUnique({
    where: {
      id: id,
    },
    include: { apartments: true }
  })
    return buildingId;
  
}

export const updateBuildingRepository = async (id: string, data: BuildingProps): Promise<Building> => {
  const apartmentsData = data.apartments.map((apartment) => ({
    number: apartment.number,
    floor: apartment.floor,
    bedrooms: apartment.bedrooms,
    bathrooms: apartment.bathrooms,
    size: apartment.size,
    rent_amount: apartment.rent_amount,
    buildingId: apartment.buildingId,
    renterId: apartment.renterId,
  }));
  const updateBuilding = await prisma.building.update({
    where: {
      id: id,
    },
    data: {
      name: data.name,
      address: data.address,
      apartments: {
        create: apartmentsData
      }
    },
    include: {
      apartments: true
    }
  })
  return updateBuilding;
}