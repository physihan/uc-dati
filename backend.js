var Koa = require('koa');
// var fetch = require('node-fetch');
var cors=require('koa2-cors')
const axios = require('axios');

const app = new Koa();
app.use(cors());
app.use(async ctx => {
  // ctx.body = 'hello';
  //   header('Access-Control-Allow-Origin:*');  //支持全域名访问，不安全，部署后需要固定限制为客户端网址

  // header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); //支持的http 动作

  // header('Access-Control-Allow-Headers:x-requested-with,content-type');  //响应头 请按照自己需求添加
  console.log(ctx.request.query);
  // console.log(ctx.request.query.question_options);
  
  let{ option = null,title='',question_options='""' } = ctx.request.query;
  question_options=JSON.parse(question_options)
  console.log(ctx.request.query);
  if (option) {
    await axios({
      method: 'get',
      url: `http://answer.sm.cn/answer/curr?format=json&_t=1518342141953&activity=${option}`,
      headers: {
        Referer: 'http://answer.sm.cn/answer/index?activity=million',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36 Sogousearch/Ios/5.9.7',
        cookie:
          ''
      }
    }).then(
      function(response) {
        console.log(response.data);
        ctx.body = response.data;
      },
      err => {
        console.log('e');
      }
    );
  }
  if(title||question_options){
    console.log(title,question_options);
    
    await axios({
      method: 'get',
      url: `https://www.baidu.com/s?wd=${encodeURI(title)}`,
      headers: {
        // Referer: 'http://answer.sm.cn/answer/index?activity=million',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36 Sogousearch/Ios/5.9.7',
        cookie:
          '__cfduid=d6f66411ea9d95a958a238dbe2d4ff7181493210128; BAIDUID=50487C06EFB10E9DA5080BBDE7C2760A:FG=1; PSTM=1493220369; BIDUPSID=37BF03F5A9700C27A2484628393BE1E9; MCITY=-53%3A; sugstore=0; BDUSS=VWaEFaNTM5eFEtODh3V0ZacHB3RjZMRjdGb3dvMWdFMFI4T0gxaGk0Vi1BYUphQVFBQUFBJCQAAAAAAAAAAAEAAACAI3Y109G6w7XEQ2FuY2VyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH50elp-dHpaQ0; ispeed_lsm=0; H_PS_645EC=671blPncFs7h79WKzRNy9FtJeSN3NSgrLOoDhoU90kW8lXKKF7ymxbfm9lw; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BD_HOME=1; H_PS_PSSID=1421_21117_17001_20930; BD_UPN=12314753'
      }
    }).then(
      function(response) {
        // console.log(response.data);'
        if(question_options.length===0)
        question_options=['azx','xzc']
        // question_options=question_options||
        reg_str=question_options.join('|')
        console.log(question_options);

        let reg=new RegExp(`(${reg_str})`,'g')
        console.log(response);
        
        console.log(reg);
        // console.log(reg.test('asd'));
        response.data=response.data.replace(reg,'<span class="highlight">$1asd</span>')
        ctx.body = response.data;
      },
      err => {
        console.log('e');
      }
    );
  }
});

app.listen(3001);
