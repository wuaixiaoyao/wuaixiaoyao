/**
 * @author wuaixiaoyao
 * @date 2018/8/17
 * @Description: 回答
*/
import React from "react";
import {Toast} from "antd-mobile"
import axios from "axios"
import AppBaseComponent from "../../../components/appBaseComponent";
import TagList from "../../../components/common/tagList/tagList";
import NoDataView from "../../../components/noDataView/noDataView"
import moment from "moment"
import "./answer.scss"
import Avatar from "../../../components/avatar/avatar";
import Comment from "../../../components/common/comment/comment";
import {getAnswerInfo,getCommentList} from "../../../api/api"
import {H5Util,FormatResourceUrl} from "../../../utils";
import {APP_SOURCE_TYPE,COMMENT_TYPE} from "../../../constant/index"
export default class ShareAnswer extends AppBaseComponent{
    constructor(props){
        super(props)
        this.state = {
            answer:{
                topicTitle:"?",
                content:"",
                createTimeStamp:Date.parse(new Date()),
                tagNameList:[
                ],
                userBean:{
                    nickName:"",
                    avatar:"",
                    intro:""
                }
            },
            comment:{
                //评论

            },
            commentList:undefined,//评论列表
        }
    }
    componentWillMount(){
        let params = {
            pageName:"shareAnswer",
            eventName:"loading"
        }
        this.bury(params)
        let {search} = this.props.location;
        if(search){
            let message = H5Util.serilizeURL(search);
            if(message.answerId){
                /*
                  处理并行请求
                 */
                Toast.loading("加载中")
                axios.all([this.getAnswerInfo(message.answerId),
                this.getCommentList(message.answerId)]).then(axios.spread(function (res1, res2) {
                        // 两个请求现在都执行完成
                        console.log(res1,res2)
                        console.timeEnd("bingxing")
                        Toast.hide()
                    }))

            }
        }
    }
    componentDidMount(){
        //

    }
    getCommentList(relateId){
        // 获取评论列白
        return new Promise((resolve,reject)=>{
            let params = {
                relateId,
                relateType:COMMENT_TYPE.ANSWER,
                currentPage:1,
                pageSize:200
            }
            getCommentList(params).then(res=>{
                if(res.code == 0&&res.data){
                    //
                    if(res.data.length){
                        let {commentList} = this.state;
                        // commentList.concat(res.data)
                        this.setState({
                            commentList:res.data
                        })
                    }else{
                        // 没有数据
                        this.setState({
                            commentList:[]
                        })
                    }
                    resolve("获取评论")

                }
            })
        })


    }
    getAnswerInfo(answerId){
        return new Promise((resolve,reject)=>{
            getAnswerInfo({answerId}).then(res=>{
                //
                if(res.code == 0 && res.bean){
                    let {topicTitle,content,tagNameList,createTimeStamp,userBean} = res.bean;
                    this.setState({
                        answer:{
                            topicTitle,
                            content:this.formatAppRichText(content),
                            tagNameList,
                            createTimeStamp,
                            userBean
                        }
                    })
                    resolve("回复详情")

                }
            })
        })

    }
    renderTagList(){
        //标签
        let {tagNameList} = this.state.answer;
        if(tagNameList&&tagNameList.length>0)  return <div style={{marginTop:5}}>
            <TagList tagList={tagNameList}></TagList>
        </div>

    }
    formatAppRichText(content){
        if(content){
            if(H5Util.isJSON(content)){
                let answers = JSON.parse(content);
                return answers.map((answer,index)=>{
                    let {type} = answer;
                    switch (type){
                        case APP_SOURCE_TYPE.IMG:
                            return  <img className={"answer-img"} src={answer.source}/>
                            break
                        case APP_SOURCE_TYPE.WORD:
                            return <p>{answer.value}</p>
                            break
                        case APP_SOURCE_TYPE.AUDIO:
                           return <audio src={answer.source} controls="controls"></audio>
                            break
                        default:
                            break

                    }
                })
            }else{
                return content
            }

        }else{
            return ""
        }

    }
    renderAnswerInfo(){
        //
        let {userBean,content,createTimeStamp} = this.state.answer;
        return <div className="author-wrapper">
           <div className="author-header">
               <Avatar style={{width:32,height:32}} avatarUrl={FormatResourceUrl(userBean.avatar)} ></Avatar>
               <div className="author-detail">
                   <p className="nickname font-bolder">
                       {userBean.nickName}
                   </p>
                   <p className="intro text-overflow">
                       {userBean.intro}
                   </p>
               </div>
               <div className="attention-btn" onClick={()=>{this.downloadApp()}}>+关注</div>
           </div>
            <div className="hr-line"></div>
            <div className="answer-content">
                {content}
                <p className="extra">发布于{moment(createTimeStamp).format('YYYY-MM-DD')}</p>
                <p className={"extra"}>著作权归作者所有</p>
            </div>

        </div>
    }
    renderCommentList(){
        let {commentList} = this.state;
        if(commentList&&commentList.length){
            return commentList.map((comment,key)=>{
                return  <Comment key={key} comment = {comment} goToLink={true}/>
            })
        }else{
            return <NoDataView type={"comment"} noticeText={"暂无评论"} imgStyle={{width:120,height:120}}/>
        }


    }
    renderComment(){
        let {commentList} = this.state;
        return <div className="comment-wrapper">
            <div className="comment-header font-bolder">
                评论区
            </div>
            <div className="hr-line"></div>
            <div className="comment-list">
                {this.renderCommentList()}
            </div>
        </div>
    }
    render(){
        let {answer} = this.state;
        return <AppBaseComponent>
            <div className="answer-wrapper">
                <div className="answer-header">
                    {this.renderTagList()}
                    <p className="content-title font-bolder">{answer.topicTitle}</p>
                </div>
                <div className="cut-off-view"></div>
                {this.renderAnswerInfo()}
                <div className="cut-off-view"></div>
                {this.renderComment()}
            </div>
        </AppBaseComponent>
    }
}