<template>
	<div class="manage">
		<el-dialog
			:title="operateType === 'add' ? '诊疗建档' : '诊疗建档'"
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
				<el-button type="primary" @click="getList({...searchForm})"
					>查询</el-button
				>
			</common-form>
		</div>
		<common-table
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			@changePage="getList()"
			@edit="addUser"
			@del="delUser"
		></common-table>
	</div>
</template>
<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/DiagnosisTable.vue'
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
					model: 'name',
					label: '姓名',
					type: 'ban_input',
				},
				{
					model: 'sex',
					label: '性别',
					type: 'ban_select',
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
					model: 'id_number',
					label: '身份证号',
					type: 'ban_input',
				},
				{
					model: 'jiuzhenshijian',
					label: '就诊时间',
					type: 'ban_date',
				},
				{
					model: 'doctor',
					label: '就诊医生',
					type: 'ban_input',
				},
				{
					model: 'department',
					label: '就诊科室',
					type: 'ban_input',
				},
				{
					model: 'huanzheqingkuang',
					label: '患者情况',
					type: 'textarea',
				},
				{
					model: 'zhenduanjieguo',
					label: '诊断结果',
					type: 'textarea',
				},
				{
					model: 'yizhu',
					label: '医嘱',
					type: 'textarea',
				},
			],
			operateForm: {
				name: '',
				sex: '',
				id_number: '',
				jiuzhenshijian: '',
				doctor: '',
				department: '',
				huanzheqingkuang: '',
				zhenduanjieguo: '',
				yizhu: '',
			},
			formLabel: [
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
					model: 'id_number',
					label: '身份证号',
					type: 'input',
				},
				{
					model: 'bingzhong',
					label: '病种',
					type: 'input',
				},
			],
			searchForm: {
				patient_name: '',
				sex: '',
				id_number: '',
				bingzhong: '',
			},
			tableData: [],
			tableLabel: [
				{
					prop: 'name',
					label: '姓名',
				},
				{
					prop: 'sexLabel',
					label: '医生',
				},
				{
					prop: 'password',
					label: '科室',
					width: 320,
				},
				{
					prop: 'addr',//数据在既往病史拿
					label: '时间',
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
		addUser() {
			this.isShow = true
			this.operateType = 'add'
			this.operateForm = {
				uid: '',
				phone: '',
				department: '',
				name: '',
				sex: '',
			}
		},

		getList(searchForm = {}) {
		this.config.loading = true;
		if (searchForm.patient_name) {
			this.config.page = 1;
		}
		getUser({
			page: this.config.page,
			name: searchForm.patient_name || '',
			sex: searchForm.sex || '',
			id_number: searchForm.id_number || '',
			bingzhong: searchForm.bingzhong || '',
		}).then(({ data: res }) => {
			console.log(res, 'res');
			this.tableData = res.list.map((item) => {
			item.sexLabel = item.sex === 0 ? '女' : '男';
			return item;
			});
			this.config.total = res.count;
			this.config.loading = false;
		});
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
