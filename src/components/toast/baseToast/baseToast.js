/**
 * @author wuaixiaoyao
 * @date 2018/6/8
 * @Description: 基础toast 组件
*/
import React ,{Component} from 'react'
import caimiBaseModal from '../../caimiModal/baseModal/baseModal'
export default  class BaseToast extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible:this.props.visible,

        }
    }
    componentWillMount(){

    }
    componentWillReceiveProps(nextProps){
        //



    }
    shouldComponentUpdate(){
        //

        return true
    }
    render(){
        let {visible} = this.state;
        return (
            <caimiBaseModal visible = {visible} modalType={"toast"}>
                  <div className="toastContent">

                  </div>
            </caimiBaseModal>
        )
    }



}

