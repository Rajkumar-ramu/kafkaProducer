import 'reflect-metadata'
import { Request, Response } from "express";
import {Body, Get, JsonController,Post,Req, Res} from 'routing-controllers'
import { Product } from '../models/product';
import { AppDataSource } from '../config/data';

@JsonController()
export class Products {
  @Post('/saveProduct')
  async saveProducts(@Body() productData: Product, @Res() res: Response) {
    try {
      const savedProduct = await AppDataSource.manager.save(Product, productData);
      return res.status(200).json(savedProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Error saving product', details: error });
    }
  }
}
