const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');
app.use(bodyparser());
const router = require('koa-router')();
const Router = require('./router/router')

app.use(Router.routes());
app.use(router.allowedMethods())



app.listen(1029);
console.log('koa damo is starting at port 1029');


function parseData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let str = ''
            ctx.req.addListener('data', data => {
                str += data
            })

            ctx.req.addListener('end', () => {
                resolve( parseUrl(str) )
            })
            
        } catch (e) { reject(e) }
        
    })

}

function parseUrl(url) {
    let obj = {}
    let arr = url.split("&");
    arr.forEach((e, i) => {
        let tem = arr.split("=")
        obj[tem[0]] = tem[1]
    })
    return obj;
    console.log(JSON.stringify(obj))
}