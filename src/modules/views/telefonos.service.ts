import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/prisma/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TelefonosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.telefono.findMany({
      include: {
        cliente: true, // Incluye el cliente relacionado
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.telefono.findUnique({
      where: { id },
      include: { cliente: true }, // Incluye el cliente relacionado
    });
  }

  async create(data: Prisma.TelefonoCreateInput) {
    return this.prisma.telefono.create({ data });
  }

  async remove(id: number) {
    return this.prisma.telefono.delete({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.TelefonoUpdateInput) {
    return this.prisma.telefono.update({
      where: { id },
      data,
    });
  }
}
