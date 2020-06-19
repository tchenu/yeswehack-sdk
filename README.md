# YesWeHack SDK 🧰

[YesWeHack](https://yeswehack.com) SDK written in Deno 🦕 

*This SDK has been written for personal needs, if you want to improve it you can submit PRs.*

## Usage 👨🏼‍🔬

### Login 🚪

```typescript
import { YWH } from "https://deno.land/x/yeswehack/mod.ts";

const ywh = new YWH();

await ywh
        .login('{LOGIN}', '{PASSWORD}')
        .catch((error) => {
            console.log(error);
        });
```

### Login (TOTP) 🚪 + 🔑


```typescript
import { YWH } from "https://deno.land/x/yeswehack/mod.ts";

const ywh = new YWH();

await ywh
        .login('{LOGIN}', '{PASSWORD}')
        .then(async () => await ywh.totp('{TOTP_CODE}'))
        .catch((error) => {
            console.log(error);
        });
```

### Hacktivity ⚡️

```typescript
import { YWH } from "https://deno.land/x/yeswehack/mod.ts";

const ywh = new YWH();

await ywh
        .login('{LOGIN}', '{PASSWORD}')
        .catch((error) => {
            console.log(error);
        });
        
const hacks = await ywh.hacktivityPerPage(1); // retrieve first page of hacktivity

hacks.map((hack: any) => {
  console.log(hack.report.hunter.username);
});
```


### Reports

```typescript
import { YWH } from "https://deno.land/x/yeswehack/mod.ts";

const ywh = new YWH();

await ywh
        .login('{LOGIN}', '{PASSWORD}')
        .catch((error) => {
            console.log(error);
        });
        
const reports = await ywh.reports();

reports.map((report: any) => {
  console.log(report.title);
});
```

## User (current) 👨🏻‍💼

```typescript
import { YWH } from "https://deno.land/x/yeswehack/mod.ts";

const ywh = new YWH();

await ywh
        .login('{LOGIN}', '{PASSWORD}')
        .catch((error) => {
            console.log(error);
        });
        
const user = await ywh.user();

console.log(`Log as ${user.username}`);
```

### User (with username) 👨

```typescript
import { YWH } from "https://deno.land/x/yeswehack/mod.ts";

const ywh = new YWH();

await ywh
        .login('{LOGIN}', '{PASSWORD}')
        .catch((error) => {
            console.log(error);
        });
        
const hunter = await ywh.user('BZHugs');

console.log(hunter);
```

## Todos 📌

- Use interfaces for response objects (reports, hacks, hunter etc.) instead of using `any`.
- Add some methods (submit reports, update current user etc.)
