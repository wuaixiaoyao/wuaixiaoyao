/**
 * @author wuaixiaoyao
 * @date 2018/6/29
 * @Description: 收藏组件
*/
import React ,{Component}from "react"
import "./collect.scss"
import collectImg from "../../styles/imgs/collect/collect_big@3x.png"
import afterCollectImg from "../../styles/imgs/collect/collectbg@3x.png"
export default  class Collect extends Component{
    constructor(props){
        super(props)
        this.state = {
            ifCollected:this.props.ifCollected
        }
    }
    componentWillReceiveProps(nextProps){
        //
        let {ifCollected} = nextProps
        if(ifCollected!== this.state.ifCollected) {
            this.setState({ifCollected})
        }
    }
    shouldComponentUpdate(nextProps){
        return nextProps.ifCollected!== this.state.ifCollected
    }
    clickCallback(){
        //
        if(this.props.clickCallback){
            this.props.clickCallback();

            console.log("收藏")
        }
    }
    render(){
        let {ifCollected} = this.state;
        return (
            <div className={"collect-wrapper"}>
                <div onClick={()=>{this.clickCallback()}}>
                    <img className={"collect-img"}  src={ifCollected?afterCollectImg:collectImg} alt="收藏" />
                </div>
            </div>
        )
    }
}
