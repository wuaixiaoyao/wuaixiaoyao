/**
 * @author wuaixiaoyao
 * @date 2018/8/17
 * @Description: 标签列表
*/
import React,{Component} from "react"
import "./tagList.scss"
export default class TagList extends  Component{
    constructor(props){
        super(props)
        this.state = {
            //
            type:this.props.type,
            tagList:this.props.tagList
        }
    }
    static defaultProps = {
        type:"common",
        tagList:[
            "比特币","金融"
        ]
    }
    componentWillReceiveProps(nextProps,nextState){
        if(nextProps.tagList !== this.state.tagList){
            this.setState({
                tagList:nextProps.tagList
            })
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.tagList !== this.state.tagList
    }
    renderTag(tag,index){
        let {type} = this.state;
        let tagClass = "tag-content"
        if(type=="course"){
            tagClass = "tag-course"
        }else if (type == ""){

        }else{
            tagClass = "tag-content"
        }
        return <span className={tagClass} key={index}>
            {tag}
        </span>
    }
    render(){
        let {tagList} = this.state;
        return(
            <div className="tag-wrapper">
                {tagList.map((tag,index)=>{
                    return this.renderTag(tag,index)
                })}
            </div>
        )
    }
}

