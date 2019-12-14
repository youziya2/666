<template>
		<!--分页-->
			<div class="page">
				<div style="display: inline-block;min-width: 150px;">
					<ul class="pagination" v-if="currs!=0">
						<li v-if="current == 1"  style="cursor: not-allowed;">
							<i class="el-icon-arrow-left"></i>
						</li>
						<li v-else @click="goto('plus')" class="li-hover">
							<i class="el-icon-arrow-left"></i>
						</li>
						<li v-for="index in pages" @click="goto(index)" class="li-hover" :key="index" :style=" index == current? 'color: #fff;background:' + colorselects : '' ">
							<template v-if="index/2">
								{{ index }}
							</template>
							<template v-else>
								<i class="el-icon-more"></i>
							</template>
						</li>
						<li v-if="currs != current && currs != 0 " @click=" goto('add') " class="li-hover">
							<i class="el-icon-arrow-right"></i>
						</li>
						<li v-else style="cursor: not-allowed;">
							<i class="el-icon-arrow-right"></i>
						</li>
					</ul>
				</div>
				<div class="show-index" :style="'color:'+ colorselects">
					<span>{{current + '/' + currs}}</span>
					<span>每页{{pageSize}}条共{{records}}条</span>
				</div>
			</div>
</template>

<script>
	export default{
		name:'page',
		data() {
			return {
				showSize:10,//显示页标题个数根据这个确定
				pageSize:15,//每页的记录
				current:1,//当前页码
				currs:0,//总页数
				records:0//总数
			}
		},
		provide(){
			return{
				replaceroute:this.replaceroute
			}
		},
		computed:{
			// 获取当前的主题颜色,不需要的话可以去掉
			colorselects(){
				return this.$route.matched[0].meta.colorselect;
			},
			//			分页数据
			pages: function() {
				var pag = [];
				if(this.currs < this.showSize) { //如果当前的激活的项 小于要显示的条数
					//总页数和要显示的条数那个大就显示多少条
					var i = Math.min(this.showSize,this.currs);
					while(i) {
						pag.unshift(i--);
					}
				} else { //总页数大于要显示的条数
					pag.push(1)
					var i  = Math.ceil(this.showSize/2), middle = 2;
					if (this.current < Math.ceil(this.showSize/2)) {//当前页码属于前面几个
						while(i--) pag.push(middle++);
						pag.push('right')
					} else if (this.current > this.currs - (Math.ceil(this.showSize/2) - 1)) {//当前页码属于后面几个
						pag.push('left')
						middle = this.currs - i;
						while(i--) pag.push(middle++);
					} else {//当前页码属于中间那段
						pag.push('left')
						middle = this.current - 2;
						while(i--) pag.push(middle++);
						pag.push('right')
					}
					pag.push(this.currs)
				}
				return pag
			}
		},
		methods: {
				//点击获取分页数据
			goto: function(index) {
				if (this.current == index) return
				// 根据传进来的值判断操作
				switch (index) {
					case 'left':
						this.current = Math.ceil(this.current/2)
						break;

					case 'right':
						this.current = Math.ceil(this.currs/2 + this.current/2)
						break;

					case 'plus':
						this.current --
						break;

					case 'add':
						this.current ++
						break;

					default:
						this.current = index;
						break;
				}
				// 向父组件传当前页码
				this.$emit('current',this.current);
			},
			// 获取其他组件传过来的值
			getData(sumRecord,pageSize,current){
				this.currs = Math.ceil(sumRecord/pageSize);
				this.pageSize = pageSize;
				this.current = current;
				this.records = sumRecord;
			},
			load(){
				this.$bus.on('doPage',this.getData)
			}
		},
		created(){
			this.load();
		},
		beforeDestroy(){
			this.$bus.off('doPage',this.getData)
		}
	}
</script>
<style scoped="scoped">
	.page{
		text-align: center;
		clear: both;
    	margin-top: 15px;
	}
	.pagination {
		margin: 0 auto 10px;
		text-align: center;
		overflow: hidden;
		display: inline-block;
	}
	.pagination li {
		cursor: pointer;
		float: left;
		margin: 0 5px;
		font-size: 14px;
		font-weight: 700;
		height: 28px;
    	line-height: 28px;
		background-color: #f4f4f5;
		color: #606266;
		min-width: 30px;
		border-radius: 2px;
	}
	.li-hover:hover {
		color: #7A98F7;
	}
	
	.pagination li.actives{
		background: #9E071D;
		color: #fff;
	}
	.show-index{
		float: right;
		font-size: 16px;
		height: 28px;
		line-height: 28px;
	}
</style>