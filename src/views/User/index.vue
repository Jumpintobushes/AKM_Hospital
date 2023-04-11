<template>
	<div class="manage">
		<el-dialog
			:title="operateType === 'add' ? '新增用户' : '更新用户'"
			:visible.sync="isShow"
		>
			<common-form
				:formLabel="opertateFormLabel"
				:form="operateForm"
				:inline="true"
				ref="form"
			>
			</common-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>
		<div class="manage-header">
			<el-button type="primary" @click="addUser">+新增</el-button>
			<common-form
				:formLabel="formLabel"
				:inline="true"
				:form="searchForm"
				ref="form"
			>
				<el-button type="primary" @click="getList(searchForm.keyword)"
					>搜索</el-button
				>
			</common-form>
		</div>
		<common-table
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			@changePage="getList()"
			@edit="editUser"
			@del="delUser"
		></common-table>
	</div>
</template>
<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import { getUser } from '../../../api/data.js'
export default {
	name: 'user',
	components: {
		CommonForm,
		CommonTable,
	},
	data() {
		return {
			operateType: 'add',
			isShow: false,
			opertateFormLabel: [
				{
					model: 'user_id',
					label: '用户id',
					type: 'input',
				},
				{
					model: 'account_number',
					label: '账号',
					type: 'input',
				},
				{
					model: 'password',
					label: '密码',
					type: 'input',
				},
				{
					model: 'user_name',
					label: '姓名',
					type: 'input',
				},
				{
					model: 'user_status',
					label: '用户身份',
					type: 'select',
					opts: [
						{
							label: '医生',
							value: 1,
						},
						{
							label: '患者',
							value: 0,
						},
					],
				},
			],
			operateForm: {
				user_id: '',
				account_number: '',
				password: '',
				user_name: '',
				user_status: '',
			},
			formLabel: [
				{
					model: 'keyword',
					label: '',
					type: 'input',
				},
			],
			searchForm: {
				keyword: '',
			},
			tableData: [],
			tableLabel: [
				{
					prop: 'user_id',
					label: '用户id',
					width: 320,
				},
				{
					prop: 'account_number',
					label: '账号',
				},
				{
					prop: 'password',
					label: '密码',
					//width: 320,
				},
				{
					prop: 'user_name',
					label: '用户名',
				},
				{
					prop: 'user_statusLabel',
					label: '用户身份',
				},
			],
			config: {
				page: 1,
				total: 30,
			},
		}
	},
	methods: {
		confirm() {
			if (this.operateType === 'edit') {
				this.$http.post('/user/edit', this.operateForm).then((res) => {
					console.log(res)
					this.isShow = false
					this.getList()
				})
			} else {
				this.$http.post('/user/add', this.operateForm).then((res) => {
					console.log(res)
					this.isShow = false
					this.getList()
				})
			}
		},
		addUser() {
			this.isShow = true
			this.operateType = 'add'
			this.operateForm = {
				user_id: '',
				account_number: '',
				password: '',
				user_name: '',
				user_status: '',
			}
		},
		getList(user_name = '') {
			this.config.loading = true
			user_name ? (this.config.page = 1) : ''
			getUser({
				page: this.config.page,
				user_name,
			}).then(({ data: res }) => {
				console.log(res, 'res')
				this.tableData = res.list.map((item) => {
					item.user_statusLabel = item.user_status === 0 ? '患者' : '医生'
					return item
				})
				this.config.total = res.count
				this.config.loading = false
			})
		},
		editUser(row) {
			this.operateType = 'edit'
			this.isShow = true
			this.operateForm = row
		},
		delUser(row) {
			this.$confirm('此操作将永久删除该文件,是否继续', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				const user_id = row.user_id
				this.$http
					.post('/user/del', {
						params: { user_id },
					})
					.then(() => {
						this.$message({
							type: 'success',
							message: '删除成功',
						})
						this.getList()
					})
			})
		},
	},
	// 在生命周期里，加载时就调用
	created() {
		this.getList()
	},
}
</script>

<style lang="less" scoped>
.manage-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
