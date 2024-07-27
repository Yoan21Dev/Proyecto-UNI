import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { TelefonosService } from './telefonos.service';
import { PrismaService } from '@core/prisma/services/prisma.service';
import { ClientesService } from './clientes.service';

@Module({
  controllers: [ViewsController],
  providers: [ViewsService, TelefonosService, ClientesService],
})
export class ViewsModule {}
