/**
 * @author wuaixiaoyao
 * @date 2018/7/12
 * @Description:
*/
import  * as Types  from "../types/types"
//userId
export function changeUserId (data) {
    return {
        type: Types.USER_ID,
        data
    }
}

//SHARE_USER_ID 分享用户ID
 export function changeInviteUserId (inviteUserId){
    //
     return {
         type: Types.INVITE_USER_ID,
         inviteUserId
     }
}

//UNIQUE_ID
export function changeUniqueId(uniqueId) {
    //
    return {
        type:Types.UNIQUE_ID,
        uniqueId
    }
}
//IS_NEW_USER 是否新用户
export function changeIsNewUser (isNewUser){
    return {
        type:Types.IS_NEW_USER,
        isNewUser
    }
}
//随机数ID
export function changeRandomId(data){
    return {
        type:Types.RANDOM_ID,
        data
    }
}
//经纬度
export function changeLocation(data){
    return {
        type:Types.LOCATION,
        data
    }
}

//来源
export function changeFromType(data){
    let fromApp = false
    if(data.from == 'app'){
        fromApp = true
    }
    return {
        type:Types.FROM_TYPE,
        from:{
            fromApp
        }
    }
}

//访问来源
export function changeFrom(data){
    return {
        type:Types.FROM,
        data
    }
}
export function changeUserInfo(userInfo) {
    return{
        type:Types.USER_INFO,
        userInfo
    }
}
export function changeInviteUserInfo(inviteUserInfo){
    return {
        type:Types.INVITE_USER_INFO,
        inviteUserInfo
    }
}


// 浏览器环境
export function  changeBrowserType(browserType){
    return {
        type:Types.BROWSER_TYPE,
        browserType
    }
}
export function  changeIsInWeiXin(isInWeiXin){
    return {
        type:Types.IS_IN_WEIXIN,
        isInWeiXin
    }
}
//修改 答题结果
export function changeAnswerResult(answerResult){
    return {
        type:Types.ANSWER_RESULT,
        answerResult
    }
}
// 修改奖励
export function changeLabReward(labReward){
    return {
        type:Types.LAB_REWARD,
        labReward
    }
}
//去测试
export function changeGoToTest(goToTest){
    return {
        type:Types.GO_TO_TEST,
        goToTest
    }
}


//修改fromApp
export function changeFromApp (fromApp){
    return {
        type:Types.FROM_APP,
        fromApp
    }
}
//评论 主体
export function changeRelatedComment(relatedComment) {
    return {
        type:Types.RELATED_COMMENT,
        relatedComment
    }
}
//修改App 消息
export function changeAppMessage(appMessage) {
    //
    return {
        type:Types.APP_MESSAGE,
        appMessage
    }
}