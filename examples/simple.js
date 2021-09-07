const { bypass } = require('..')

bypass("f5561ba9-8f1e-40ca-9b5b-a0b3f719ef34","discord.com").then( r => {
    if(r["generated_pass_UUID"]) console.log("captcha_key:",r["generated_pass_UUID"])
    else console.log('fail')
})