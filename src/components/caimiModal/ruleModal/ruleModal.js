/**
 * @author wuaixiaoyao
 * @date 2018/6/7
 * @Description: 规则或协议弹窗
*/
import React ,{Component} from 'react';
import CaimiBaseModal from '../baseModal/baseModal'
import "./rule.scss"
export default class  RuleModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            style:this.props.style,
            visible:this.props.visible,
            title:this.props.title,
            showHeader:this.props.showHeader,
            showFooter:this.props.showFooter,
            footerText:this.props.footerText
        }
        console.log(this.props.showFooter||true)
    }
    static defaultProps = {
        showHeader:true,
        showFooter:false,
        footerText:"我知道了",

    }
    componentWillReceiveProps(nextProps){
        console.log('rule rceiveProps',nextProps)
        if(nextProps.visible!=='undefined'||nextProps.title!=='undefined'||nextProps.footerText!=='undefined'){
            if(nextProps.visible!== this.state.visible||nextProps.title!== this.state.title){
                this.setState({
                    visible:nextProps.visible,
                    title:nextProps.title,
                    showFooter:nextProps.showFooter,
                    footerText:nextProps.footerText
                })
            }
        }

    }
    shouldComponentUpdate(nextProps,nextState){
        //return nextProps.visible!== this.state.visible
        return true
    }
    componentWillUpdate(){
        console.log('componentWillUpdate')

    }
    onCloseCallback(event){
        //关闭的回调
        if(this.props.onClose){
            this.props.onClose();
        }
        // event.stopPropagation();    //标准
        // event.cancelBubble = true;  //IE
    }
    render(){
        let {visible,style,title,showHeader,showFooter,footerText} = this.state;
        return (
            <CaimiBaseModal visible={visible} >
                <div className="caimi-modal" >
                    <div className="caimi-modal-content" style={style} onClick={e => e.stopPropagation()}>
                        {showHeader&&<div className="caimi-modal-header">
                            {title}
                        </div>}
                        <div className="caimi-modal-body">
                            {this.props.children}
                        </div>
                        {showFooter
                           &&<div className="caimi-modal-footer" onClick={this.onCloseCallback.bind(this)}>
                                     {footerText}
                             </div>
                        }

                    </div>
                </div>
        </CaimiBaseModal>)


    }
}