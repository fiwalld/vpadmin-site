<!--.vitepress/theme/VPUserMenus.vue-->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import LoginTabs from './LoginTabs.vue';
import { useMediaQuery } from '@vueuse/core';
import { useData } from 'vitepress';
import { onMounted, onUnmounted, getCurrentInstance, ref, inject,computed,onBeforeMount } from 'vue';
//import menusData from './umenuData.json';
// 你也可以使用 useRoute 来访问当前路由的信息  
//const langs : any = ref(null);
const menusData : any = inject('menusdata'); 
const { Layout } = DefaultTheme;
const { lang } = useData();
const langs = menusData.arrayList;
const instance = getCurrentInstance();
const showModal = ref(Array.from({ length: 10 }, () => false)); // 定义一个包含10个布尔值的数组, 0:aaa, 1:bbb, 2:ccc
const inputValue = ref('');
const open = ref(false);
const currentLang:any = computed(getCurrentLang);
function getCurrentLang() {
  let value;//forEach中直接return无法将值返回，js/ts bug？
  langs.forEach((element: { lang: string; }) => {
    if(element.lang === lang.value){
      value = element;
    }
  });
  return value;
};
function confirm() {
  // 执行其他逻辑，比如关闭模态框
  showModal.value[0] = false;
};
onMounted(() => {
  window.addEventListener('resize', reload);
  //initData();
});
onBeforeMount(() => {
  getCurrentLang();
});
onUnmounted(() => {
  window.removeEventListener('resize', reload);
});


var isWebScreen = useMediaQuery('(min-width: 768px)').value;

function reload() {
  isWebScreen = useMediaQuery('(min-width: 768px)').value;
  instance?.proxy?.$forceUpdate();
};
const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
};
</script>
<style lang="scss" scoped>
.rootContainer {
  &:hover .dropdown-content, 
  .container[aria-expanded="true"] .dropdown-content {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .container[aria-expanded="false"] .dropdown-content {
    opacity: 0;
    visibility: hidden;
    transform: translateY(0);
  }
}
.container {
  padding: 0px;
  pointer-events: auto;
  position: relative;
  display: flex;
  color: var(--vp-c-text-1);
  transition: color 0.5s;
  
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.modal {
  background: white;
  padding: 0px;
  border-radius: 8px;
}

.dropdown {
  margin: 0 0px;
  color: var(--vp-c-text-1);

  .text-icon {
    display: inline-block;
    vertical-align: middle;
    margin-left: 4px;
    font-size: 14px;
    width: 14px;
  }

  .user-menu {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;

    &:hover {
      color: var(--vp-c-brand-1);
    }
  }

  .option-icon {
    height: 20px;
    width: 20px;
    margin-right: 0px;
    font-size: 16px;
  }

  .dropdown-content {
    // 定位显示局域
    position: absolute;
    top: 30px;
    right: 0;
    visibility: hidden; // 隐藏
    opacity: 0; // 隐藏
    transform: translateY(0);
    transition: opacity 0.25s, visibility 0.25s, transform 0.25s;



    .dropdown-menu {
      float: left;
      border-radius: 12px;
      padding: 12px;
      min-width: 128px;
      border: 1px solid var(--vp-c-divider);
      background-color: var(--vp-c-bg-elv);
      box-shadow: var(--vp-shadow-3);
      transition: background-color 0.5s;
      max-height: calc(100vh - var(--vp-nav-height));
      overflow-y: auto;

      .menuItem {
        padding: 0 24px 0 12px;
        line-height: 32px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 6px;
        color: var(--vp-c-text-1);
        transition: background-color 0.25s, color 0.25s;

        &:hover {
          color: var(--vp-c-brand-1);
          background-color: var(--vp-c-default-soft);
        }
      }
    }
  }


  &::before {
    display: inline-block;
    vertical-align: middle;
    margin-right: 16px;
    margin-left: 16px;
    width: 1px;
    height: 24px;
    background-color: var(--vp-c-divider);
    content: '';
  }
}

.mobileDropdown {
  .BMNavScreenMenuGroup {
    border-top: 1px solid var(--vp-c-divider);
    height: 48px;
    overflow: hidden;
    transition: border-color 0.5s;
  }

  .BMNavScreenMenuGroup .items {
    visibility: hidden;
  }

  .BMNavScreenMenuGroup.open .items {
    visibility: visible;
  }

  .BMNavScreenMenuGroup.open {
    padding-bottom: 10px;
    height: auto;
  }

  .BMNavScreenMenuGroup.open .button {
    padding-bottom: 6px;
    color: var(--vp-c-brand-1);
  }

  .BMNavScreenMenuGroup.open .button-icon {
    /*rtl:ignore*/
    transform: rotate(45deg);
  }

  .button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 4px 11px 0;
    width: 100%;
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-1);
    transition: color 0.25s;
  }

  .button:hover {
    color: var(--vp-c-brand-1);
  }

  .button-icon {
    transition: transform 0.25s;
  }

  .item {
    display: block;
    margin-left: 12px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 400;
    color: var(--vp-c-text-1);
    transition: color 0.25s;
  }
}
.header-bar {  
  position: sticky;  
  top: var(--vp-nav-height);
  //top: 0;
  left: 0;  
  right: 0;
  color: #FFFFFF;    
  height: 48px; /* 横条的高度 */  
  background-color: var(--vp-c-red-2); /* 红色背景，50%的透明度 *//* 背景色 */  
  opacity: 0.8;
  //padding-top: -48px;
  display: flex;  
  align-items: center;  
  justify-content: center; 
  margin: 0 auto;
  border-radius: 10px; /* 增加圆角 */  
  z-index: 20; /* 确保横条在其他内容之上 */  
} 
.header-bar-text {
  margin-right: 0px;
}
.loginbutton {  
  display: inline-block;  
  border-radius: 4px;  
  background-color: var(--vp-c-brand-2);
  border: none;  
  color: #FFFFFF;  
  text-align: center;  
  font-size: 15px;  
  padding: 2px;  
  width: 80px; 
  position: absolute; /* 或 position: fixed; */  
  right: 0; 
  transition: all 0.5s;  
  cursor: pointer;  
  margin: 15px 20px 15px 20px;
}  
  
