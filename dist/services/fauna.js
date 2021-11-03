"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fauna = void 0;
const { Client } = require('faunadb');
exports.fauna = new Client({
    secret: process.env.FAUNA_SECRET_KEY
});
