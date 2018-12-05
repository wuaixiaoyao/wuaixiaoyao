/**
 * @author wuaixiaoyao
 * @date 2018/6/25
 * @Description:公告详情页
 */
import React ,{Component} from 'react';
import BaseComponent from '../../../components/BaseComponent'
import {Toast} from "antd-mobile"
import moment from "moment"
import Collect from "../../../components/collect/collect"
import {getAnnouncementsInfo, collection, getCommentList} from "../../../api/api"
import {Page } from 'react-pdf';
import { Document } from 'react-pdf/dist/entry.webpack'
import NoDataView from "../../../components/noDataView/noDataView"
import Comment from "../../../components/common/comment/comment";
import TagList from "../../../components/common/tagList/tagList"

import './newsInfo.scss'
import {H5Util} from '@/utils/index'
const announcement = {
    announcementId:"",
    announcementTitle:"好利来：级等级的大家电极端阶段的道具好利来好利来",
    declareDate:"",
    annPdfUrl:"http://172.16.6.30:8111/download/pdf/2018/7/11/4529881",
    isOrg:1,
    //0 为PDF  1 内容
    isCollection:0,
    annText:"苏州晶方半导体科技股份有限公司\n"
}
export default class NewsInfo extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            announcement:{
                declareDate:Date.parse(new Date()),
                isOrg:true,
                annText:"",
                dataSource:"",
                tagName:""
            },
            userId:"",
            announcementsType:1,
            announcementsId:"",
            //4602760
            companyCode:"",
            //80198508
            pdfUrl:"http://172.16.6.30:8111/download/pdf/2018/7/11/4530641",
            page:10,
            isCollection:undefined,
            collectType:null,
            numPages: null,
            code:"",
            pageNumber: 1,
            commentList:[
            ],
            currentPage:1,
            pageSize:20,
            loading:false,
            showCollection:false,//展示收藏按钮
            loadMoreBtn:"上拉加载更多",
            showOpeBtn:false
        }
        this.canLoadMore = true
    }
    componentWillMount(){
        this.initNoticeInfo()
    }
    componentDidMount(){
        let {annText,isOrg} = this.state.announcement;
        if(isOrg){
            this.noticeView.innerHTML = annText;
        }
       let metaView = document.querySelector('meta[name="viewport"]');
        metaView.setAttribute("content","width=device-width,initial-scale=1.0")
        window.document.addEventListener('message',(e)=>{
            const message =JSON.parse(e.data);
            if(message.scrollToComment){
                window.scrollTo(0,this.commentWrapperOffsetTop);
            }
            if(message.replaySuccess||message.commentSuccess){
                //刷新 评论列表
                // let {announcementsId} = this.state;
                // this.getCommentList(announcementsId)
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
    initNoticeInfo(){
        let {search} = this.props.location;
        if(search){
            let message = H5Util.serilizeURL(search);
            if(message.userId&&message.announcementsId){
                this.initParams(message)
            }
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
            console.log(message)
        }
    }
    initParams(param){
        let {userId,
            announcementsType,
            announcementsId,
            companyCode} = param;
        if(userId&&announcementsType&&announcementsId){
            this.setState({
                userId,
                announcementsType,
                announcementsId,
                companyCode
            },()=>{
                this.getAnnouncementsInfo(param)
                //评论列表
                this.getCommentList()
            })

        }
    }
    getAnnouncementsInfo(param){
        // Toast.loading("加载中")
        this.setState({
            loading:true
        })
        let {announcementsType,announcementsId,companyCode,userId} = param;
        let params = {
            announcementsType,
            announcementsId,
            companyCode,
            userId
        };
        getAnnouncementsInfo(params).then(res=>{
            if(res&&res.code == 0&&res.bean){
                // Toast.hide()
                this.setState({
                    loading:false
                })
                let {isCollection,collectType,code} = res.bean;
                 this.setState({
                    announcement:res.bean,
                    collectType,
                    isCollection,
                    code
                })
                if(res.bean.isOrg&&res.bean.annText){
                    this.noticeView.innerHTML = res.bean.annText
                    this.commentWrapperOffsetTop = document.getElementById("comment-wrapper").offsetTop;
                    console.log(this.commentWrapperOffsetTop);
                }
                if(!res.bean.isOrg){
                    Toast.loading("数据解析中...")
                }
                this.postCollectStatusToApp(isCollection)
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
    getCommentList(callback){
        // 获取评论列
        let {currentPage,pageSize} = this.state;
        let params = {
            relateId:this.state.announcementsId,
            relateType:"Announcement",
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
                    commentList:oldCommentList.concat(res.data),
                    loadMoreBtn:res.data.length == pageSize?"上拉加载更多":"暂无更多评论"

                },()=>{
                    //Toast.info("刷新评论列表成功")
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
            }
        })

    }
    loadMore(){
        //加载更多
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
                //

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
    clickCallback(){
        let {userId,announcementsId:relateId,announcement,isCollection,collectType,code:relateCode} = this.state;
        let {annTitle:relateTitle,dataSource:relateSource,declareDate:relateTimeStamp} = announcement;
        let type = isCollection == 0?1:0;
        if(!collectType){
            return
        }
        let params = {
            userId,
            type,
            relateId,
            collectType,
            relateTitle,
            relateCode,
            relateSource,
            relateTimeStamp

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
    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
        console.log(numPages)
    }
    onItemClick =({ pageNumber }) =>{
        alert('Clicked an item from page ' + pageNumber + '!')
    }
    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
        Toast.hide()

    }
    renderLoader(){
        Toast.loading("加载中")
    }
    renderPage(){
        let {numPages} = this.state, pageArray = [];
        for(var i = 1 ;i<= numPages;i++){
            pageArray.push(
                <Page pageNumber={i} key={i} loading={""}/>
            )
        }
        return pageArray
    }
    renderPdf(pdfUrl){
        return(
           <div ref={view => this.pdfView = view} className={"padding-12"}>
               <Document loading = {()=>{this.renderLoader()}}
                   error={<div style={{marginTop:0}}><NoDataView type={"search"} noticeText={"数据解析失败，看看别的文章吧～"}></NoDataView></div>}
                   file={pdfUrl}   className="react-pdf-canvas" renderTextLayer={false}
                   onLoadSuccess={this.onDocumentLoad} onLoadError ={() => {Toast.hide()}}
                        // noData={<NoDataView  type={"search"} noticeText={"暂时没有数据！"}></NoDataView>}
               >
                   {this.renderPage()}
               </Document>
           </div>
         )
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
    renderCommentList(){
        let {commentList} = this.state;
        if(commentList&&commentList.length){
            return commentList.map((comment,key)=>{
                return  <Comment key={key} comment = {comment} index={key}
                                 changeListState={this.changeListState.bind(this)}/>
            })
        }else{
            return <NoDataView type={"comment"} noticeText={"暂无评论"} imgStyle={{width:120,height:120}}/>
        }
    }
    renderTagList(){
        let {announcement} = this.state;
        let tagList = announcement.tagName?[announcement.tagName]:[]
        return tagList.length>0&&<div className={"article-tag-wrapper"}>
            <TagList tagList={tagList}/>
        </div>
    }
    render() {
        let {isCollection,announcement,loading}  = this.state;
        let {isOrg,annTitle,dataSource,declareDate,annText,annPdfUrl} = announcement;
        return (
            <div className="notice-wrap" style={{"minHeight": window.innerHeight}}>
                {!loading&&<div className="notice-content">
                    {this.renderTagList()}
                    <h3 className={"article-title"}>{annTitle}</h3>
                    <p className="article-description">
                        来源：{dataSource}&nbsp;&nbsp;{moment(Number(declareDate)).format('MM月DD日 HH:mm')}
                    </p>
                </div>}
                {Boolean(isOrg)&&<div className="notice-detail" ref = {view =>this.noticeView = view}>
                </div>}
                {!Boolean(isOrg)&&<div>
                   {this.renderPdf(annPdfUrl)}
                </div>}
                {!this.state.showCollection&&<div className="cut-off-view"></div>}
                {!this.state.showCollection&&this.renderComment()}
                {this.state.showCollection&&<Collect ifCollected = {isCollection} clickCallback={()=>{this.clickCallback()}} />}
             </div>
        )
    }
}