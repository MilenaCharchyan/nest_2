import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  
}