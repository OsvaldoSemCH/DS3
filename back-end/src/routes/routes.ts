import { Express } from 'express';
import express from 'express';
import AuthRoutes from './auth.ts';
import PkmnRoutes from './pkmn.ts';

export default function InitRoutes(app: Express)
{
    app.use(express.json());
    app.use(AuthRoutes);
    app.use(PkmnRoutes);
}