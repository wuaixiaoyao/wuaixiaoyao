/**
 * @author wuaixiaoyao
 * @date 2018/9/19
 * @Description: 跳转股票页 中间页
*/
import React ,{Component} from 'react';
import {Toast} from "antd-mobile"
import {H5Util} from "../../utils";
import BaseComponent from "../../components/BaseComponent";
export default class StockRedirectPage extends BaseComponent{
    constructor(props){
        super(props)
        this.state ={
            //
        }
    }
    componentWillMount(){
        Toast.loading("加载中...")
        let {search} = this.props.location;
        let message = H5Util.serilizeURL(search)
        if(message&&message.code&&message.fromApp){
            let {code,name,type} = message;
            // 向App 传股票code
            let appMessage = {
                type:"stock",
                content: {
                    code,
                    name:decodeURI(name),
                    type
                }
            }
            console.log(appMessage)
            this.sendMessageToApp(appMessage)
        }
    }

    render(){
        return <div>

        </div>
    }
}
