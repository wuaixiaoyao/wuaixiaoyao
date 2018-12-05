/**
 * @author wuaixiaoyao
 * @date 2018/11/28
 * @Description: 跑马灯
*/
import React from "react"
import "./horseRaceLamp.scss"
import {deepCopy,GetSlideDirection} from "../../utils/index"
export default class HorseRaceLamp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            swiperList:this.props.swiperList,
            autoPlay:this.props.autoPlay,//自动播放
            timeSpan:this.props.timeSpan,//时间间隔
            transitionDuration:this.props.transitionDuration,//动画时长
            activeIndex:this.props.initActiveIndex,//当前下表
            activePage:0,// 当前页面
        }

    }
    static defaultProps = {
        autoPlay:true,
        initActiveIndex:0,
        timeSpan:3000,
        transitionDuration:400,
        swiperList:[ ]
    }
    componentWillMount(){
        //
        this.autoPlay();
        this.swiperInterval((index)=>{
            this.swiperTimeout = setTimeout(()=>{
                this.setState({
                    activeIndex:0
                })
            },this.state.transitionDuration)
        })

    }
    autoPlay(){
        //自动轮播
        this.swiperInterval = (callback)=>{
            setInterval(()=>{
                this.setState(preState=>{
                    if(preState.activeIndex < preState.swiperList.length-1){
                        return {
                            activeIndex:preState.activeIndex+1
                        }
                    }else if(preState.activeIndex == preState.swiperList.length -1){
                        callback&&callback(preState.activeIndex+1)
                        return {
                            activeIndex:preState.activeIndex+1
                        }
                    }else{
                        return {
                            activeIndex:0
                        }
                    }
                })
            },this.state.timeSpan)
        }
    }
    componentDidMount(){
        //this.addListenerTouchScroll()
    }
    addListenerTouchScroll(){
        let startX, startY,moveEndX, moveEndY, X, Y;
        let _this = this;
        this.refs.swiperWrapper.addEventListener('touchstart', (ev)=>{
            ev.preventDefault();
            startX = ev.touches[0].pageX;
            startY = ev.touches[0].pageY;
            console.log(startX, startY)
        }, false);
        this.refs.swiperWrapper.addEventListener('touchmove', (e)=>{
            e.preventDefault();
            moveEndX = e.changedTouches[0].pageX;
            moveEndY = e.changedTouches[0].pageY;
            X = moveEndX - startX;
            Y = moveEndY - startY;
            if ( X > 0 ) {
                if(this.swiperInterval){
                    clearInterval(this.swiperInterval)
                    this.swiperInterval = null
                }
                this.setState(preState=>{
                    return {
                        activeIndex:preState.activeIndex-1
                    }
                },()=>{
                    console.log(this.state.activeIndex)
                })

            }else if ( X < 0 ) {
                //alert("向左");
                this.setState(preState=>{
                    return {
                        activeIndex:preState.activeIndex+1
                    }
                })
            }else if ( Y > 0) {
                alert("向下");
            }
            else if ( Y < 0 ) {
                alert("向上");
            }
            else{
                alert("没滑动");
            }

        }, false);

    }
    componentWillUnMount(){
        //
        if(this.swiperInterval){
            clearInterval(this.swiperInterval)
            clearTimeout(this.swiperTimeout)
            this.swiperInterval = null;
            this.swiperTimeout = null;
        }
    }
    renderSwiperContent(){
        let {swiperList,activeIndex} = this.state;
        let  newSwiperList = deepCopy(swiperList)
        newSwiperList.unshift(swiperList[swiperList.length-1])
        newSwiperList.push(swiperList[0])
        newSwiperList.push(swiperList[1])
        console.log(newSwiperList)
        return newSwiperList.map((swiper,index)=>{
            return <li className="swiper-item" key={index}>
                  <img  className={this.computedImgClass(activeIndex,index)} src={swiper.imgUrl} alt="图片"/>
            </li>
        })
    }
    computedImgClass(activeIndex,index){
        let imgClass = "swiper-img"
        if((activeIndex+1)==index){
            imgClass = "active-swiper-img"
        }
        return imgClass
    }
    renderTitleAndDesc(swiperList,activeIndex){
        //
        if(activeIndex == this.state.swiperList.length){
            activeIndex = 0
        }
        return <div className={"swiper-desc-content"}>
                <div className="pro-title">
                    {swiperList[activeIndex].title}
                </div>
                 {swiperList[activeIndex].desc&& <p className="pro-desc">
                       {swiperList[activeIndex].desc}
                   </p>}
        </div>
    }
    renderAnchors(){
        //渲染锚点
        let {swiperList,activeIndex} = this.state;
        if(activeIndex == this.state.swiperList.length){
            activeIndex = 0
        }
        return swiperList.map((swiper,index)=>{
            return <li className={activeIndex==index?"anchor-active":"anchor"} key={index} onClick={()=>{this.setState({
                activeIndex:index
            })}}
                       style={{marginRight:(index< swiperList.length -1)?10:0}}>
            </li>
        })
    }
    computedScroll(swiperList,activeIndex){
        if(activeIndex==0){
            return -(328-window.screen.width/2)
        }else{
            return -(activeIndex)*219-(328-window.screen.width/2)
        }
    }
    render(){
        let {swiperList,activeIndex,transitionDuration} = this.state;
        return  <div className={"caimi-swiper"}>
            <div className={"swiper-wrapper"} ref={"swiperWrapper"}>
                <div className="swiper-content" style={{
                    left:this.computedScroll(swiperList,activeIndex),
                    transition:activeIndex==0?"all 0s linear":`all ${transitionDuration}ms linear`}}>
                    {this.renderSwiperContent()}
                </div>
            </div>
            <div className="swiper-desc-wrapper">
                {this.renderTitleAndDesc(swiperList,activeIndex)}
            </div>
            <ul className="anchors-wrapper">
                {this.renderAnchors()}
            </ul>
        </div>


    }
}