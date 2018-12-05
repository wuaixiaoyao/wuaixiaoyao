/**
 * @author wuaixiaoyao
 * @date 2018/4/19
 * @Description: api 地址
*/
export const ApiStore = {
    Login:'user/login',
    //分享
    Share:{
        searchInviteInfo:"searchInviteInfo",
        searchInviteRecord: "searchInviteRecord",
        saveShareRecord:"saveShareRecord",
        getInviteUserInfo:"searchInviteUserInfo",
        checkUserAccount:"checkUserAccount",
        sendVerificationCode:"sendVerificationCode",
        checkUserAndRegister:"checkUserAndRegister",
        searchInviteRewardList:"searchInviteRewardList",
        sendRemindMsg:"sendRemindMsg",
        //课程分享
        getCourseByCourseId:"getCourseByCourseId_h5",
        //回答分享
        getAnswerInfo:"getAnswerInfo_h5",
        //评论列表
        getCommentList:"comment/relate_h5",


    },
    //埋点
    AntWeb:"ant/web/pageVisit",
    //app 内页
    WebInApp:{
        //新闻详情
        getNewsInfo:"getNewsInfo",
        //公告
        getAnnouncementsInfo:"getAnnouncementsInfo",
        //文章详情
        getUserArticleInfo:"getUserArticleInfo",
        //收藏
        collection:"collection",
        getCommentList:"comment/relate",//评论列表
        getReplyDetail:"comment/reply",//回复详情页
        like:"like/cut",// 评论 点赞

    },
    WeChat:{
        WeChatShare:"wxshare"
    },
    labActivity:{
        //
        answer:"sadhna/answer",//答题
        login:"sadhna/login",//登录
        inviteUserInfo:"sadhna/inviteUserInfo",//邀请人信息
        getInviteList:"sadhna/invite",//邀请列表
        checkReward:"sadhna/checkReward",//
        inviteDetail:"sadhna/inviteDetail"

    },
    buffettActivity:{
        //抽奖
        lottery:"luckyDraw",
        //验证是否抽奖
        validIsLuckyDraw:"validIsLuckyDraw",
        //验证码
        sendBuffettVerificationCode:"sendBuffettVerificationCode",
        //埋点
        buffettAnt:"recordBuffettAnt",
        //保存分享记录
        saveShareRecord:"saveShareRecord",
        //保存收货地址
        saveUserAddress:"saveUserAddress",
        //获取收货地址
        getUserAddress:"getUserAddressInfo",
        //是否绑定手机号
        isBingPhone:"isBingPhone",
        //获取奖品
         getMyBuffettVoucherList:"getMyBuffettVoucherList",
        //答题
        saveQuestionRecord:"buffett/saveQuestionRecord",
        //后取结果
        getBuffettTestResult:"buffett/getBuffettTestResult",
        //领取课程
        saveCourseSubscribe:"buffett/saveCourseSubscribe",
        //注册
        checkUserAndRegister_v2:"checkUserAndRegister_v2",
    }
}