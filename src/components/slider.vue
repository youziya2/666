// Slider组件
<template>
    <div id="slider">
        <div class="all-slider">
            <!-- 空间 -->
            <span class="slider-title">{{$buttonObj.space}}</span>
            <ul class="all-date" style="position: absolute;top: 0px;left:143px;" :id="spaceObj.id01">
                <li v-for="(item,index) in spaceArr" :key="index" class="slider-space" 
                :style="spaceObj.selectNum < index ? 'background:rgba(243, 243, 243,0.7);' : ''" @click="getChoice(index,spaceObj)">       
                </li>
                <div class="slider-date-select" style="left:0px" :ref="spaceObj.id02" :id="spaceObj.id02">
                    <span class="slider-date-right">||</span>
                </div>    
            </ul>
            <ul class="all-date">
                <li v-for="(item,index) in showObj" :key="index" :style="(spaceObj.selectNum)*10 > item.value-250 ? 'color:#fff' : 'color:rgb(0, 2, 16)'" class="space-able">{{item.label}}</li>
            </ul>
            <div style="display:inline-block;vertical-align: middle;border:1px solid #d1d9e8;padding:2px 6px;margin-left: 10px;">
                <span style="display:inline-block;width:40px">{{spaceObj.selectNum*10}}</span> 
                <span>GB</span>
            </div>
            <div style="display:inline-block;border:1px solid #d1d9e8;background:#bccdf1;vertical-align: middle;">
                <ul>
                    <li class="do-count" @click="getCount('plus')"></li>
                    <li class="do-count" @click="getCount('add')"></li>
                </ul>
            </div>
        </div>
        <template v-if="!fatherObj.removeTime">
            <!-- 时间 -->
            <div class="all-slider"><span class="slider-title">{{$buttonObj.time}}</span>
                <ul class="all-date" style="position: absolute;top: 0px;left: 143px;" :id="timeObj.id01">
                    <li v-for="(item,index) in timeArr" :key="index" class="slider-date" @click="getChoice(index+1,timeObj)">       
                    </li>
                    <div class="slider-date-select" :ref="timeObj.id02" :id="timeObj.id02">
                        <span class="slider-date-right">||</span>
                    </div>
                </ul>
                <ul class="all-date">
                    <li v-for="(item,index) in timeArr" :key="index" class="time-able" 
                    :style="index < timeObj.selectNum ? 'background:#4377EE;color: #fff;' : 'background:#F1F4F6;color:gray'">
                        {{item.label}}<template v-if="timeObj.selectNum-1  == index">
                            <template v-if="timeObj.selectNum < 10">个月</template>                       
                            </template>    
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    inject:["replaceroute"],
    name:"slider",
    data(){
        return{
            showObj:[
                {value:'250',label:"250GB"},
                {value:'500',label:"500GB"},
                {value:'750',label:"750GB"},
                {value:'1000',label:"1000GB"},
            ],
            spaceArr:[],
            timeArr:[
                {value:'1',label:"1"},
                {value:'2',label:"2"},
                {value:'3',label:"3"},
                {value:'4',label:"4"},
                {value:'5',label:"5"},
                {value:'6',label:"6"},
                {value:'7',label:"7"},
                {value:'8',label:"8"},
                {value:'9',label:"9"},
                {value:'12',label:"1年"},
                {value:'24',label:"2年"},
                {value:'36',label:"3年"},
            ],
            // 增值空间对象
            spaceObj:{
                selectNum:0,
                step: 6,
                id01: "spaceslider",
                id02: 'slspace',
                width: 3,
                start: 0,
                str: 0,
                fn:'fromSpace',//传值
                
            },
            spaceNum:'',
            // 到期时间对象
            timeObj:{
                selectNum:0,
                step: 61,
                id01: "timeslider",
                id02: 'sltime',
                width: 0,
                start: 0,
                str:0,
                fn:'fromTime',//传值
            },
            timeNum:'',
            trData:[]
        }
    },
    props:[
        "fatherObj"
    ],
    watch:{
        "$route":"fromFather",//监听路由变化
        spaceObj:{
            deep:true,
            handler:function(n){
                this.getMax(this.spaceObj,this.spaceNum)
            }
        },
        timeObj:{
            deep:true,
            handler:function(n){
                if(!this.fatherObj.removeTime) this.getMax(this.timeObj, this.timeNum)
            }
        }
    },
    created(){
        this.fillSpace(10)
        this.spaceObj.id01 = "spaceslider" + this.fatherObj.id
        this.spaceObj.id02 = "slspace" + this.fatherObj.id
        this.timeObj.id01 = "timeslider" + this.fatherObj.id
        this.timeObj.id02 = "sltime" + this.fatherObj.id  
    },
    mounted(){
        if(!this.fatherObj.removeTime) {
            this.diSlider(this.timeObj,this,'timeObj');
            this.getZero();
        }
        this.diSlider(this.spaceObj,this,'spaceObj');
        this.fromFather()
        this.getChoice(false ,this.spaceObj)
        if(!this.fatherObj.removeTime) this.getChoice(false ,this.timeObj)
    },
    methods:{
        // 获取父组件传过来的值
        fromFather(){
            if(!this.fatherObj) return false
            var spaceNum = this.fatherObj.spaceNum
            if(spaceNum) {
                spaceNum = spaceNum.substring(0,spaceNum.length-1)/10
                this.spaceObj.selectNum = spaceNum
                this.spaceNum = spaceNum
            }
            else this.spaceObj.selectNum = 0
            var timeNum = this.fatherObj.timeNum
            if(timeNum) {
                if(timeNum < 10){ 
                    timeNum = timeNum/1
                }else{
                    timeNum = timeNum/12 + 9
                }
                this.timeObj.selectNum = timeNum
                this.timeNum = timeNum
            }
            else {
                this.timeObj.selectNum = 0;
                this.timeNum = 0;
            }
               
        },
        // 监听选择的空间大小（时间）
        getMax(obj01,selc){
            var boo = obj01.fn == 'fromTime' , num = obj01.selectNum
            obj01.selectNum = num < selc ? selc : num
            this.$refs[obj01.id02].style.left = (obj01.selectNum + obj01.str)*obj01.step + obj01.start + 'px'
            var selectNum = obj01.selectNum
            if(boo){
                if (selectNum > 9) {
                    selectNum = (selectNum - 9) * 12
                } 
            }
            else selectNum =  selectNum*10 + 'G'
            this.$emit(obj01.fn,selectNum)
        },
        // 给空间赋值
        fillSpace(step){
            var start = 0 , end = 1000 , object = {};
            for (let index = start; index < end+1 ; index += step) {
                object = {}
                object.value = index ;
                object.label = index + 'GB';
                this.spaceArr.push(object);
            }
        },
        // 时间为零时的颜色
        getZero(){
            var leftt = this.$refs[this.timeObj.id02].style.left
            if(leftt == '0px' || !leftt) this.timeObj.selectNum = - 1
        },
        // 点击选择某一位置
        getChoice(num,obj){
            if(num) obj.selectNum = num
            this.$refs[obj.id02].style.left = (obj.selectNum + obj.str)*obj.step + obj.start + 'px'
        },
        // 点击添加或者减少
        getCount(str){
            if (str == 'plus') {
                if(this.spaceObj.selectNum != 0) this.spaceObj.selectNum --
                else return false;
            } else {
                if(this.spaceObj.selectNum != this.spaceArr.length-1) this.spaceObj.selectNum ++
                else return false;
            }
            this.getChoice(this.spaceObj.selectNum,this.spaceObj)
        },
        diSlider(obj,self,str){
            (function(window, document, undefined) {
				var dog = { //声明一个命名空间，或者称为对象
					$: function(id) {
						return document.querySelector(id);
					},
					on: function(el, type, handler) {
						el.addEventListener(type, handler, false);
					},
					off: function(el, type, handler) {
						el.removeEventListener(type, handler, false);
					}
				};
				//封装一个滑块类
				function Slider() {
					var args = arguments[0];
					for(var i in args) {
						this[i] = args[i]; //一种快捷的初始化配置
					}
					//直接进行函数初始化，表示生成实例对象就会执行初始化
					this.init();
				}
				Slider.prototype = {
					constructor: Slider,
					init: function() {
						this.getDom();
						this.dragBar(this.handler);
					},
					getDom: function() {
						this.slider = dog.$('#' + this.id01);
						this.handler = dog.$("#" + this.id02);
					},
					dragBar: function(handler) {
						var that = this,
							startX = 0,
							lastX = 0,
							doc = document,
							width = this.slider.offsetWidth + this.width,
							max = width - handler.offsetWidth,
							drag = {
//								按下鼠标的时候
								down: function(e) {
									var e = e || window.event;
                                    startX = e.clientX - handler.offsetLeft;
									dog.on(doc, 'mousemove', drag.move);
									dog.on(doc, 'mouseup', drag.up);
									return false;
								},
//								鼠标拖动的时候
								move: function(e) {
									var e = e || window.event;
                                    lastX = e.clientX - startX;
                                    lastX = Math.max(that.startNum, Math.min(max, lastX)); //这一步表示距离大于0小于max，巧妙写法
                                    // self[that.str].selectNum = Math.floor((lastX - that.startNum)/that.step)
                                    self[that.str].selectNum = Math.ceil((lastX - that.startNum)/that.step) - self[that.str].str
									handler.style.left = lastX + 'px';
								},
//								松开鼠标
								up: function(e) {
                                    var e = e || window.event;
                                    // if(that.str == "spaceObj") handler.style.left = self[that.str].selectNum*that.step +that.startNum -5 +'px'
                                    // else 
                                    if(that.str == "timeObj") handler.style.left = (self[that.str].selectNum  + self[that.str].str)*that.step + that.startNum +'px'
									dog.off(doc, 'mousemove', drag.move);
									dog.off(doc, 'mouseup', drag.up);
								}
							};
 
						dog.on(handler, 'mousedown', drag.down);
					}
				};
				window.S = window.Slider = Slider;
			})(window, document);
			var defaults = {
                id01: obj.id01,
                id02: obj.id02,
                startNum : obj.start,
                step: obj.step,
                width: obj.width,
                self: self,
                str: str
			};
			new S(defaults);
        },
    }
}
</script>

