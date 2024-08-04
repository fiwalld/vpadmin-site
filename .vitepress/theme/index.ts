// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { provide } from 'vue'
//import { VPUserMenus } from 'vpusermenus'
//import 'vpusermenus/dist/vpusermenus.css'
import VPUserMenus from './VPUserMenus.vue'
import menusData from '../config/MenusData.json';

export default {
  setup() {  
    provide('menusdata', menusData);  
  },  
  extends: DefaultTheme,
  Layout: VPUserMenus
} satisfies Theme
