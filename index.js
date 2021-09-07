const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const crypto = require('crypto')
const qs = require('qs');
const sha1_digest = s => crypto.createHash('sha1').update(s).digest()

const Get_Req = (sitekey, host, agent) => fetch(`https://hcaptcha.com/checksiteconfig?host=${host}&sitekey=${sitekey}&sc=1&swa=1`,{agent: agent,headers:{
    "Host": "hcaptcha.com",
    "Connection": "keep-alive",
    "sec-ch-ua": 'Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92',
    "Accept": "application/json",
    "sec-ch-ua-mobile": "?0",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
    "Content-type": "application/json; charset=utf-8",
    "Origin": "https://newassets.hcaptcha.com",
    "Sec-Fetch-Site": "same-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://newassets.hcaptcha.com/",
    "Accept-Language": "en-US,en;q=0.9"
    
}}).then(res=>res.json()).then(j=>j.pass ? j.c : null);

let x = "0123456789/:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
let x_len = x.length


const index2 = (a, b) => a.findIndex(_=>_==b)
const a = (r) => {
    let t = r.length
    while (t--) {
        if (r[t] < x_len - 1){
            r[t] += 1
            return true
        }
        r[t] = 0
    }
    return false
}
const i = (r) => {
    let t = ""
    let len = r.length
    for (let n = 0; n < len; n++) {
        t += x[r[n]]
    }
    return t
}
const o = (r, e) => {
    let t = sha1_digest(e)
    e = null
    let len = 8 * t.length
    let _o = new Array(len)
    for (let n = 0; n < len; n++) {
        e = t[Math.floor(n / 8)] >> n % 8 & 1
        _o[n] = e
    }
    _o.length = r
    let a = _o

    return 0 == a[0] && index2(a, 1) >= r - 1 || -1 == index2(a, 1)
}

