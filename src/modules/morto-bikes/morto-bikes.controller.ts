import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MortoBikesService } from './morto-bikes.service';
import { CreateMortoBikeDto } from './dto/create-morto-bike.dto';
import { UpdateMortoBikeDto } from './dto/update-morto-bike.dto';

@Controller('morto-bikes')
export class MortoBikesController {
  constructor(private readonly mortoBikesService: MortoBikesService) {}

  @Post()
  create(@Body() createMortoBikeDto: CreateMortoBikeDto) {
    return this.mortoBikesService.create(createMortoBikeDto);
  }

  @Get()
  findAll() {
    return this.mortoBikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mortoBikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMortoBikeDto: UpdateMortoBikeDto) {
    return this.mortoBikesService.update(+id, updateMortoBikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mortoBikesService.remove(+id);
  }
}
