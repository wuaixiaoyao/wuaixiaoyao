/**
 * @author wuaixiaoyao
 * @date 2018/6/8
 * @Description:对话框
*/

import React ,{Component} from "react";
import CaimiBaseModal from "../baseModal/baseModal"
import "./dialog.scss"
export default class CaimiDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            visible:this.props.visible,
            title:this.props.title
        }

    }
    componentWillMount(){

    }
    componentWillReceiveProps(){

    }
    shouldComponentUpdate(nextProps){
        return this.state.visible !== nextProps.visible ||this.state.title !== nextProps.title
    }
    render(){
        let {visible,title} = this.state;
        return <CaimiBaseModal visible={visible}>
                <div className="caimi-dialog">
                    <div className="caimi-dialog-content" onClick={e=>e.stopPropagation()}>
                        <div className="caimi-dialog-header">
                            {title}
                        </div>
                        <div className="caimi-dialog-body">
                            {this.props.children}
                        </div>
                        <div className="caimi-dialog-footer">

                        </div>
                    </div>
                </div>
        </CaimiBaseModal>
    }
}


