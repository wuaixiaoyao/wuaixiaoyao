/**
 * @author wuaixiaoyao
 * @date 2018/5/23
 * @Description: 常量
*/
import {Host,ShareHost} from "../config/host";
//常量

// 微信公众号AppID
export const WX_ID = "wx68da448306df15e3";
//公众号 appSecret
export  const APP_SECRET = "3437f8d2c7b0e0ecdf4efacf56426f37"
//微博头条官网地址
export const  WEI_BO_LINK = "https://weibo.com/u/6005652497?topnav=1&wvr=6&topsug=1"
export const  TOU_TIAO_LINK = "https://www.toutiao.com/c/user/74430523275/#mid=1583304412275726"
//枚举值

export const INVITE_STATUS = {
    //101:未下单;102:学习中;103:已完成; 104失效;
    NOORDER:'101',
    LEARNING:'102',
    FINISH:'103',
    INVALID:'104'
}
export const REWARD_TYPE = {
     //104早教A美吉姆
    // 105早教B 棒球
    // 106大礼包
    // 107 豪华大礼包
    // 000 美国私立小学
    PRIVATE_SCHOOL:"000",
    LESSON_A:"104",
    LESSON_B:"105",
    BAG:"106",
    BIG_BAG:"107"

}
export const MATCH_PERSON = {
    /*
        1 巴菲特
        2 马云
        3 爱因斯坦
        4 比尔盖茨
        5 马斯克
        6 乔布斯
        7奥黛丽赫本
     */
     BAFEITE:1,
     MAYUN:2,
     AIYINSITAN:3,
     BIERGAICI:4,
     MASIKE:5,
     QIAOBUSI:6,
     AODAILI:7

}
export const RESULT_SCORE = {
      //24种结果
      one:"92.6",
      two:"82.6",
      three:"72.6",
      four:"72.9",
      five:"82.9",
      six:"62.9",
      seven:"70.4",
      eight:"60.4",
      nine:"80.4",
      ten:"60.0",
        eleven:"70.0",
        twelve:"80.0",
        thirteen:"72.2",
        fourteen:"82.2",
        fifteen:"92.2",
        sixteen:"69.7",
        seventeen:"79.7",
        eighteen:"89.7",
        nineteen:"75.1",
        twenty:"85.1",
        twentyone:"95.1",
        twentytwo:"57.5",
        twentythree:"67.5",
        twentyfour:"77.5"


}
// 渠道
/*
*  toutiao 头条
*  wifi  wifi 万能钥匙
*  fans 粉丝通
*  babytree 宝宝树
*
* */
//收藏类型枚举
//1 股票新闻 2 指数新闻 3 个股公告
export const COLLECT_TYPE = {
    STOCK: 1,
    EXPONENT:2,
    NOTICE:3
}

//APP 富文本类型
export const APP_SOURCE_TYPE = {
    /*
     1 图片 2 文字 3 音频
     */
    IMG:1,
    WORD:2,
    AUDIO:3
}

//评论 枚举
export const COMMENT_TYPE = {
    COURSE:"Course",         // 课程
    LESSON:"Lesson",         // 课件
    COMMENT:"Comment",        // 留言
    TOPIC:"Topic",          // 提问
    MESSAGE:"Message",         //消息
    STOCK:"STOCK",         //股票
    INDEX:"INDEX",         //指数
    ANSWER:"Answer",          // 回答
    ARTICLE:"Article",         //用户文章
    NEWSSK:"NewsSK",         //股票新闻 1
    NEWSME:"NewsME",         //宏观新闻 2
    ANNOUNCEMENT:"Announcement",   //股票公告
}


