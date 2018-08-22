/**
 * 功能： 短信验证码，注意新用户用手机号码注册，可以有10次使用机会，apikey在用户注册后的后台获取。
 * 作者： dpc
 * 日期： 2018/8/22.
 */

// 修改为您的apikey.可在官网（https://www.yunpian.com)登录后获取

var https = require('https');
var qs = require('querystring');
var apikey = '7d70b9988e678ae3460121ad6786417a';
// 修改为您要发送的手机号码，多个号码用逗号隔开
var mobile = '13033202585';
// 修改为您要发送的短信内容
var text = '【云片网】您的验证码是1234';
// 智能匹配模板发送https地址
var sms_host = 'sms.yunpian.com';
send_sms_uri = '/v2/sms/single_send.json';
send_sms(send_sms_uri,apikey,mobile,text);

function send_sms(uri,apikey,mobile,text){
    var post_data = {
        'apikey': apikey,
        'mobile':mobile,
        'text':text,
    };//这是需要提交的数据
    var content = qs.stringify(post_data);
    post(uri,content,sms_host);
}

function post(uri,content,host){
    var options = {
        hostname: host,
        port: 443,
        path: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var req = https.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });
    //console.log(content);
    req.write(content);
    req.end();
}
