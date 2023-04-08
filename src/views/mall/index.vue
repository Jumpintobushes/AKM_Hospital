<template>
	<div class="manage">
		<el-dialog
			:title="operateType === 'add' ? '新增条目' : '更新条目'"
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
			<el-button type="primary" @click="addDetail">+新增</el-button>
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
			@edit="editDetail"
			@del="delDetail"
		></common-table>
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
			opertateFormLabel: [
				{
					model: 'uid',
					label: 'uid',
					type: 'input',
				},
				{
					model: 'account',
					label: '对方账户',
					type: 'input',
				},
				{
					model: 'name',
					label: '对方户名',
					type: 'input',
				},
				{
					model: 'amount',
					label: '金额',
					type: 'input',
				},
				{
					model: 'type',
					label: '种类',
					type: 'select',
					opts: [
						{
							label: '收入',
							value: 1,
						},
						{
							label: '支出',
							value: 0,
						},
					],
				},
				{
					model: 'birth',
					label: '交易日期',
					type: 'date',
				},
			],
			operateForm: {
				uid: '',
				account: '',
				name: '',
				amount: '',
				brith: '',
				type: '',
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
					prop: 'uid',
					label: 'uid',
					width: 320,
				},
				{
					prop: 'account',
					label: '对方账户',
					width: 320,
				},
				{
					prop: 'name',
					label: '对方户名',
				},
				{
					prop: 'amount',
					label: '金额',
				},
				{
					prop: 'typeLabel',
					label: '种类',
				},
				{
					prop: 'birth',
					label: '交易日期',
					width: 200,
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
		addDetail() {
			this.isShow = true
			this.operateType = 'add'
			this.operateForm = {
				uid: '',
				account: '',
				name: '',
				amount: '',
				brith: '',
				type: '',
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
