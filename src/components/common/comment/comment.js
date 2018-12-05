/**
 * @author wuaixiaoyao
 * @date 2018/8/17
 * @Description: 评论
*/
import React,{Component} from "react"
import {withRouter} from "react-router-dom"
import {Toast} from "antd-mobile"
import "./comment.scss"
import Avatar from "../../avatar/avatar"
import {FormatResourceUrl} from "../../../utils";
import moment from "moment/moment";
import {like} from "../../../api/api"
import BaseComponent from "../../BaseComponent";
 class Comment extends BaseComponent{
    constructor(props){
        super(props)
        this.state = {
            comment:this.props.comment,
            showReplys:this.props.showReplys,
            like:false,// 不喜欢
            goToLink:this.props.goToLink,//  下载
            fromApp:false
        }
    }
    static defaultProps = {
        comment:{
            likeCount:0,// 点赞数
            liked:0,// 是否点赞
            replyCount:0,//回复数
            nickName:"",
            avatar:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3564877025,796183547&fm=27&gp=0.jpg",
            createDate:Date.parse(new Date()),//发布时间
            content:"",
            replays:[//回复列表

            ]
        },
        showReplys:true,
        goToLink:false,

    }
    componentWillReceiveProps(nextProps,nextState){
        let newComment = nextProps.comment;
        this.setState({
            comment:nextProps.comment
        })

    }
    shouldComponentUpdate(nextProps,nextState){
        return true
    }
    comment(){
        //回复评论
        if(this.props.goToLink){
            this.goToLink()
            return
        }
        let {comment} = this.state;
        let item = {
            relateId:comment.relateId,
            relateType:comment.relateType,
            relateUserId:comment.relateUserId,
            parentId:comment.relatedId,
            ...comment,
        };
        let message = {
               type:"comment_click_comment",
               content:{
                  item,
                   index:this.props.index

               }
        }
       // Toast.info(this.props.index)
        this.sendMessageToApp(message)
        if(this.props.commentCallBack){
            this.props.commentCallBack();

        }
    }
    goToPersonIndex(){
        //跳转个人主页
        if(this.props.goToLink){
            this.goToLink()
            return
        }
        let {comment} = this.state;
        let message = {
            type:"comment_click_headPic",
            content:{
                item:comment
            }
        }
        this.sendMessageToApp(message)
    }
    goToCommentDetail(){
        //跳转评论详情页
        if(this.props.goToLink){
            this.goToLink()
            return
        }
        let {comment} = this.state;
        let message = {
            type:"comment_click_reply",
            content:{
                item:comment
            }
        }
        this.sendMessageToApp(message)
    }
    alertBottomOpe(){
        // 弹出操作框
        if(this.props.goToLink){
            this.goToLink()
            return
        }
        let {comment} = this.state;
        let message = {
            type:"comment_show_bottomAlertView",
            content:{
                item:comment
            }
        }
        this.sendMessageToApp(message)
    }
    like(){
        //点赞 调点赞接口
        if(this.props.goToLink){
            this.goToLink()
            return
        }
        let {comment} = this.state;
        console.log(comment)
        let params = {
            relatedId:comment.objectId,
            relatedType:"Comment",
            relatedUserId:comment.relateUserId
        };
        like(params).then(res=>{
            if(res.code == 0){
                let liked = comment.liked == 0?1:0;
                let likeCount = comment.liked == 0?comment.likeCount+1:comment.likeCount-1
                if(likeCount< 0){
                    likeCount = 0
                }
                let newComment = {
                    ...comment,
                    liked,
                    likeCount
                }
                this.setState({
                    comment:newComment
                },()=>{
                    //修改父组件的状态
                    this.props.changeListState&&this.props.changeListState(this.props.index,newComment)
                    console.log(this.state.comment)
                })
            }
        })
        if(this.props.likeCallBack){
            this.props.likeCallBack()
        }
    }
    searchMoreReply(){
        //查看更多回复
        // if(this.props.searchMoreReply){
        //     this.props.searchMoreReply()
        // }
    }

    renderAnswerForAnswer(){
        //回答的回答
        let {replays} = this.state.comment;
        let {showReplys} = this.state
        if(showReplys&&replays){
            let validReplays = replays.slice(0,2)  //展示前两条
            return <div className={"answer-for-answer"} onClick={this.goToCommentDetail.bind(this)}>
                {validReplays.map((answer,index)=>{
                    return <p className={"answer-detail"} key={index}>
                        <span className={"answer-nickName"}>{answer.nickName}</span>：{answer.content}
                    </p>
                })}
                {replays.length>2&&<span onClick={()=>{this.searchMoreReply()}} className={"more-answer"}>共{replays.length}条回复</span>}
            </div>
        }

    }
    render(){
        let {avatar,nickName,content,createDate,likeCount,replyCount,liked,replays} = this.state.comment;
        console.log(liked)
        if(!replays){
            replays = []
        }
        return <div className={"comment-wrapper"}>
                <div className="comment-content">
                    <div onClick={this.goToPersonIndex.bind(this)}>
                        <Avatar style={{width:32,height:32}} avatarUrl={FormatResourceUrl(avatar)}
                        />
                    </div>
                    <div className="comment-view" >
                        <div onClick={this.alertBottomOpe.bind(this)}>
                            <div className="comment-name font-bolder">
                                {nickName}
                            </div>
                            <div className="comment-detail">
                                {content}
                            </div>
                        </div>
                        {this.renderAnswerForAnswer()}
                        <div className="comment-ope">
                            <div className="comment-time">
                                {moment(Number(createDate)).format('MM月DD日 HH:mm')}
                            </div>
                            <div className="comment-ope-view">
                                <a className="comment-btn" onClick={()=>{this.comment()}}>
                                </a>
                                {replays.length}
                                <a className={liked?"liked-btn":"like-btn"} onClick={()=>{this.like()}}></a>
                                {likeCount}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    }
}
export default withRouter(Comment)