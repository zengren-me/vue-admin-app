<template>
	<div class="main-header">
		<a-button type="primary" @click="toggleCollapsed">
			<a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
		</a-button>
		<div class="breadcrumb">
			<a-breadcrumb v-if="currentRoutes.length > 1">
				<a-breadcrumb-item>
					{{ currentRoutes[0] ? currentRoutes[0].meta.title : '' }}
				</a-breadcrumb-item>
				<a-breadcrumb-item>
					<router-link :to="currentRoutes[1].path">
						{{ currentRoutes[1] ? currentRoutes[1].meta.title : '' }}
					</router-link>
				</a-breadcrumb-item>
			</a-breadcrumb>
		</div>
		<div class="user-info">
			<ul>
				<li>你好! {{ $store.state.user.username }} <a-icon type="down" /></li>
				<li @click="editUser">修改用户</li>
				<li @click="removeUser">退出</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentRoutes: this.$router.currentRoute.matched,
		};
	},
	watch: {
		$route() {
			this.currentRoutes = this.$router.currentRoute.matched;
		},
	},
    methods: {
		toggleCollapsed() {
			this.$store.dispatch('changeCollapsed');
		},
		removeUser() {
			this.$store.dispatch('userLogout');
			this.$router.push('/login');
		},
		editUser() {
			this.$router.push('/edit');
		},
	},
};
</script>
