/**
 * @author wuaixiaoyao
 * @date 2018/6/25
 * @Description:新闻或大智慧文章
*/
import React ,{Component} from 'react';
import BaseComponent from '../../../components/BaseComponent'
import {Toast} from "antd-mobile"
import {getNewsInfo, collection, SHAREHOST, getCommentList} from "../../../api/api"
import './newsInfo.scss'
import {H5Util} from '@/utils/index'
import moment from "moment";
import NoDataView from "../../../components/noDataView/noDataView"
import Comment from "../../../components/common/comment/comment"
import TagList from "../../../components/common/tagList/tagList"
import {COMMENT_TYPE} from "../../../constant/index"
import Collect from "../../../components/collect/collect";
export default class NewsInfo extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            userId:"",
            newsType:1,
            newsCode:"",
            companyCode:"",
            visible:false,
            article:{
                publishTimeStamp:Date.parse(new Date()),
                tagName:"",
                newsText:""
            },
            isCollection:null,
            collectType:null,
            code:"",
            currentPage:1,
            pageSize:20,
            loading:false,
            showCollection:false,//展示收藏按钮
            loadMoreBtn:"上拉加载更多",
            commentList:[],
            showOpeBtn:false,
        }
        this.commentType = "NewsSK";
        this.canLoadMore = true;

    }
    componentWillMount(){
        this.initNewsInfo();
    }
    componentDidMount() {
        window.document.addEventListener('message',(e)=>{
            const message =JSON.parse(e.data);
            if(message.scrollToComment){
                window.scrollTo(0,this.commentWrapperOffsetTop);
            }
            if(message.replaySuccess||message.commentSuccess){
                //刷新 评论列表
                // let {newsCode} = this.state;
                // Toast.info(newsCode)
                // this.getCommentList(newsCode,this.commentType)
            }
            if(message.refreshCommentList){
                this.refreshCommentList(message.refreshCommentList)
            }
            if(message.appToken&&message.userId){
                // 获取App token 和 param
                localStorage.setItem("caimiH5token",message.appToken);
                localStorage.setItem("userId",message.userId);
            }
        })
        window.onscroll = ()=>{
            let Util = new H5Util;
            if (Util.getScrollTop() + Util.getClientHeight() == Util.getScrollHeight()) {
                if(this.loadTimeout){
                    clearTimeout(this.loadTimeout)
                    this.loadTimeout = null
                }
                this.loadTimeout = setTimeout(this.loadMore(),100)
            }
        }
    }
    initNewsInfo(){
        let {search} = this.props.location;
        if(search){
            let message = H5Util.serilizeURL(search);
            //Toast.info(message.userId)
            this.initParams(message)
            console.log(message)
            if(message.fromApp){
                //
                this.setState({
                    showCollection:false
                })
            }else{
                this.setState({
                    showCollection:true
                })
            }
        }
    }
    initParams(param){
        let {userId,newsType,newsCode,companyCode} = param;
        //Toast.info(userId,newsType,newsCode,companyCode)
        if(newsType&&newsCode){
            this.setState({
                userId,newsType,newsCode,companyCode
            })
            if(newsType == 1){
                //股票新闻
                this.commentType = COMMENT_TYPE.NEWSSK;

            }else if(newsType == 2){
                // 指数新闻
                this.commentType = COMMENT_TYPE.NEWSME
            }
            this.newsCode = newsCode;
            this.handleMultipleRequest([ this.getNewsInfo(param), this.getCommentList()])
        }
    }

    getNewsInfo(param){
        let {userId,newsType,newsCode,companyCode} = param;
        let params = {
            newsType,
            newsCode,
            userId,
            companyCode
        }
        this.setState({
            loading:true
        })
        return new Promise((resolve,reject)=>{
            getNewsInfo(params).then(res=>{
                if(res&&res.code == 0&&res.bean){
                    this.setState({
                        loading:false
                    })
                    let {isCollection,collectType,code,isLike} = res.bean;
                    this.setState({
                        article:res.bean,
                        isCollection,
                        collectType,
                        code
                    })
                    if(res.bean.newsText){
                        this.articleView.innerHTML = res.bean.newsText;
                        if(!this.state.showCollection){
                            this.commentWrapperOffsetTop = document.getElementById("comment-wrapper").offsetTop;
                            console.log(this.commentWrapperOffsetTop);
                        }

                    }
                    resolve()
                     this.postCollectStatusToApp(isCollection)
                     this.postLikeStatusToApp(isLike)

                }
            })
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
    getCommentList(callback){
        // 获取评论列表
        let {currentPage,pageSize} = this.state;
        let params = {
            relateId:this.newsCode,
            relateType:this.commentType,
            currentPage,
            pageSize
        }
        return new Promise((resolve,reject)=>{
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
                    if(callback&&typeof callback == "function"){
                        callback(res.data)
                    }
                    resolve()

                }
            })
        })


    }
    loadMore(){
        if(!this.canLoadMore){
            return
        }
        let oldPage = this.state.currentPage;
        let {pageSize} = this.state;
        this.setState({
            currentPage:++oldPage,
            loadMoreBtn:'加载中...'
        },()=>{
            this.getCommentList((data) => {

                if(data.length<pageSize){
                    //
                    this.canLoadMore = false;
                }else{
                    this.canLoadMore = true;
                }
            })
        })
    }
    postCollectStatusToApp(isCollection){
        //发送消息到App
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
    clickCallback(){
        let {userId,newsCode,newsType,article,isCollection,collectType,code:relateCode} = this.state;
        let {newsTitle:relateTitle,newsSource:relateSource,publishTimeStamp:relateTimeStamp} = article;
        if(!collectType){
            return
        }
        let type = isCollection == 0?1:0;
        //relateTitle  relateCode relateSource  relateTimeStamp
        let params = {
            userId,
            type,
            relateId:newsCode,
            collectType,
            relateTitle,
            relateSource,
            relateTimeStamp,
            relateCode
        }
        collection(params).then(res=>{
            if(res&&res.code == 0){
                this.setState({
                    isCollection:Boolean(type)
                })
                Toast.info((type==1?"收藏成功！":"取消收藏成功！"))
            }
        })

    }

    renderTagList(){
        let {article} = this.state;
        let tagList = article.tagName?[article.tagName]:[]
        return tagList.length>0&&<div className={"article-tag-wrapper"}>
            <TagList tagList={tagList}/>
        </div>
    }
    renderCommentList(){
        let {commentList} = this.state;
        if(commentList&&commentList.length){
            return commentList.map((comment,key)=>{
                return  <Comment key={key} comment = {comment} index={key}
                                 changeListState={this.changeListState.bind(this)}
                />
            })
        }else{
            return <NoDataView type={"comment"} noticeText={"暂无评论"} imgStyle={{width:120,height:120}}/>
        }


    }
    renderComment(){
        let {commentList} = this.state;
        return <div className="comment-wrapper" id="comment-wrapper" ref="commentWrapper">
            <div className="comment-header font-bolder">
                评论区
            </div>
            <div className="hr-line"></div>
            <div className="comment-list">
                {this.renderCommentList()}
                {this.state.showOpeBtn&&<div className="bottom-state">
                    {this.state.loadMoreBtn}
                </div>}
            </div>
        </div>
    }
    render() {
        let {isCollection,article,loading}  = this.state;
        let {newsTitle,newsAuthor,newsSource,publishTimeStamp,newsText} = article;
        return (
            <div className="newsWrap" style={{"minHeight": window.innerHeight}}>
                    {this.renderTagList()}
                    <h3 className={"article-title"}>{newsTitle}</h3>
                   {!loading&&<p className="article-description">
                        来源：{newsAuthor||newsSource||""}&nbsp;&nbsp;{moment(publishTimeStamp).format('MM月DD日 HH:mm')}
                    </p>}
                    <div className="article-detail" ref = {view =>this.articleView = view}>
                    </div>
                    {!this.state.showCollection&&<div className="cut-off-view"></div>}
                    {!this.state.showCollection&&this.renderComment()}
                    {/*<div className="white-space"></div>*/}
                    {this.state.showCollection&&<Collect ifCollected = {isCollection} clickCallback={()=>{this.clickCallback()}} />}

            </div>
        )
    }
}