"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const customer_1 = require("./controllers/customer");
const consumer_1 = require("./kafka/consumer");
const data_1 = require("./config/data");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.setupRoutes();
        this.middleware();
    }
    setupRoutes() {
        (0, routing_controllers_1.useExpressServer)(this.app, {
            controllers: [customer_1.Products]
        });
    }
    middleware() {
        this.app.use(express_1.default.json());
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_1.AppDataSource.initialize();
            console.log('Connected to MongoDB');
            this.app.listen(4000, () => {
                console.log('Server Started on 4000');
            });
            yield (0, consumer_1.runConsumer)();
            console.log('Kafka consumer started');
        });
    }
}
const app = new App();
app.start();
