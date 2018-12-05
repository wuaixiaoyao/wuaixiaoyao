/**
 * @author wuaixiaoyao
 * @date 2018/5/17
 * @Description: 自定义modal组件
*/
import  React ,{Component} from 'react';
import './baseModal.scss'
export default class CaimiBaseModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible:this.props.visible
        }
    }
    componentWillReceiveProps(nextProps,nextState){
        console.log(nextProps,"receiveProps")
        if(nextProps.visible!== undefined&&nextProps.visible !== this.state.visible){
            this.setState( {
                visible:nextProps.visible
            })
        }

    }
    shouldComponentUpdate(nextProps){
        // if(nextProps.visible!== undefined&&nextProps.visible !== this.state.visible){
        //     return true
        // }
        return true
    }
    showModal(){
        this.setState({
            visible:true
        })
    }
    hideModal(event){
         this.setState({
             visible:false
         })
        console.log(event.target,"冒泡泡")
    }
    render(){
        let {visible} = this.state;
        return(
            visible&&
            <div className={"caimi-modal-wrapper"} onClick={this.hideModal.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}