const get = (payload) => {
    for (let _i = 0; _i < 25; _i++) {
        let n = new Array(_i).fill(0)
        while (a(n)) {
            let u = payload["d"] + "::" + i(n)
            if (o(payload["s"], u)){
                return i(n)
            }
        }
    }
}
function N_Data(req){
    try {

        req = req.split(".")

        req = {
            "header": JSON.parse(Buffer.from(req[0] + "=======",'base64').toString()),
            "payload": JSON.parse(Buffer.from(req[1] + "=======",'base64').toString())
        }

        return [
            "1",
            String(req["payload"]["s"]),
            new Date().toISOString().substring(0,19)
            .replace(/T/g, "")
            .replace(/-/g, "")
            .replace(/:/g, ""),
            req["payload"]["d"],
            "",
            get(req["payload"])
        ].join(":")
    } catch (error) {
        console.error(error)
    }
}
function Get_Captcha(sitekey, host, n, req, agent) {
    try {
        let json = {
            "sitekey": sitekey,
            "v": "b1129b9",
            "host": host,
            "n": n,
            'motiondata': '{"st":1628923867722,"mm":[[203,16,1628923874730],[155,42,1628923874753],[137,53,1628923874770],[122,62,1628923874793],[120,62,1628923875020],[107,62,1628923875042],[100,61,1628923875058],[93,60,1628923875074],[89,59,1628923875090],[88,59,1628923875106],[87,59,1628923875131],[87,59,1628923875155],[84,56,1628923875171],[76,51,1628923875187],[70,47,1628923875203],[65,44,1628923875219],[63,42,1628923875235],[62,41,1628923875251],[61,41,1628923875307],[58,39,1628923875324],[54,38,1628923875340],[49,36,1628923875363],[44,36,1628923875380],[41,35,1628923875396],[40,35,1628923875412],[38,35,1628923875428],[38,35,1628923875444],[37,35,1628923875460],[37,35,1628923875476],[37,35,1628923875492]],"mm-mp":13.05084745762712,"md":[[37,35,1628923875529]],"md-mp":0,"mu":[[37,35,1628923875586]],"mu-mp":0,"v":1,"topLevel":{"st":1628923867123,"sc":{"availWidth":1680,"availHeight":932,"width":1680,"height":1050,"colorDepth":30,"pixelDepth":30,"availLeft":0,"availTop":23},"nv":{"vendorSub":"","productSub":"20030107","vendor":"Google Inc.","maxTouchPoints":0,"userActivation":{},"doNotTrack":null,"geolocation":{},"connection":{},"webkitTemporaryStorage":{},"webkitPersistentStorage":{},"hardwareConcurrency":12,"cookieEnabled":true,"appCodeName":"Mozilla","appName":"Netscape","appVersion":"5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36","platform":"MacIntel","product":"Gecko","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36","language":"en-US","languages":["en-US","en"],"onLine":true,"webdriver":false,"serial":{},"scheduling":{},"xr":{},"mediaCapabilities":{},"permissions":{},"locks":{},"usb":{},"mediaSession":{},"clipboard":{},"credentials":{},"keyboard":{},"mediaDevices":{},"storage":{},"serviceWorker":{},"wakeLock":{},"deviceMemory":8,"hid":{},"presentation":{},"userAgentData":{},"bluetooth":{},"managed":{},"plugins":["internal-pdf-viewer","mhjfbmdgcfjbbpaeojofohoefgiehjai","internal-nacl-plugin"]},"dr":"https://discord.com/","inv":false,"exec":false,"wn":[[1463,731,2,1628923867124],[733,731,2,1628923871704]],"wn-mp":4580,"xy":[[0,0,1,1628923867125]],"xy-mp":0,"mm":[[1108,233,1628923867644],[1110,230,1628923867660],[1125,212,1628923867678],[1140,195,1628923867694],[1158,173,1628923867711],[1179,152,1628923867727],[1199,133,1628923867744],[1221,114,1628923867768],[1257,90,1628923867795],[1272,82,1628923867811],[1287,76,1628923867827],[1299,71,1628923867844],[1309,68,1628923867861],[1315,66,1628923867877],[1326,64,1628923867894],[1331,62,1628923867911],[1336,60,1628923867927],[1339,58,1628923867944],[1343,56,1628923867961],[1345,54,1628923867978],[1347,53,1628923867994],[1348,52,1628923868011],[1350,51,1628923868028],[1354,49,1628923868045],[1366,44,1628923868077],[1374,41,1628923868094],[1388,36,1628923868110],[1399,31,1628923868127],[1413,25,1628923868144],[1424,18,1628923868161],[1436,10,1628923868178],[1445,3,1628923868195],[995,502,1628923871369],[722,324,1628923874673],[625,356,1628923874689],[523,397,1628923874705],[457,425,1628923874721]],"mm-mp":164.7674418604651},"session":[],"widgetList":["0a1l5c3yudk4"],"widgetId":"0a1l5c3yudk4","href":"https://discord.com/register","prev":{"escaped":false,"passed":false,"expiredChallenge":false,"expiredResponse":false}}',
            "hl": "en",
            "c": JSON.stringify(req)
        }

        
        return fetch(`https://hcaptcha.com/getcaptcha?s=${sitekey}`,{
            headers: {
                "Host": "hcaptcha.com",
                "Connection": "keep-alive",
                "sec-ch-ua": 'Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92',
                "Accept": "application/json",
                "sec-ch-ua-mobile": "?0",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
                "Content-type": "application/x-www-form-urlencoded",
                "Origin": "https://newassets.hcaptcha.com",
                "Sec-Fetch-Site": "same-site",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Dest": "empty",
                "Referer": "https://newassets.hcaptcha.com/",
                "Accept-Language": "en-US,en;q=0.9",
                "Cookie":"hc_accessibility=p49eEpYY6TrPZt9qMubLHJMpSYg/mXUMNzVwyNEaenDYyUrEScFUfyRDZfcc8x04vzpu4frPDA8qKtaQcDr/l8Eg3oq0nTOVUZMP6G1XbYKNraKM58RglxPm9fXwjBoLFYIgZSRvPB3afQNsIzQMSEssz3MfG/w2Tu6iT7nA5It9nJFoaFMOzRCoh8p4e1uCk/vnzC0/WoBmNH2/yc/mJG3cGrOcMzAfjaLo2WRRMSIO4ndUEyCnuA3D9LfkZ3oNJblcgXuvsVg1mXfI8OB2aYh+7RVSBvAofW32H53Mip9s7NwMSgERBhYeFLpbg2SHdLaflkPgN0FnksxKAnFsaHljTNEfnxQM+M4+LEm7ddFJRvZaS/T/xRLVqL47Mjkf20Iv7H4Clbcw5Oo7sN3GdqCuJV1oHup9QF/NKxg2ZdWgae/W+v/Fn3jebl2VhBmU18Uu2Y1sYUxH5NywPwxfLOL8ZE8VNRzGGiBu7+qkZQiJbQeDnBVecaXYzN3Tu27pQUK8XZ4cwTc=OB5/d6KvKI47BYhF"
    
            },
            agent: agent,
            method: "POST",
            body: qs.stringify(json)
        }).then(res=>res.json())
    } catch (error) {
        console.error(error)
    }
}
const bypass = async(sitekey, host, agent) => {
    let agent = agent// your http agent
    let req = await Get_Req(sitekey,host,agent)
    req["type"] = "hsl"
    if(!req || !["req"]) return null
    let n = await N_Data(req["req"])
    if(!n) return null
    return Get_Captcha(sitekey,host,n,req,agent)
}
  
module.exports = {Get_Req,Get_Captcha,N_Data,bypass}