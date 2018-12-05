/**
 * @author wuaixiaoyao
 * @date 2018/4/19
 * @Description:服务器环境配置
*/
//服务主机
const minghaoserver = "http://172.16.7.125:8085/web/";
const haoyangserver = "http://172.16.6.30:8080/"
let develop = "https://caimi.we.com/daily/";
const production = "https://caimi.we.com/flower/web/";
export const Host = {
    download: "https://file.caimionline.com/download/",
    upload: "https://caimi.we.com/img/upload/file",
    production,
    pre:"https://caimi.we.com/pre/",
    ant:"https://caimi.we.com/ant/web/",//埋点
    develop
}
const pro = "https://caimi.we.com/activity/";
const sharePre = "http://10.250.80.43:8889/";
const dailyShare = "https://caimi.we.com/dailyactivity/";
export const ShareHost = {
    dev:"http://10.250.80.43:3000/",
    pre:"http://10.250.80.43:8889/",
    pro,
    daily:dailyShare,
}