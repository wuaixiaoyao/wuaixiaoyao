/**
 * @author wuaixiaoyao
 * @date 2018/8/16
 * @Description: 额课程分享页
*/
import React from "react";
import AppBaseComponent from "../../../components/appBaseComponent";
import "./course.scss"
import TagList from "../../../components/common/tagList/tagList";
import {getCourseByCourseId} from "../../../api/api"
import {H5Util,FormatResourceUrl} from '@/utils/index'

export default class Course extends AppBaseComponent{
    constructor(props){
        super(props)
        this.state = {
            course:{
                name:"",
                cover:"",
                tagNameList:[
                    "金融",
                    "基金",
                    "虚拟货币"
                ],
                subscription:10,
                tips:"111",
                intro:"",
                suitCrowds:"",

            }

        }
    }
    componentWillMount(){
       let params = {
           pageName:"course",
           eventName:"loading"
       }
       this.bury(params)
        let {search} = this.props.location;
        console.log(search)
        if(search){
            let message = H5Util.serilizeURL(search);
            if(message.courseId){
                this.getCourseByCourseId(message.courseId)
            }
        }

    }
    getCourseByCourseId(courseId){
        //获取课程详情
        getCourseByCourseId({courseId}).then(res=>{
            if(res.code == 0 && res.bean){
                let {name,cover,tagNameList,subscription,tips,intro,suitCrowds} = res.bean
                this.setState({
                    course:{
                        name,cover,tagNameList,subscription,tips,intro,suitCrowds
                    }
                })
                this.refs.textContent.innerHTML = intro
            }
        })

    }
    renderTagList(){
        //标签
        let {tagNameList} = this.state.course;
        return   <div style={{marginTop:5}}>
            <TagList tagList={tagNameList} type={"course"}></TagList>
        </div>
    }
    renderCourseCover(){
        //封面
        let {cover} = this.state.course;
        return (
            <div className="course-cover">
                {cover&&<img className="course-img" src={FormatResourceUrl(cover)} alt="封面图"/>}
                <div className="cover-detail">
                    <p className="cover-name font-bolder">贪玩蓝月全新版本解读</p>
                    {this.renderTagList()}
                </div>
            </div>
        )
    }
    renderCourseIntro(){
        //课程简介
        let {subscription,intro} = this.state.course
        return <div>
            <div className="intro-header">
                <span className={"title font-bolder"}>课程简介</span>
                <span className={"sub-num"}>{subscription}人订阅</span>
            </div>
            <div className="hr-line"></div>
            <div className="detail-wrapper">
                <div className="text-wrapper">
                    <div className="text-content" ref="textContent">

                    </div>
                </div>
            </div>
        </div>

    }
    renderBetterPeople(){
        //事宜人群
        let {suitCrowds} = this.state.course;
        return <div>
            <div className="intro-header">
                <span className={"title font-bolder"}>适宜人群</span>
            </div>
            <div className="hr-line"></div>
            <div className="text-wrapper">
                <div className="text-content">
                    {suitCrowds}
                </div>
            </div>
        </div>
    }
    render(){
        let {cover} = this.state.course;
        return <AppBaseComponent>
                <div className="course-wrapper" onClick={()=>{this.goToLink()}}>
                    {this.renderCourseCover()}
                    {this.renderCourseIntro()}
                    <div className="cut-off-view">
                    </div>
                    {this.renderBetterPeople()}
                    
                </div>
        </AppBaseComponent>
    }
}