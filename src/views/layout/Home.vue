<template>
	<div class="home-container" ref="home">
		<LeftMenu :key="key"/>
		<div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
		<SliderNav />
		<router-view></router-view>
		</div>
	</div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
	components: {
		LeftMenu,
		SliderNav,
	},
	data() {
		return {
			key: new Date().getTime(),
		};
	},
	watch: {
		$route() {
			this.key = new Date().getTime();
		},
	},
};
</script>

<style  lang="less">
.home-container{
    .menu-list{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 180px;

        .ant-menu{
            height: 100%;
        }
    }
    .main-app{
        margin-left: 180px;
        transition: all 0.3s;

        .main-header{
            border-bottom: 1px solid #eee;
            padding:0 10px;
            height: 52px;
        }

        &.menu-unfold{
            margin-left: 80px;
        }

        .ant-btn{
            margin-top: 10px;
        }

        .breadcrumb{
            display: inline-block;
            margin-left: 20px;
            margin-top: 10px;
        }
        .user-info{
            float: right;
            width: 100px;
            height: 52px;
            margin-right: 30px;
            position: relative;
            cursor: pointer;
            ul{
                position: absolute;
                left: 0;
                top: -1px;
                z-index: 999;
            }

            li{
                line-height: 52px;
                text-align: center;
                padding:0 5px;
                background-color: #fff;

                &:hover{
                    color: #999;
                    font-weight: 700;
                }
                &:not(:first-child){
                    transition: all .5s;
                    line-height: 46px;
                    height: 0;
                    overflow: hidden;
                }
            }

            &:hover{
                li{
                    height: 52px;
                }
            }
        }
    }
}
</style>
