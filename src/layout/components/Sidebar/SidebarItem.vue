<template>
  <div v-if="isNavbar(item)">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    // this.onlyOneChild = null
    return {
      onlyOneChild: null
    }
  },
  computed: {
    linkType() {
      return this.item.meta.type
    },
    isShow() {
      return this.linkType === 'NAVBAR'
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      // 筛选出可展示的子集
      const showingChildren = children.filter(item => {
        if (!this.isNavbar(item)) {
          return false
        } else {
          // 如果只有一个子集时，展示该子集
          this.onlyOneChild = item
          return true
        }
      })

      // 当只有一个子集时，只展示该子集
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有子集，则展示父集
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isNavbar(item) {
      if (item.meta && item.meta.type === 'NAVBAR') {
        return true
      }

      return false
    }
  }
}
</script>
