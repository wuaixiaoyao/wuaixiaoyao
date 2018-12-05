/**
 * @author wuaixiaoyao
 * @date 2018/7/3
 * @Description:奖励弹窗
*/
import React ,{Component} from 'react';
import RuleModal from '../ruleModal/ruleModal'
import "./rewardModal.scss"
export default class  RewardModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible:this.props.visible
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.visible!=='undefined'&&nextProps.visible!== this.state.visible){
            this.setState({
                visible:nextProps.visible
            })
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        // return nextProps.visible!== this.state.visible
        return true
    }
    componentWillUpdate(){
        console.log('componentWillUpdate')

    }
    hideModal(){
        this.setState({
            visible:false
        })
    }
    onCloseCallback(){
        //关闭的回调
        if(this.props.onClose){
            this.props.onClose();
        }
    }
    render(){
        let {visible} = this.state;
        return (
            <RuleModal visible={visible} showHeader = {false}>
                <div className="caimi-modal">
                    <div className="caimi-modal-content">
                        <div className="caimi-modal-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </RuleModal>)


    }
}