import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Render,
  Redirect,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ClientesService } from './clientes.service'; // Asegúrate de que la importación es correcta
import { TelefonosService } from './telefonos.service'; // Asegúrate de que la importación es correcta
import { Public } from '@auth/decorators/public.decorator'; // Asegúrate de que la importación es correcta

@Public()
@Controller('views')
export class ViewsController {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly telefonosService: TelefonosService,
  ) {}

  @Get()
  @Render('index')
  async getHome() {
    const clientes = await this.clientesService.findAll();
    const telefonos = await this.telefonosService.findAll();
    return { message: 'Sistema de gestión de teléfonos', clientes, telefonos };
  }

  @Post('create-cliente')
  @HttpCode(302)
  @Redirect('/views')
  async createCliente(
    @Body()
    body: {
      nombre: string;
      email: string;
      direccion?: string;
    },
  ) {
    const { nombre, email, direccion } = body;
    await this.clientesService.create({
      nombre,
      email,
      direccion,
    });
    return { url: '/views' };
  }

  @Post('create-telefono')
  @HttpCode(302)
  @Redirect('/views')
  async createTelefono(
    @Body()
    body: {
      numero: string;
      operador: string;
      modelo?: string;
      fecha_compra?: Date;
      clienteId: number;
    },
  ) {
    const { numero, operador, modelo, fecha_compra, clienteId } = body;
    await this.telefonosService.create({
      numero,
      operador,
      modelo,
      fecha_compra: new Date(fecha_compra),
      cliente: { connect: { id: Number(clienteId) } },
    });
    return { url: '/views' };
  }

  @Post('delete-cliente/:id')
  @HttpCode(302)
  @Redirect('/views')
  async deleteCliente(@Param('id') id: number) {
    // Primero eliminar todos los teléfonos asociados al cliente
    const cliente = await this.clientesService.findOne(id);
    if (cliente) {
      for (const telefono of cliente.telefonos) {
        await this.telefonosService.remove(telefono.id);
      }
      await this.clientesService.remove(id);
    }
    return { url: '/views' };
  }

  @Post('delete-telefono/:id')
  @HttpCode(302)
  @Redirect('/views')
  async deleteTelefono(@Param('id') id: number) {
    await this.telefonosService.remove(id);
    return { url: '/views' };
  }

  @Put('update-cliente/:id')
  @HttpCode(302)
  @Redirect('/views')
  async updateCliente(
    @Param('id') id: number,
    @Body()
    body: {
      nombre?: string;
      email?: string;
      direccion?: string;
    },
  ) {
    await this.clientesService.update(id, body);
    return { url: '/views' };
  }

  @Put('update-telefono/:id')
  @HttpCode(302)
  @Redirect('/views')
  async updateTelefono(
    @Param('id') id: number,
    @Body()
    body: {
      numero?: string;
      operador?: string;
      modelo?: string;
      fecha_compra?: Date;
      clienteId?: number;
    },
  ) {
    await this.telefonosService.update(id, body);
    return { url: '/views' };
  }
}
