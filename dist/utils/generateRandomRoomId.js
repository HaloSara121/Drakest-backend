"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRoomId = void 0;
const generateRoomId = () => {
    const roomId = [];
    for (let i = 0; i < 6; i++) {
        roomId.push(String(Math.floor(Math.random() * 9)));
    }
    return roomId.join('');
};
exports.generateRoomId = generateRoomId;
