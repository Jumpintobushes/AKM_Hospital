<template>
	<div class="manage">
		<el-dialog
			:title="'提示'"
			:visible.sync="isShow"
			width="30%"
			:before-close="handleClose"
		>
			<div>确定提交吗？</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>


		<common-form
				:formLabel="opertateFormLabel"
				:form="operateForm"
				:inline="true"
				ref="form"
			>
			</common-form>

		<div class="manage-footer">
			<el-button type="primary" @click="addUser">提交</el-button>
		</div>

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
					model: 'record_date',
					label: '记录日期',
					type: 'ban_date',
				},
			],
			operateForm: {
				id: '',
				patient_name: '',
				sex: '',
				tel: '',
				birth: '',
				id_number: '',
				address: '',
				nation: '',
				profession: '',
				workplace: '',
				marriage: '',
				record_date: new Date(),
			},
			formLabel: [
				{
					model: 'keyword',
					label: '',
					type: 'input',
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
				id: '',
				patient_name: '',
				sex: '',
				tel: '',
				birth: '',
				id_number: '',
				address: '',
				nation: '',
				profession: '',
				workplace: '',
				marriage: '',
				record_date: '',
			}
		},
		getList(patient_name = '') {
			this.config.loading = true
			patient_name ? (this.config.page = 1) : ''
			getUser({
				page: this.config.page,
				patient_name,
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
