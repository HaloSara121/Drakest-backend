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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const socket_controllers_1 = require("socket-controllers");
const socket_io_1 = require("socket.io");
// import { rolledDices } from "../../contexts/roomContext";
// console.log(rolledDices)
const rolledDices = [];
let GameController = class GameController {
    getSocketGameRoom(socket) {
        const socketRooms = Array.from(socket.rooms.values()).filter(r => r !== socket.id);
        const gameRoom = socketRooms !== null && socketRooms !== void 0 ? socketRooms : socketRooms[0];
        return gameRoom;
    }
    rollDicesMethod(dicesAmount, dicesSizes, amplifier = 0) {
        const dicesValues = [];
        for (let i = 0; i < dicesAmount; i++) {
            dicesValues.push(Math.floor((Math.random() * dicesSizes) + 1) + amplifier);
        }
        return dicesValues;
    }
    rollDices(io, socket, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameRoom = this.getSocketGameRoom(socket);
            const { roomId, user, diceInfo } = message;
            const dicesValues = this.rollDicesMethod(diceInfo.diceAmount, diceInfo.diceSize, diceInfo.amplifier);
            const rollInfos = {
                roomId: roomId,
                user: user,
                diceInfo: diceInfo,
                dicesValues,
                currentSocket: socket.id
            };
            console.log(rollInfos);
            // rolledDices.push(rollInfos)
            // console.log(rolledDices.filter(obj => obj.roomId !== message.roomId))
            io.to(gameRoom).emit("rolled_dices_values", { rollInfos });
        });
    }
};
__decorate([
    (0, socket_controllers_1.OnMessage)("roll_dices"),
    __param(0, (0, socket_controllers_1.SocketIO)()),
    __param(1, (0, socket_controllers_1.ConnectedSocket)()),
    __param(2, (0, socket_controllers_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Server,
        socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "rollDices", null);
GameController = __decorate([
    (0, socket_controllers_1.SocketController)()
], GameController);
exports.GameController = GameController;
