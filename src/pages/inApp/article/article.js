/**
 * @author wuaixiaoyao
 * @date 2018/9/25
 * @Description: 文章页面
*/
import React ,{Component} from 'react';
import BaseComponent from '../../../components/BaseComponent'
import {Toast} from "antd-mobile";
import axios from "axios"
import BScroll from 'better-scroll'
import TagList from "../../../components/common/tagList/tagList"
import {getArticleInfo,getCommentList} from "../../../api/api"
import './article.scss'
import {H5Util,FormatResourceUrl} from '@/utils/index'
import moment from "moment";
import Avatar from "../../../components/avatar/avatar";
import Comment from "../../../components/common/comment/comment";
import NoDataView from "../../../components/noDataView/noDataView"
import { bindActionCreators } from 'redux'
import * as caimiAction from '../../../redux/action/Index'
import {connect} from "react-redux";
const options = {
    click:true,
    scrollbar:true,
    fade: true,
    probeType: 3,
    hasVerticalScroll:true,
    bounce: true,
    scrollY: true,
    mouseWheel:true
}
options.pullDownRefresh = {
    threshold: 90, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
    stop: 40 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
}
options.pullUpLoad = {
    threshold: -60, // 在上拉到超过底部 20px 时，触发 pullingUp 事件
    moreTxt: 'Load More',
    noMoreTxt: '没有更多了...'
}
const commentList = [{
    relateId:11,
    likeCount:11,// 点赞数
    replyCount:11,//回复数
    nickName:"哈哈哈11",
    avatar:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3564877025,796183547&fm=27&gp=0.jpg",
    createDate:Date.parse(new Date()),//发布时间
    content:"大渣好，我系咕天落给大渣推荐一款曹好碗的游戏，探碗懒月，你木有碗过的船森版本，挤需体验三番中，你揍会干我一样，爱向介款游戏。",
    replays:[//回复列表
        {
            nickName:"11",content:"111111"
        }
    ]
}]
const article = {//文章详情
    publishTime:Date.parse(new Date()),
    title:"好利来：级等级的大家电极端阶段的道具好利来好利来",
    content:"龙象般若功，其实这武功不傻，主要是练起来比较…“龙象般若功”共分13层，第一层功夫十分浅易，纵是下愚之人，龙象般若功，其实这武功不傻，主要是练起来比较…“龙象般若功”共分13层，第一层功夫十分浅易，纵是下愚之人龙象般若功，其实这武功不傻，主要是练起来比较…“龙象般若功”共分13层，第一层功夫十分浅易，纵是下愚之人龙象般若功，其实这武功不傻，主要是练起来比较…“龙象般若功”共分13层，第一层功夫十分浅易，纵是下愚之人龙象般若功，其实这武功不傻，主要是练起来比较…“龙象般若功”共分13层，第一层功夫十分浅易，纵是下愚之人龙象般若功，其实这武功不傻，主要是练起来比较…“龙象般若功”共分13层，第一层功夫十分浅易，纵是下愚之人龙象般若功，其实这武功不傻，主要是练起来比较…“龙象般若功”共分13层，第一层功夫十分浅易，纵是下愚之人只要得到传授，一二年中即能练成。第二层比第一层加深一倍，需时三四年。第三层又比第二层加深一倍，需时七八年。如此成倍递增，越是往后，越难进展。待到第五层以后，欲再练深一层，往往便须30年以上苦功。密宗一门，高僧奇士历代辈出，但这13层“龙象般若功”却从未有一人练到十层以上。这功夫循序渐进，本来绝无不能练成之理，若有人得",
    headPic:"https://file.caimionline.com/download/2018/0817/1534472482458_7792.jpg",//头图
    tagName:"金融",
    avatar:"",//作者头像
    nickName:"吾爱逍遥",
}
 class ArticleInfo extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            userId:"",
            userArticleId:"",//文章ID
            article: {
                publishTime:Date.parse(new Date()),
                title:"",
            },
            loading:false,
            commentList:[],
            pageSize:20,
            currentPage:1,
            fromApp:Boolean(this.props.fromApp),
            scroller:false,
            enablescroll: true,
            load:"上拉加载更多",
            loadMoreBtn:"上拉加载更多",
            showOpeBtn:false


        }
        this.userArticleId = "";
        this.canLoadMore = true;
    }
    componentWillMount(){

    }
     componentDidUpdate() {
         // if(this.state.scroller){
         //     this.state.scroller.refresh()
         // }else{
         //     this.setState({
         //         scroller: new BScroll(this.refs.listWrpper,options)
         //     })
         // }
     }
     componentDidMount(){
         super.componentDidMount()
         // let scrollView = new BScroll(this.refs.listWrpper,options)
          window.document.addEventListener('message',(e)=>{
             const message =JSON.parse(e.data);
             if(message.scrollToComment){
                 window.scrollTo(0,this.commentWrapperOffsetTop);
             }
             // if(message.replaySuccess||message.commentSuccess){
             //     //刷新 评论列表
             //     Toast.info(`回复成功${this.userArticleId}`)
             //     this.getCommentList(this.userArticleId)
             //
             // }
             if(message.refreshCommentList){
                 this.refreshCommentList(message.refreshCommentList)
             }
         })
         window.onscroll = ()=>{
             const t = document.documentElement.scrollTop || document.body.scrollTop;
             let message;
             if(t >=200){
                 message = {
                     type:"scrollToTitle",
                     content: {
                         scrollToTitle:1
                     }
                 }
             }else if(t <= 80) {
                 message = {
                     type:"scrollToTitle",
                     content: {
                         scrollToTitle:0
                     }
                 }
             }
             this.sendMessageToApp(message)
             let Util = new H5Util;
             if (Util.getScrollTop() + Util.getClientHeight() == Util.getScrollHeight()) {
                 if(this.loadTimeout){
                     clearTimeout(this.loadTimeout)
                     this.loadTimeout = null
                 }
                 this.loadTimeout = setTimeout(this.loadMore(),100)
             }

         };
         this.initArticleInfo();
         let params = {
             pageName:"articlePage",
             eventName:"loading",
             userId:this.state.userId
         }
         this.buryPoint(params)
         let wrapper = this.refs.listWrpper;
         wrapper.addEventListener("touchstart",e=>{
             let touch = e.touches[0];
             this.startY = touch.pageY;
             this.clientY = touch.clientY;

         })
         wrapper.addEventListener("touchmove",e=>{
             let touchs = e.touches[0];
             //向上滚动
             //console.log(this.startY,touchs.pageY)
             if(touchs.pageY - this.startY<0){
                 //
                 //console.log("向上滚动")

             }
         })


     }
     refreshCommentList(msg){
        //
         let {type,index,bean} = msg
         if(type == 1){
             //外层list
             let {commentList} = this.state;
             commentList.unshift(bean);
             this.setState({
                 commentList
             })

         }else if(type == 2){
            //内层
             let {commentList} = this.state;
             if(!commentList[index].replays){
                 commentList[index].replays = [];
             }
             commentList[index].replays.unshift(bean);
             this.setState({
                commentList
            },()=>{
                 //Toast.info( this.state.commentList[index].replays.length);
             })
         }

     }
     changeListState(index,item){
         let {commentList} = this.state;
         if(index && item){
             commentList[index] = item;
            this.setState({
                commentList
            })
         }


     }
     initArticleInfo(){
         // 初始化
         let {search} = this.props.location;
         if(search){
             let message = H5Util.serilizeURL(search);
             // Toast.info(message.userArticleId)
             if(message.fromApp){
                 this.props.changeRelatedComment.changeFromApp({fromApp:Boolean(message.fromApp)})
                 this.setState({
                     fromApp:true
                 })
                 console.log(message.fromApp,this.props.fromApp,this.state.fromApp)
             }
             if(message.userArticleId){
                 this.userArticleId = message.userArticleId;
                 // Toast.loading("加载中")
                 axios.all([this.getArticleInfo(message.userId,message.userArticleId),this.getCommentList()])
                     .then(axios.spread(function (res1, res2) {
                         // 两个请求现在都执行完成
                         console.log(res1,res2)
                         // Toast.hide()
                     }))

             }

         }
     }
     getCommentList(callback){
        // 获取评论
         let {currentPage,pageSize} = this.state;
         return new Promise((resolve,reject)=>{
             let params = {
                 relateId:this.userArticleId,
                 relateType:"Article",
                 currentPage,
                 pageSize
             }
             getCommentList(params).then(res=>{
                 if(res.code == 0&&res.data){
                     let oldCommentList = this.state.commentList;
                     if(res.data.length<pageSize){
                         this.canLoadMore = false;
                     }else{
                         this.canLoadMore = true
                     }
                     this.setState({
                         currentPage:res.currentPage,
                         commentList:oldCommentList.concat(res.data),
                         loadMoreBtn:res.data.length==pageSize?"上拉加载更多":"暂无更多评论"
                     },()=>{
                         //Toast.info(`${res.data.length}条评论`)
                         if(!this.state.commentList.length){
                             this.setState({
                                 showOpeBtn:false
                             })
                         }else{
                             this.setState({
                                 showOpeBtn:true
                             })
                         }
                     })
                     if(callback&&typeof callback === "function"){
                         callback(res.data)
                     }
                     resolve()
                 }
             })
         })
     }
     getArticleInfo(userId,userArticleId){
        return new Promise((resolve,reject)=>{
            let params = {
                userId,
                userArticleId
            }
            getArticleInfo(params).then(res=>{
                if(res&&res.code == 0&&res.bean){
                    this.setState({
                        loading:false,
                        article:res.bean,
                    })
                    if(res.bean.content){
                       this.articleView.innerHTML = res.bean.content;
                        this.commentWrapperOffsetTop = document.getElementById("comment-wrapper").offsetTop - 70;
                        console.log(this.commentWrapperOffsetTop);
                        // window.scrollTo(0,this.commentWrapperOffsetTop);
                    }
                    this.postCollectStatusToApp(res.bean.isCollection)
                    this.postLikeStatusToApp(res.bean.isLike)
                    this.postArticleUserId(res.bean.userId)
                    resolve()
                }
            })
        })

     }
     postArticleUserId(userId){
         //发送收藏状态到App
         let message = {
             type:"setUserId",
             content:{
                 setUserId:userId
             }
         }
         this.sendMessageToApp(message)
     }
     postCollectStatusToApp(isCollection){
         //发送收藏状态到App
         let message = {
             type:"setCollect",
             content:{
                 setCollect:isCollection
             }
         }
         this.sendMessageToApp(message)
     }
     postLikeStatusToApp(isLike){
         let message = {
             type:"setLike",
             content:{
                 setLike:isLike
             }
         }
         this.sendMessageToApp(message)
     }
    renderHeadPic(){
        //头图
        let {article} = this.state;
        return <div className={"headPic-wrapper"} style={{height:parseInt(window.screen.width*200/375)}}>
            {article.headPic&&<img src={FormatResourceUrl(article.headPic)} alt="头图"/>}
        </div>
    }
    renderAvatar(){
        //作者头像
        let {article} = this.state;
        return <div className={"author-avatar-wrapper"}>
            <Avatar avatarUrl={FormatResourceUrl(article.userHeadPic)} style={{width:58,height:58}}></Avatar>
        </div>

    }
     renderTagList(){
         let {article} = this.state;
         let tagList = article.tagName?[article.tagName]:[]
         return tagList.length>0&&<div className={"article-tag-wrapper"}>
             <TagList tagList={tagList}/>
         </div>
     }
    comment(comment){
        // 评论 与App 通信

    }
    searchMoreReply(comment){
        //查看更多回复
        this.props.changeRelatedComment({
            relatedComment:comment
        })
        this.props.history.push("/app/answer-detail")

    }
    loadMore(){
        if(!this.canLoadMore){
            return
        }
        let oldPage = this.state.currentPage;
        this.setState({
            currentPage:++oldPage,
            loadMoreBtn:'加载中...'
        },()=>{
            this.getCommentList((data) => {
                if(data.length<this.state.pageSize){
                    //
                    this.canLoadMore = false;
                }else{
                    this.canLoadMore = true
                }
            })
        })
    }
    renderComment(){
        return <div className="comment-wrapper" id="comment-wrapper" ref="commentWrapper">
            <div className="comment-header font-bolder">
                评论区
            </div>
            <div className="hr-line"></div>
            <div className="list-wrapper" ref="listWrpper" >
                <div className="comment-list" >
                    {this.renderCommentList()}
                    {this.state.showOpeBtn&&<div className="bottom-state">
                        {this.state.loadMoreBtn}
                    </div>}
                </div>
            </div>
        </div>

    }
    renderCommentList(){
        let {commentList} = this.state;
        if(commentList&&commentList.length){
            return commentList.map((comment,key)=>{
                return  <Comment key={key} comment = {comment} index={key}
                                 changeListState={this.changeListState.bind(this)}
                                 commentCallBack={()=>{this.comment(comment)}}
                                 searchMoreReply = {()=>{this.searchMoreReply(comment)}}/>
            })
        }else{
            return <NoDataView type={"comment"} noticeText={"暂无评论"} imgStyle={{width:120,height:120}}/>
        }

    }
    render() {
        if(this.state.scroller){
            this.state.scroller.on('scroll',(pos) => {
                console.log("gundong")
             })
            this.state.scroller.on('scrollEnd',(pos) => {
                console.log("end")
                if(this.state.enablescroll){
                    let oldPage = this.state.currentPage;
                    this.setState({
                        enablescroll: false,
                        currentPage:++oldPage,
                        load:'加载中....'
                    },()=>{
                        this.getCommentList(() => {
                            this.state.scroller.finishPullUp();
                            this.setState({
                                enablescroll: true
                            })
                        })
                    })

                }
            })
            this.state.scroller.on('pullingDown',() => {
                //获取最新数据
                console.log("下拉")
                setTimeout(() => {
                    this.state.scroller.finishPullDown()
                    this.state.scroller.scrollTo(0,0,0)
                },1000)

            })
            this.state.scroller.on('pullingUp',() => {
                console.log("上拉")
                if(this.state.enablescroll){
                    let oldPage = this.state.currentPage;
                    this.setState({
                        enablescroll: false,
                        currentPage:++oldPage,
                        load:'加载中....'
                    },()=>{
                        this.getCommentList(() => {
                            this.state.scroller.finishPullUp();
                            this.setState({
                                enablescroll: true
                            })
                        })
                    })

                }
            })


        }
        let {article,loading}  = this.state;
        let {title,publishTime,content,avatar,nickName} = article;
        return (
            <div className="newsWrap" style={{"minHeight": window.innerHeight}}>
                {this.renderHeadPic()}
                <div className={"article-content"}>
                    <div className="article-radius"></div>
                    {this.renderAvatar()}
                    {this.renderTagList()}
                    <h3 className={"article-title mar-top-10"}>{title}</h3>
                    {!loading&&<p className="article-description">
                        来源：{nickName||""}&nbsp;&nbsp;{publishTime?moment(publishTime).format('MM月DD日 HH:mm'):moment(Date.parse(new Date())).format('MM月DD日 HH:mm')}
                    </p>}
                    <div className="article-detail" ref = {view =>this.articleView = view}>
                    </div>
                </div>
                <div className="cut-off-view"></div>
                {this.renderComment()}

            </div>
        )
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
        appMessage:state.CommonDetail.appMessage,


    }
}
function mapDispatchToProps(dispatch) {
    return {
        changeRelatedComment: bindActionCreators(caimiAction,dispatch)
    }
}
export default  connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleInfo)
