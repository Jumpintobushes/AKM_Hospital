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
					model: 'id',
					label: 'id',
					type: 'input',
				},
				{
					model: 'tel',
					label: '电话',
					type: 'input',
				},
				{
					model: 'dept',
					label: '科室',
					type: 'input',
				},
				{
					model: 'doctor_name',
					label: '姓名',
					type: 'input',
				},
				{
					model: 'sex',
					label: '性别',
					type: 'select',
					opts: [
						{
							label: '男',
							value: 1,
						},
						{
							label: '女',
							value: 0,
						},
					],
				},
			],
			operateForm: {
				id: '',
				tel: '',
				dept: '',
				doctor_name: '',
				sex: '',
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
					prop: 'id',
					label: 'id',
					width: 320,
				},
				{
					prop: 'tel',
					label: '电话',
				},
				{
					prop: 'dept',
					label: '科室',
					//width: 320,
				},
				{
					prop: 'doctor_name',
					label: '姓名',
				},
				{
					prop: 'sexLabel',
					label: '性别',
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
				doctor_id: '',
				doctor_tel: '',
				dept: '',
				doctor_name: '',
				doctor_sex: '',
			}
		},
		getList(doctor_name = '') {
			this.config.loading = true
			doctor_name ? (this.config.page = 1) : ''
			getUser({
				page: this.config.page,
				doctor_name,
			}).then(({ data: res }) => {
				console.log(res, 'res')
				this.tableData = res.list.map((item) => {
					item.sexLabel = item.sex === 0 ? '女' : '男'
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
				const id = row.id
				this.$http
					.post('/user/del', {
						params: { id },
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
