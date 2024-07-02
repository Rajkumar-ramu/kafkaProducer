"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.Thirdparty = void 0;
require("reflect-metadata");
const axios_1 = __importDefault(require("axios"));
const routing_controllers_1 = require("routing-controllers");
const produce_1 = require("../kafka/produce");
let Thirdparty = class Thirdparty {
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default
                .get("https://mpbae282551b945eabb6.free.beeceptor.com/data");
            const data = response.data;
            // Send data to Kafka
            yield (0, produce_1.produceMessage)(data);
            res.status(200).send({ status: 'success', data: data });
        });
    }
};
exports.Thirdparty = Thirdparty;
__decorate([
    (0, routing_controllers_1.Get)('/fetchItems'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Thirdparty.prototype, "getAllProducts", null);
exports.Thirdparty = Thirdparty = __decorate([
    (0, routing_controllers_1.JsonController)()
], Thirdparty);
