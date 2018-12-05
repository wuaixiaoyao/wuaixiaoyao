import {combineReducers} from 'redux'
import * as Types  from "../types/types"
import Base64 from "../../utils/base64";
import {CreateRandom} from "../../utils";
const userAgent = window.navigator.userAgent;
const userInitState = {
    showQuery: false,
    audioLoadding: false,
    //用户ID
    userId:"",
    isNewUser:true,
    //邀请人ID
    inviteUserId:"",
    randomId:"",
    uniqueId:Base64.encode(userAgent)+CreateRandom(),//设备唯一ID
    location:{
        //经度
        longitude:"",
        //纬度
        latitude:"",
    },
    //来源类型
    fromApp:false,
    //访问来源 web / shortlink  /qrcode
    from:"index",
    inviteUserInfo:{
        avatar:"",
        nickName:""
    },
    userInfo:{
        avatar:"",
        nickname:""
    }
}
const browser = {
    browserType:"",
    isInWeiXin:false

}
const Lab = {
    answerResult:[],
    labReward:0,
    goToTest:true
}
const commonInitState = {
    relatedComment:{//评论详情页 主体
        relateId:1,
        likeCount:10,// 点赞数
        replyCount:0,//回复数
        nickName:"哈哈哈11",
        avatar:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3564877025,796183547&fm=27&gp=0.jpg",
        createDate:Date.parse(new Date()),//发布时间
        content:"大渣好，我系咕天落给大渣推荐一款曹好碗的游戏，探碗懒月，你木有碗过的船森版本，挤需体验三番中，你揍会干我一样，爱向介款游戏。",

    },
    appMessage:{
        scrollToComment:false,//滚动到评论区


    }
}
function userInfo(state = userInitState, action) {
    switch (action.type) {
        case Types.USER_ID:
            return Object.assign({},state,action.data)
        case Types.INVITE_USER_ID:
            return Object.assign({},state,action.inviteUserId)
        case Types.UNIQUE_ID:
            return Object.assign({},state,action.uniqueId)
        case Types.RANDOM_ID:
            return Object.assign({},state,action.data)
        case Types.FROM_APP:
            return Object.assign({},state,action.fromApp)
        case Types.LOCATION:
            return Object.assign({},state,action.data)
        case Types.FROM_TYPE:
            return Object.assign({},state,action.from)
        case Types.FROM:
            return Object.assign({},state,action.data)
        case Types.USER_INFO:
            return Object.assign({},state,action.userInfo)
        case Types.INVITE_USER_INFO:
            return Object.assign({},state,action.inviteUserInfo)
        case Types.IS_NEW_USER:
            return Object.assign({},state,action.isNewUser)
        default:
            return state


    }
}
function BrowserInfo(state = browser,action){
    switch(action.type){
        case Types.BROWSER_TYPE:
            return Object.assign({},state,action.browserType)
        case Types.IS_IN_WEIXIN:
            return Object.assign({},state,action.isInWeiXin)
        default:
            return state
    }
}
// 公共 部分
function CommonDetail(state = commonInitState,action){
    switch(action.type){
        case Types.RELATED_COMMENT:
            return Object.assign({},state,action.relatedComment)
        case Types.APP_MESSAGE:
            return Object.assign({},state,action.appMessage)
        default:
            return state
    }
}

//实验室
function labInfo(state=Lab,action){
    switch(action.type){
        case Types.ANSWER_RESULT:
            return Object.assign({},state,action.answerResult)
        case Types.LAB_REWARD:
            return Object.assign({},state,action.labReward)
        case Types.GO_TO_TEST:
            return Object.assign({},state,action.goToTest)
        default:
            return state
    }
}

export default combineReducers({
    userInfo,
    BrowserInfo,
    labInfo,
    CommonDetail
})