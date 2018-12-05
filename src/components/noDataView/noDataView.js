/**
 * @author wuaixiaoyao
 * @date 2018/7/11
 * @Description: 无数据展示
*/

import React ,{Component} from "react";
import "./no-data-view.scss"
import CommonNoDataImg from "../../styles/imgs/noData/blankpage.png"
import SearchNoDataIg from "../../styles/imgs/noData/search.png"
import CommentNoDataImg from "../../styles/imgs/noData/comments.png"
export default class NoDataView extends Component{
    constructor(props){
        super(props)
        this.state = {
            noticeText:this.props.noticeText,
            type:this.props.type,
            imgStyle:this.props.imgStyle,
            wrapperStyle:{
                paddingTop:100,
                paddingBottom:100
            }

        }
    }
    static defaultProps = {
        noticeText:"",
        type:"common",
        imgStyle:{
            width:164,
            height:164
        },
    }
    componentWillMount(){

    }
    render(){
        let {noticeText,type,imgStyle,wrapperStyle} = this.state;
        let fontColor = (type!=="common")?"#B1CDF2":"9B9B9B";
        let NoDataImg = CommonNoDataImg;
        switch(type){
            //
            case "common":
                NoDataImg = CommonNoDataImg;
                break
            case "search":
                NoDataImg = SearchNoDataIg;
                break
            case "comment":
                NoDataImg = CommentNoDataImg;
                wrapperStyle = {
                    paddingTop:50,
                        paddingBottom:60
                }
                break
            default:
                NoDataImg = CommonNoDataImg;
                break

        }

        return(
            <div className="no-data-view" style={wrapperStyle}>
                <img src={NoDataImg} style={imgStyle} alt="无结果" className="no-data-img"/>
                <p className="no-data-text" style={{color:fontColor}}>
                    {noticeText}
                    {this.props.children}

                </p>
            </div>
        )
    }
}
