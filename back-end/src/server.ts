import { AttemptCapture } from "./services/pokemon.ts";

for(let x = 0; x <= 100; ++x)
{
    console.log((await AttemptCapture(150))?.name);
}