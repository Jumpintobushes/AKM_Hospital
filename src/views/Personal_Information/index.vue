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
		<el-dialog
			:title="'修改密码'"
			:visible.sync="PWisShow"
			width="30%"
			:before-close="handleClose"
		>
			<div>确定提交吗？</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="PWisShow = false">取消</el-button>
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
			<el-button type="primary" @click="Change_the_password">修改密码</el-button>
		</div>

	</div>
</template>
<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
import { getDetail } from '../../../api/data.js'
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
			PWisShow: false,
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
			},
			config: {
				page: 1,
				total: 30,
			},
		}
	},
	methods: {
		confirm() {
			if (this.operateType === 'edit') {
				this.$http.post('/mall/edit', this.operateForm).then((res) => {
					console.log(res)
					this.isShow = false
					this.getList()
				})
			} else {
				this.$http.post('/mall/add', this.operateForm).then((res) => {
					console.log(res)
					this.isShow = false
					this.getList()
				})
			}
		},
		Change_the_password() {
			this.PWisShow = true
			this.operateType = 'add'
			this.PWoperateForm = {
				old_password: '',
				new_password: '',
			}
		},
		getList(name = '') {
			this.config.loading = true
			name ? (this.config.page = 1) : ''
			getDetail({
				page: this.config.page,
				name,
			}).then(({ data: res }) => {
				console.log(res, 'res')
				this.tableData = res.list.map((item) => {
					item.typeLabel = item.type === 0 ? '支出' : '收入'
					return item
				})
				this.config.total = res.count
				this.config.loading = false
			})
		},
		editDetail(row) {
			this.operateType = 'edit'
			this.isShow = true
			this.operateForm = row
		},
		delDetail(row) {
			this.$confirm('此操作将永久删除该文件,是否继续', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				const id = row.id
				this.$http
					.post('/mall/del', {
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
