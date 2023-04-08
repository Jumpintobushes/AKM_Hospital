<template>
	<div class="manage">
		<el-dialog
			:title="operateType === 'add' ? '新增用户' : '更新患者信息'"
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
					model: 'patient_name',
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
				{
					model: 'tel',
					label: '电话',
					type: 'input',
				},
				{
					model: 'birth',
					label: '出生年月日',
					type: 'date',
				},
				{
					model: 'id_number',
					label: '身份证号',
					type: 'input',
				},
				{
					model: 'address',
					label: '住址',
					type: 'input',
				},
				{
					model: 'nation',
					label: '民族',
					type: 'input',
				},
				{
					model: 'profession',
					label: '职业',
					type: 'input',
				},
				{
					model: 'workplace',
					label: '工作单位',
					type: 'input',
				},
				{
					model: 'marriage',
					label: '婚姻状况',
					type: 'input',
				},
				{
					model: 'ex_record',
					label: '既往病史',
					type: 'textarea',
				},
				{
					model: 'allergy_record',
					label: '过敏史',
					type: 'textarea',
				},
				{
					model: 'surgery_record',
					label: '手术史',
					type: 'textarea',
				},
				{
					model: 'family_history',
					label: '家族病史',
					type: 'textarea',
				},
			],
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
					prop: 'patient_name',
					label: '姓名',
				},
				{
					prop: 'sexLabel',
					label: '性别',
				},
				{
					prop: 'id_number',
					label: '身份证号',
					width: 320,
				},
				{
					prop: 'ex_record',
					label: '病种',
					width: 320,
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
		getList(name = '') {
			this.config.loading = true
			name ? (this.config.page = 1) : ''
			getUser({
				page: this.config.page,
				name,
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
