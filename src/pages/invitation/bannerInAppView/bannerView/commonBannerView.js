/**
 * @author wuaixiaoyao
 * @date 2018/10/23
 * @Description: 2.1后续版本 图片banner统一模板
*/
import React, {Component} from 'react';
import "./bannerView.scss"
import {H5Util,FormatResourceUrl} from '@/utils/index'

export default class CommonBannerView extends Component{
    constructor(props){
        super(props)
        this.state = {
            innerImg:""
        }
    }
    componentWillMount(){
        let {search} = this.props.location;
        let message = H5Util.serilizeURL(search);
        if(message){
            //
            let {innerImg} = message;
            if(innerImg){
                this.setState({
                    innerImg
                })
            }
        }


    }
    componentDidMount(){
        //

    }
    render(){
        let {innerImg} = this.state;
        return(
            <div className="bannerWrap" style={{  "minHeight": window.innerHeight}}>
                <img src={innerImg} alt="背景图" className="bannerBg"/>
            </div>
        )
    }

}
