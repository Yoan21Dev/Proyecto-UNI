import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.cliente.findMany({
      include: {
        telefonos: true, // Incluye los teléfonos relacionados
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.cliente.findUnique({
      where: { id },
      include: { telefonos: true }, // Incluye los teléfonos relacionados
    });
  }

  async create(data: Prisma.ClienteCreateInput) {
    return this.prisma.cliente.create({ data });
  }

  async remove(id: number) {
    return this.prisma.cliente.delete({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.ClienteUpdateInput) {
    return this.prisma.cliente.update({
      where: { id },
      data,
    });
  }
}