.loginbutton span {  
  cursor: pointer;  
  display: inline-block;  
  position: relative;  
  transition: 0.5s;  
}  
  
.loginbutton span:after {  
  content: '\00bb';  
  position: absolute;  
  opacity: 0;  
  top: 0;  
  right: -20px;  
  transition: 0.5s;  
}  
  
.loginbutton:hover span {  
  padding-right: 25px;  
}  
  
.loginbutton:hover span:after {  
  opacity: 1;  
  right: 0;  
}  
  
.loginbutton:hover {  
  background-color: var(--vp-c-brand-1);  
}  
/* 媒体查询开始，假设我们针对宽度小于600px的移动设备进行样式调整 */  
@media screen and (max-width: 959px) {  
    .header-bar {  
        top: 48px; /* 在移动端时修改top值为10px */  
        /* 可以添加更多针对移动端的样式调整 */  
    }
    .loginbutton {
      background-color: var(--vp-c-brand-1);
    } 
    .header-bar-text {
      margin-right: 70px;
    }
}
</style>
<template>
  <Layout>
    <template #doc-before>
      <div class="header-bar" ><span class="header-bar-text">{{ currentLang.message }}</span>
        <button class="loginbutton" @click="showModal[9] = true"><span>{{ currentLang.buttonMsg }}</span></button>
      </div>
    </template>
    <template v-if="isWebScreen && langs" #nav-bar-content-after>
      <div 
        @mouseenter="open = true"
        @mouseleave="open = false"
        class="rootContainer"
        >
        <button class="container" @click="open = !open" :aria-expanded="open">
          <div class="dropdown">
            <!-- 标题 -->
            <span class="user-menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 21a8 8 0 0 1 10.434-7.62" />
                <circle cx="10" cy="8" r="5" />
                <circle cx="18" cy="18" r="3" />
                <path d="m19.5 14.3-.4.9" />
                <path d="m16.9 20.8-.4.9" />
                <path d="m21.7 19.5-.9-.4" />
                <path d="m15.2 16.9-.9-.4" />
                <path d="m21.7 16.5-.9.4" />
                <path d="m15.2 19.1-.9.4" />
                <path d="m19.5 21.7-.4-.9" />
                <path d="m16.9 15.2-.4-.9" />
              </svg>
            </span>
            <span class="vpi-chevron-down text-icon"></span>
            <!-- 下拉菜单内容 -->
            <div class="dropdown-content">
              <div v-if="currentLang" class="dropdown-menu">
                <div v-for="(menu,index) in currentLang.menus" class="menuItem" @click="showModal[index] = true" :key="index">{{ menu }}</div>
                <div class="menuItem" @click="showModal[9] = true">Login</div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </template>
    <template v-else #nav-screen-content-after>
      <div class="mobileDropdown">
        <div class="BMNavScreenMenuGroup" :class="{ open: isOpen }">
          <button class="button" :aria-expanded="isOpen" @click="toggle">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 21a8 8 0 0 1 10.434-7.62" />
                <circle cx="10" cy="8" r="5" />
                <circle cx="18" cy="18" r="3" />
                <path d="m19.5 14.3-.4.9" />
                <path d="m16.9 20.8-.4.9" />
                <path d="m21.7 19.5-.9-.4" />
                <path d="m15.2 16.9-.9-.4" />
                <path d="m21.7 16.5-.9.4" />
                <path d="m15.2 19.1-.9.4" />
                <path d="m19.5 21.7-.4-.9" />
                <path d="m16.9 15.2-.4-.9" />
              </svg>
            </span>
            <span class="vpi-plus button-icon"></span>
          </button>
          <div class="items group">
            <div v-for="(menu, index) in currentLang.menus" class="item" @click="showModal[index] = true" :key="index">{{ menu }}</div>
          </div>
        </div>
      </div>

    </template>
  </Layout>
    <div>
      <!-- 菜单1模态框 -->
      <teleport to="body">
        <div v-if="showModal[0]" class="modal-overlay">
          <div class="modal">
            <h2>菜单1</h2>
            <input type="text" v-model="inputValue" placeholder="请输入内容" />
            <div>
              <button @click="confirm">确定</button>
              <button @click="showModal[0] = false">取消</button>
            </div>
          </div>
        </div>
      </teleport>
    </div>
    <div>
      <!-- 菜单2模态框 -->
      <teleport to="body">
        <div v-if="showModal[1]" class="modal-overlay">
          <div class="modal">
            <h2>菜单2</h2>
            <input type="text" v-model="inputValue" placeholder="请输入内容" />
            <div>
              <button @click="showModal[1] = false">确定</button>
              <button @click="showModal[1] = false">取消</button>
            </div>
          </div>
        </div>
      </teleport>
    </div>
    <div>
      <!-- 登录模态框 -->
      <teleport to="body">
        <div v-if="showModal[9]" class="modal-overlay">
          <div class="modal">
            <LoginTabs></LoginTabs>
          </div>
        </div>
      </teleport>
    </div>
    
</template>