# js-hcaptcha-bypass
JS Hcaptcha Bypass port of [hcaptcha-bypass-discord](https://github.com/avengy/hcaptcha-bypass-discord)

## Examples
```js
const { bypass } = require('.')

bypass("f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34","discord.com").then( r => {
    if(r["generated_pass_UUID"]) console.log("captcha_key:",r["generated_pass_UUID"])
    else console.log('fail')
})
```
**If you using this in your project and releasing it on github then credit the right people below**

Credits: 
- Aniell4 for orignal source https://github.com/Aniell4
- Avenger for modifying the code to fix lock acc issue