<style scoped>
    #slider{
        display: inline-block;
        margin-top: 20px;
        vertical-align: middle;
    }
    .all-slider{
        margin: 20px;
        position: relative;
    }
    .all-date{
        display: inline-block;
        cursor: pointer;
        vertical-align: middle;
    }
    .slider-title{
        display: inline-block;
        margin-right: 20px;
        width: 120px;
    }
    /* 每个空间的样式 */
    .slider-space{
        display: inline-block;
        position: relative;
        padding: 5px 0;
        width: 6px;
        height: 17px;
        font-size: 14px;
        /* z-index: 1100; */
    }
    .slider-space:last-child{
        width: 9px;
    }
    .slider-space-select::after{
		position: absolute;
        content: "";
        top: -4px;
        right: -12px;
        height: 42px;
        width: 20px;
        border: 1px solid gray;
        background-color: rgba(67,119,238,1.4);
        z-index: 1301;
	}
    .space-able{
        display: inline-block;
        font-weight: 500;
        font-size: 16px;
        width: 150px;
        text-align: center;
        line-height: 26px;
        color: #fff;
        background: rgb(67, 119, 238);
        border-right: 1px solid #d8d6d6;
    }
    .do-count{
        padding:6px 12px 6px 10px;
        width: 5px;
        cursor: pointer;
    }
    .do-count:first-child:after {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #555555;
        content: "";
        position: absolute;  
        top: 6px;  
        width: 0;
    }
    .do-count:last-child:after {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #555555;
        content: "";
        position: absolute;  
        top: 17px;  
        width: 0;
    }
    /* 每个时间的样式 */
    .slider-date{
        display: inline-block;
        position: relative;
        padding: 4px 11px 4px 9px;
        width: 41px;
        height: 16px;
    }
    .time-able{
        display: inline-block;
        font-size: 12px;
        text-align: right;
        width: 40px;
        padding: 4px 11px 4px 9px;
        color: #fff;
        background: rgb(67, 119, 238);
        border-right: 1px solid #d8d6d6;
    }
    .slider-date-select{
		position: absolute;
        top: -3px;
        /* left: 0px; */
        height: 30px;
        width: 12px;
        border: 1px solid gray;
        background-color: rgba(67,119,238,1.4);
        z-index: 999;
	}
    .slider-date-right{
        position: absolute;
        top: 3px;
        right: 2px;
        z-index: 1401;
        color: white;
    }
 
</style>

