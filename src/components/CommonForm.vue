<template>
	<el-form ref="form" lab-width="100px" :model="form" :inline="inline">
		<el-form-item
			v-for="item in formLabel"
			:key="item.label"
			:label="item.label"
		>
			<el-input
				v-if="item.type === 'input'"
				:placeholder="'请输入' + item.label"
				v-model="form[item.model]"
			></el-input>	
			<el-input
				v-if="item.type === 'ban_input'"
				:placeholder="'请输入' + item.label"
				:disabled="true"
				v-model="form[item.model]"
			></el-input>		
			<el-date-picker
				v-if="item.type === 'ban_date'"
				type="date"
				value-format="yyyy-MM-dd"
				placeholder="选择日期"
				:disabled="true"
				v-model="form[item.model]"
			></el-date-picker>
			<el-switch
				v-if="item.type === 'switch'"
				v-model="form[item.model]"
			></el-switch>
			<el-date-picker
				v-if="item.type === 'date'"
				type="date"
				value-format="yyyy-MM-dd"
				placeholder="选择日期"
				v-model="form[item.model]"
			></el-date-picker>
			<el-select
				v-if="item.type === 'select'"
				placeholder="请选择"
				v-model="form[item.model]"
			>
				<el-option
					v-for="item in item.opts"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>
			<el-input
				v-if="item.type === 'textarea'"
				type="textarea"
				autosize
				placeholder="请输入内容"
				v-model="form[item.model]"
			></el-input>


		</el-form-item>
		<el-form-item><slot></slot></el-form-item>
	</el-form>
</template>

<script>
export default {
	name: 'CommonForm',
	props: {
		formLabel: Array,
		form: Object,
		inline: Boolean,
	},
	data() {
		return {}
	},
}
</script>
