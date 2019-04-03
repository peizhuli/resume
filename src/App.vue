<template>
  <div id="app">
    <!--<router-view/>-->

      <div class="swiper-container main-swiper" id="main-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide current-slide">
            <div class="slide-header">
              <span>-</span><span>-</span><span>-</span><span>个</span><span>人</span><span>信</span><span>息</span><span>-</span><span>-</span><span>-</span>
            </div>
            <div class="basic-information-box">
              <div class="avatar-box">
                <img class="avatar" :src="avatar" />
              </div>
              <!--:style="{animation: 'fadeInLeft 0.5s ' + 0.2*index + 's both'}"-->
              <div class="basic-info-content">
                <div class="basic-info-item" v-for="(item, key, index) in baseInfo" :key="key">
                  {{ key }}：{{ item }}
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="slide-header">
              <span>-</span><span>-</span><span>-</span><span>个</span><span>人</span><span>技</span><span>能</span><span>-</span><span>-</span><span>-</span>
            </div>
            <div class="dev-skill-box">
              <div class="dev-skill-item" v-for="item in devSkill" :key="item.name">
                <div class="bar-name">{{ item.name }}</div>
                <div class="bar-bg-box">
                  <div class="bar-content" ref="barPercent"></div>
                </div>
                <div class="bar-percent">{{ item.masterPercent }}</div>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="slide-header">
              <span>-</span><span>-</span><span>-</span><span>工</span><span>作</span><span>经</span><span>验</span><span>-</span><span>-</span><span>-</span>
            </div>
            <div class="experience-box">
              <div class="experience-item">
                <p>2017-03 - 2017-04</p>
                <p>单位：广州缪斯软件科技有限公司</p>
                <p>项目：</p>
                <p>1.二手商品售卖网站，负责适配移动端页面</p>
                <p>2.维护与完善日本食品商城hybrid APP（基于angular1和ionic1）</p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="slide-header">
              <span>-</span><span>-</span><span>-</span><span>工</span><span>作</span><span>经</span><span>验</span><span>-</span><span>-</span><span>-</span>
            </div>
            <div class="experience-box">
              <div class="experience-item">
                <p>2017-07 - 2019-04</p>
                <p>单位：广州国交润万交通信息有限公司</p>
                <p>项目：</p>
                <p>1.掌路（监控）PC：高速公路监控系统，html5和css3实现页面布局，jquery做前后端动态交互，高德地图API实现事件位置标识及事件详情展示</p>
                <p>2.高分可视化智慧监控系统: 大屏展示系统（包含PC控制端），系统用于多个高速公路（如：阳化高速，仁新高速，广三高速...）</p>
                <p>主要技术：html5和css3实现页面布局，jquery做前后端动态交互，echart实现图表数据展示，高德地图API实现事件位置标识及事件详情展示</p>
                <p>3.APP内嵌页：单个/多个echart图表</p>
                <p>4.公司官网：适配移动端，包含后台管理系统，使用vue.js开发，axios实现前后端数据交互,webpack打包</p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="slide-header">
              <span>-</span><span>-</span><span>-</span><span>个</span><span>人</span><span>作</span><span>品</span><span>-</span><span>-</span><span>-</span>
            </div>
            <div class="project-box">
              <div class="project-icon-box">
                <i class="project-icon"></i>
              </div>
              <div class="swiper-container project-swiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="project-item">
                      <p>基于vue.js开发的网易云音乐webapp，运用了vue-router做路由控制，vuex来存储音乐属性状态（例如当前播放歌曲id）</p>
                      <p><a href="https://github.com/peizhuli/cloudMusic">github地址</a></p>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="project-item">
                      <p>基于美团小程序开发框架mpvue开发的网易云音乐小程序版，使用iview作为UI库</p>
                      <p><a href="https://github.com/peizhuli/mpvueCloudMusic">github地址</a></p>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="project-item">
                      <p>基于vue的弹窗插件，分为两种模式：</p>
                      <p>1.普通提示框，在一段时间后消失；</p>
                      <p>2.可传递一个组件及props作为显示内容</p>
                      <p>安装 npm i vue-template-modal</p>
                      <p><a href="https://github.com/peizhuli/vue-template-modal">github地址</a></p>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="project-item">
                      <div style="text-align: center">
                        <p>在线简历，可扫描下图二维码识别</p>
                        <img :src="code" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-pagination-box">
                <div :class="{swiperPaginationItem: true, active: currentSwiperIndex == 0}" @click="goPage(0)">
                  <i class="pagination-icon"></i>
                </div>
                <div :class="{swiperPaginationItem: true, active: currentSwiperIndex == 1}" @click="goPage(1)">
                  <i class="pagination-icon"></i>
                </div>
                <div :class="{swiperPaginationItem: true, active: currentSwiperIndex == 2}" @click="goPage(2)">
                  <svg viewBox="0 0 27.23 27.23"><circle fill="#cccccc" width="27.23" height="27.23" rx="2"></circle><polygon fill="#ff0000" points="5.8 21.75 13.66 21.75 13.67 9.98 17.59 9.98 17.58 21.76 21.51 21.76 21.52 6.06 5.82 6.04 5.8 21.75"></polygon></svg>
                </div>
                <div :class="{swiperPaginationItem: true, active: currentSwiperIndex == 3}" @click="goPage(3)">
                  <i class="pagination-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
