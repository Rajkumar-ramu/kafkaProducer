import express from 'express';
import { useExpressServer } from 'routing-controllers';
import {Products} from './controllers/customer';
import { runConsumer } from './kafka/consumer';
import { AppDataSource } from './config/data';


class App {
    app: any
    constructor () {
        this.app = express();
        this.setupRoutes();
        this.middleware();
    }
  
    setupRoutes(){
        useExpressServer(this.app, {
            controllers: [Products]
          });
    }
    middleware(){
        this.app.use(express.json());
    }
    

    async start(){
        await AppDataSource.initialize();
        console.log('Connected to MongoDB');
  
        this.app.listen(4000, () => {
          console.log('Server Started on 4000');
        });
  
        await runConsumer();
        console.log('Kafka consumer started');
    }
}

const app = new App();
app.start()

