/**
 * @author wuaixiaoyao
 * @date 2018/5/23
 * @Description: 头像组件
*/
import React,{Component} from 'react';
import './avatar.scss'
import defaultAvatar from '../../styles/imgs/default-avator.png'
export default class Avatar  extends Component{
    constructor(props){
        super(props)
    }
    static  defaultProps = {
        avatarUrl:defaultAvatar,
        style:{
            width:64,
            height:64
        }
    }
    notFound(event){
       //
       let img = event.srcElement;
       img.src = defaultAvatar;
       img.onError = null;
    }
    render(){
        let {avatarUrl,style} = this.props;
        let {width,height} = style
        return(
            <div className="avatar-wrapper" style={{width,height}}>
                <img src={avatarUrl||defaultAvatar}  onError={this.notFound.bind(this)}
                     alt="头像" className="avatar" style={style}/>
            </div>
        )
    }

}