let swiper;
export default {
  name: 'App',
  mounted() {
    let vm = this;
    let mainSwiper = new Swiper('.main-swiper', {
      direction : 'vertical',
      mousewheel: true,
      on: {
        slideChangeTransitionEnd: function(){
          if(this.activeIndex == 1) {
              for(let index in vm.devSkill) {
                vm.$refs.barPercent[index].style.width = vm.devSkill[index].masterPercent;
              }
          } else {
            for(let index in vm.devSkill) {
              vm.$refs.barPercent[index].style.width = 0;
            }
          }
        }
      },
    });
    swiper = new Swiper('.project-swiper', {
      mousewheel: true,
      centeredSlides: true,
      slidesPerView: 1.7,
      spaceBetween: 5,
      slidesOffsetBefore: 5,
      on: {
        slideChangeTransitionEnd: function(){
          vm.currentSwiperIndex = this.activeIndex;
        },
      }
    });
  },
  data() {
    return {
      currentSwiperIndex: 0,
      avatar: require('./assets/img/avatar.jpg'),
      code: require('./assets/img/resume_code.png'),
      baseInfo: {
        '姓名': '李佩珠',
        '性别': '女',
        '电话': '18320368737',
        '邮箱': 'lpz714@outlook.com',
        '专业': '计算机科学与技术',
        '教育': '本科',
        '学校': '广东海洋大学',
        '经验': '2年',
        '英语': '6级'
      },
      devSkill: [
        {
            name: 'html5',
            masterPercent: '80%'
        },
        {
          name: 'javascript',
          masterPercent: '80%'
        },
        {
          name: 'css3',
          masterPercent: '80%'
        },
        {
          name: 'vue',
          masterPercent: '80%'
        },
        {
          name: 'webpack',
          masterPercent: '60%'
        },
        {
          name: 'jquery',
          masterPercent: '80%'
        },
        {
          name: 'echart',
          masterPercent: '80%'
        },
        {
          name: 'node',
          masterPercent: '50%'
        },
        {
          name: 'mpvue',
          masterPercent: '60%'
        },
        {
          name: '高德API',
          masterPercent: '70%'
        }
      ]
    }
  },
  methods: {
      goPage(index) {
        swiper.slideTo(index, 500, false);
        this.currentSwiperIndex = index;
      }
  }
}
</script>

<style>
#app,
.swiper-container.main-swiper {
  width: 100%;
  height: 100%;
  color: #fff;
}
.project-box {
  width: 100%;
  height: 80%;
  font-size: 0.8rem;
  text-align: left;
}
.project-swiper {
  height: 80%;
  /*padding-top: 20%;*/
}

