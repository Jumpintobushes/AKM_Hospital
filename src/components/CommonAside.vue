<template>
	<el-menu
		default-active="1-4-1"
		class="el-menu-vertical-demo"
		background-color="#545c64"
		text-color="#fff"
		active-text-color="#fffd04b"
		@open="handleOpen"
		@close="handleClose"
		:collapse="isCollapse"
	>
		<h3>阿卡姆医院管理</h3>
		<el-menu-item
			@click="clickMenu(item)"
			v-for="item in noChildren"
			v-bind:index="item.path"
			:key="item.path"
		>
			<i :class="`el-icon-${item.icon}`"></i>
			<span slot="title">{{ item.label }}</span>
		</el-menu-item>
		<el-submenu
			v-for="item in hasChildren"
			:index="item.path + ''"
			:key="item.path"
		>
			<template slot="title">
				<i :class="`el-icon-${item.icon}`"></i>
				<span slot="title">{{ item.label }}</span>
			</template>
			<el-menu-item-group
				v-for="(subItem, subIndex) in item.children"
				:key="subItem.path"
			>
				<!-- <span slot="title">{{ item.label }}</span> -->
				<el-menu-item @click="clickMenu(subItem)" :index="subIndex + ''">{{
					subItem.label
				}}</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
.el-menu {
	height: 100vh;
	border: none;
	h3 {
		color: #fff;
		text-align: center;
		line-height: 48px;
	}
}
</style>

<script>
export default {
	data() {
		return {
			menu: [
				
			],
		}
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath)
		},
		clickMenu(item) {
			this.$router.push({
				name: item.name,
			})
			this.$store.commit('selectMenu', item)
			// console.log(item.name)
		},
	},

	computed: {//将菜单数据分组：有子菜单/没有子菜单
		noChildren() {
			return this.asyncMenu.filter((item) => !item.children)//filter（）遍历后过滤
			// return this.menu.filter((item) => !item.children)
		},
		hasChildren() {
			return this.asyncMenu.filter((item) => item.children)
			// return this.menu.filter((item) => item.children)
		},
		isCollapse() {
			return this.$store.state.tab.isCollapse
		},
		asyncMenu() {
			return this.$store.state.tab.menu
		},
	},
}
</script>
