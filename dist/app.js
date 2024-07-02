"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const thirdpartyaxios_1 = require("./controllers/thirdpartyaxios");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.setupRoutes();
        this.middleware();
    }
    setupRoutes() {
        (0, routing_controllers_1.useExpressServer)(this.app, {
            controllers: [thirdpartyaxios_1.Thirdparty]
        });
    }
    middleware() {
        this.app.use(express_1.default.json());
    }
    start() {
        this.app.listen(4000, () => {
            console.log('Server Started on 4000');
        });
    }
}
const app = new App();
app.start();