.main-swiper > .swiper-wrapper > .swiper-slide:nth-child(1) {
  /*! autoprefixer: off */
  background: -moz-linear-gradient(left top, #d75d5a, #200a90);
  background: -webkit-linear-gradient(left top, #d75d5a, #200a90);
  background: -ms-linear-gradient(left top, #d75d5a, #200a90);
  background: -o-linear-gradient(left top, #d75d5a, #200a90);
  /* autoprefixer: on */
  background: linear-gradient(left top, #d75d5a, #200a90);
}
.main-swiper > .swiper-wrapper > .swiper-slide:nth-child(2) {
  /*! autoprefixer: off */
  background: -moz-linear-gradient(left top, #aa2143, #0a267a);
  background: -webkit-linear-gradient(left top, #aa2143, #0a267a);
  background: -ms-linear-gradient(left top, #aa2143, #0a267a);
  background: -o-linear-gradient(left top, #aa2143, #0a267a);
  /* autoprefixer: on */
  background: linear-gradient(left top, #aa2143, #0a267a);
}
.main-swiper > .swiper-wrapper > .swiper-slide:nth-child(3) {
  /*! autoprefixer: off */
  background: -moz-linear-gradient(left top, #171980, #00c29b);
  background: -webkit-linear-gradient(left top, #171980, #00c29b);
  background: -ms-linear-gradient(left top, #171980, #00c29b);
  background: -o-linear-gradient(left top, #171980, #00c29b);
  /* autoprefixer: on */
  background: linear-gradient(left top, #171980, #00c29b);
}
.main-swiper > .swiper-wrapper > .swiper-slide:nth-child(4) {
  /*! autoprefixer: off */
  background: -moz-linear-gradient(left top, #00a6d2, #5a1e88);
  background: -webkit-linear-gradient(left top, #00a6d2, #5a1e88);
  background: -ms-linear-gradient(left top, #00a6d2, #5a1e88);
  background: -o-linear-gradient(left top, #00a6d2, #5a1e88);
  /* autoprefixer: on */
  background: linear-gradient(left top, #00a6d2, #5a1e88);
}
.main-swiper > .swiper-wrapper > .swiper-slide:nth-child(5) {
  /*! autoprefixer: off */
  background: -moz-linear-gradient(left top, #f05ed0, #3c43a4);
  background: -webkit-linear-gradient(left top, #f05ed0, #3c43a4);
  background: -ms-linear-gradient(left top, #f05ed0, #3c43a4);
  background: -o-linear-gradient(left top, #f05ed0, #3c43a4);
  /* autoprefixer: on */
  background: linear-gradient(left top, #f05ed0, #3c43a4);
}
@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translate3D(-100%, 0, 0);
    -webkit-transform: translate3D(-100%, 0, 0);
    -moz-transform: translate3D(-100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: none;
    -webkit-transform: none;
    -moz-transform: none;
  }
}
@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translate3D(100%, 0, 0);
    -webkit-transform: translate3D(100%, 0, 0);
    -moz-transform: translate3D(100%, 0, 0);
  }
  100% {
    opacity: 1;
    transform: none;
    -webkit-transform: none;
    -moz-transform: none;
  }
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate3D(0, -100%, 0);
    -webkit-transform: translate3D(0, -100%, 0);
    -moz-transform: translate3D(0, -100%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3D(0, 0, 0);
    -webkit-transform: translate3D(0, 0, 0);
    -moz-transform: translate3D(0, 0, 0);
  }
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translate3D(0, 100%, 0);
    -webkit-transform: translate3D(0, 100%, 0);
    -moz-transform: translate3D(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3D(0, 0, 0);
    -webkit-transform: translate3D(0, 0, 0);
    -moz-transform: translate3D(0, 0, 0);
  }
}
</style>
<style scoped>
@import "assets/css/app.css";
</style>
