/**
 * @author wuaixiaoyao
 * @date 2018/9/3
 * @Description:
*/
import React ,{Component} from "react";
import CaimiBaseModal from "../baseModal/baseModal"
import shareText from "../../../styles/imgs/common/share.png"
import "./shareModal.scss"
export default class WeChatShareModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            shareModalVisible:this.props.visible
        }
    }
    static defaultProps = {
        visible:false
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible!=='undefined'&&nextProps.visible!== this.state.shareModalVisible){
            this.setState({
                shareModalVisible:nextProps.visible,

            })
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        return true
    }
    hideModal(){
        this.setState({
            shareModalVisible:false
        })
    }
    render(){
        let  {shareModalVisible} =  this.state;
        return  <CaimiBaseModal visible={shareModalVisible}>
            <div className="share-content" onClick={this.hideModal.bind(this)}>
                <img className="share-text" src={shareText} alt="点击... 分享"/>
            </div>
        </CaimiBaseModal>
    }
}