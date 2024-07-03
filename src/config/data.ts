import "reflect-metadata"
import { DataSource } from "typeorm";
import {Product} from  '../models/product';

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb+srv://rajkumaramu94:LcKT40a2RlwbFcGB@cluster0.ycmpqy1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    entities: [Product]
})