/**
 * It's not a unit test, it's just a file to try out
 */

import Behin from "https://deno.land/x/behin/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import { YWH } from "./ywh.ts";

const ywh = new YWH();

await ywh
        .login(Deno.env.get('YWH_LOGIN')!, Deno.env.get('YWH_PASSWORD')!)
        .then(async () => await ywh.totp(Behin.totp.generate(Deno.env.get('TOTP_TOKEN')!)))
        .catch((error) => {
            console.log(error);
        });

const user = await ywh.user();

console.log(`Log as ${user.username}`);

const reports = await ywh.reports();

reports.map((report, index) => {
    console.log(report.title);
})