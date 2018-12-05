/**
 * @author wuaixiaoyao
 * @date 2018/9/3
 * @Description:二维码组件
*/
import React,{Component} from "react"
const QRCode = require("qrcode.react/lib/index.js");
console.log(QRCode)
class QRCodeView extends Component{
    constructor(props){
        super(props)
        this.state={
            url:this.props.url,
            size:this.props.size
        }
    }
    static defaultProps = {
        url:"",
        size:60
    }
    componentDidMount(){

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.url){
            this.setState({
                url:nextProps.url
            })
        }
    }
    shouldComponentUpdate(){
        //
        return true
    }
    render(){
        let {size,url} = this.state;
        return(
            <div>
                <QRCode size={size} value={url}/>
            </div>
        )
    }
}

export default QRCodeView

