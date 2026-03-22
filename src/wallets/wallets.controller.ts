import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  create(@Body() body: { owner?: unknown; balance?: unknown }) {
    return this.walletsService.create(body?.owner, body?.balance);
  }

  @Get()
  list() {
    return this.walletsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.walletsService.get(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { owner?: unknown }) {
    return this.walletsService.updateOwner(id, body?.owner);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.delete(id);
  }

  @Post(':id/balance')
  updateBalance(@Param('id') id: string, @Body() body: { delta?: unknown }) {
    return this.walletsService.updateBalance(id, body?.delta);
  }
}
