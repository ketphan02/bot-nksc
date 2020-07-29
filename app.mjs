import { webhook } from './webhook/webhook.mjs';

export
{
    isDoing,
    isInit
}

let isDoing = false;
let isInit = false;

webhook();

/*

git add .
git commit -m "update"
git push origin master

*/