import express, {Router} from 'express';
import { JwtFilter, VerifyNickname } from '../filters/auth.ts';
import { PkmnController } from '../controllers/pkmn.ts';

const PkmnRoutes : Router = express.Router();

PkmnRoutes.post('/capture', JwtFilter, PkmnController.Capture);
PkmnRoutes.post('/nickname', [JwtFilter, VerifyNickname], PkmnController.ChangeName);
PkmnRoutes.get('/team', JwtFilter, PkmnController.GetTeam);

export default PkmnRoutes