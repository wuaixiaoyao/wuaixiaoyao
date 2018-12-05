/**
 * @author wuaixiaoyao
 * @date 2018/9/26
 * @Description: 评论回复列表详情页
*/

import React ,{Component} from 'react';
import BaseComponent from '../../../components/BaseComponent'
import {Toast} from "antd-mobile";
import Comment from "../../../components/common/comment/comment";
import NoDataView from "../../../components/noDataView/noDataView"
import "./answerDetail.scss"
import * as caimiAction from "../../../redux/action/Index";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
 class AnswerDetail extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            relatedComment:this.props.relatedComment,
            replyList:[{id:1},{id:2}],

        }
    }
    componentWillMount(){

    }
    renderRelatedComment(){
        //相关评论 评论主体
        let {relatedComment} = this.state
        return  <Comment showReplys={false}  comment={relatedComment} commentCallBack={()=>{this.comment()}}/>

    }
    renderComment(){
        return <div className="comment-wrapper">
            <div className="comment-header font-bolder">
                回复列表
            </div>
            <div className="hr-line"></div>
            <div className="comment-list">
                {this.renderCommentList()}
            </div>
        </div>

    }
    renderCommentList(){
        let {replyList} = this.state;
        if(replyList&&replyList.length){
            return replyList.map((comment,key)=>{
                return  <Comment key={key} commentCallBack={()=>{this.comment(comment)}}></Comment>
            })
        }else{
            return <NoDataView type={"comment"} noticeText={"暂无评论"} imgStyle={{width:120,height:120}}/>
        }

    }
    render(){
        return <div className="reply-wrapper" style={{"minHeight": window.innerHeight}}>
            <div className="reply-content">
                {this.renderRelatedComment()}
                <div className="cut-off-view"></div>
                {this.renderComment()}
            </div>

        </div>

    }
}
function mapStateToProps(state) {
    return {
        userId: state.userInfo.userId,
        userInfo:state.userInfo.userInfo,
        randomId: state.userInfo.randomId,
        fromApp: state.userInfo.fromApp,
        inviteUserId:state.userInfo.inviteUserId,
        uniqueId:state.userInfo.uniqueId,
        relatedComment:state.CommonDetail.relatedComment
    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeRelatedComment: bindActionCreators(caimiAction.changeRelatedComment,dispatch)
    }
}
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(AnswerDetail)
