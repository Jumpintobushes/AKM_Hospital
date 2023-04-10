<template>
	<div class="manage">
		<el-dialog
			:title="'输入指标进行评估'"
			:visible.sync="TNisShow"
		>
			<common-form
				:formLabel="tangniaobingFormLabel"
				:form="tangniaobingForm"
				:inline="true"
				ref="form"
			>
			</common-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="TNisShow = false">取消</el-button>
				<el-button type="primary" @click="TNconfirm">确定</el-button>
			</div>
		</el-dialog>

		<el-dialog
			:title="'输入指标进行评估'"
			:visible.sync="NDisShow"
		>
			<common-form
				:formLabel="niaoduzhengFormLabel"
				:form="niaoduzhengForm"
				:inline="true"
				ref="form"
			>
			</common-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="NDisShow = false">取消</el-button>
				<el-button type="primary" @click="NDconfirm">确定</el-button>
			</div>
		</el-dialog>

		<el-dialog
			:title="'输入指标进行评估'"
			:visible.sync="MXSYisShow"
		>
			<common-form
				:formLabel="manxingshenyanFormLabel"
				:form="manxingshenyanForm"
				:inline="true"
				ref="form"
			>
			</common-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="MXSYisShow = false">取消</el-button>
				<el-button type="primary" @click="MXSYconfirm">确定</el-button>
			</div>
		</el-dialog>
    <el-row>
      <el-col :span="6" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/images/TN.jpg" class="image">
          <div style="padding: 14px;">
            <span>糖尿病风险</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="addTN">立即评估</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/images/ND.jpeg" class="image">
          <div style="padding: 14px;">
            <span>尿毒症风险</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="addND">立即评估</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <img src="../../assets/images/MXSY.jpg" class="image">
          <div style="padding: 14px;">
            <span>慢性肾炎风险</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="addMXSY">立即评估</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
	</div>
</template>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
<script>
import CommonForm from '../../components/CommonForm.vue'
import CommonTable from '../../components/CommonTable.vue'
export default {
	name: 'user',
	components: {
		CommonForm,
		CommonTable,
	},
	data() {
		return {
			TNisShow: false,
			NDisShow: false,
			MXSYisShow: false,
			tangniaobingFormLabel: [
				{
					model: 'tanghuaxuehongdanbai',
					label: '糖化血红蛋白',
					type: 'input',
				},
				{
					model: 'shousuoya',
					label: '收缩压',
					type: 'input',
				},
				{
					model: 'shuzhangya',
					label: '舒张压',
					type: 'input',
				},
				{
					model: 'zongdanguchun',
					label: '总胆固醇',
					type: 'input',
				},
				{
					model: 'dimiduzhidanbai',
					label: '低密度脂蛋白',
					type: 'input',
				},
				{
					model: 'ganyousanzhi',
					label: '甘油三酯',
					type: 'input',
				},
				{
					model: 'gaomiduzhidanbai',
					label: '高密度脂蛋白',
					type: 'input',
				},
				{
					model: 'xuejigan',
					label: '血肌酐',
					type: 'input',
				},
				{
					model: 'niaosudan',
					label: '尿素氮',
					type: 'input',
				},
				{
					model: 'niaoweiliangdanbai',
					label: '尿微量白蛋白',
					type: 'input',
				},
			],
			tangniaobingForm: {
				tanghuaxuehongdanbai: '',
				shousuoya: '',
				shuzhangya: '',
				zongdanguchun: '',
				dimiduzhidanbai: '',
				ganyousanzhi: '',
				gaomiduzhidanbai: '',
				xuejigan: '',
				niaosudan: '',
				niaoweiliangdanbai: '',
			},
			niaoduzhengFormLabel: [
				{
					model: 'xuejigan',
					label: '血肌酐',
					type: 'input',
				},
				{
					model: 'niaosudan',
					label: '尿素氮',
					type: 'input',
				},
				{
					model: 'xuejia',
					label: '血钾',
					type: 'input',
				},
				{
					model: 'xuegai',
					label: '血钙',
					type: 'input',
				},
				{
					model: 'xuelinhongdanbai',
					label: '血磷血红蛋白',
					type: 'input',
				},
				{
					model: 'dongmaixueyangfenya',
					label: '动脉血氧分压',
					type: 'input',
				},
				{
					model: 'eryanghuatanfenya',
					label: '二氧化碳分压',
					type: 'input',
				},
			],
			niaoduzhengForm: {
				xuejigan: '',
				niaosudan: '',
				xuejia: '',
				xuegai: '',
				xuelinhongdanbai: '',
				dongmaixueyangfenya: '',
				eryanghuatanfenya: '',
			},
			manxingshenyanFormLabel: [
				{
					model: 'xuejigan',
					label: '血肌酐',
					type: 'input',
				},
				{
					model: 'niaosudan',
					label: '尿素氮',
					type: 'input',
				},
				{
					model: 'shenxiaoqiuguolvlv',
					label: '肾小球过滤率',
					type: 'input',
				},
				{
					model: 'niaodanbai',
					label: '尿蛋白',
					type: 'input',
				},
			],
			manxingshenyanForm: {
				xuejigan: '',
				niaosudan: '',
				shenxiaoqiuguolvlv: '',
				niaodanbai: '',
			},
		}
	},
	methods: {
		TNconfirm() {
			this.$http.post('/user/add', this.tangniaobingForm).then((res) => {
				console.log(res)
				this.TNisShow = false
			})
		},
		NDconfirm() {
			this.$http.post('/user/add', this.niaoduzhengForm).then((res) => {
				console.log(res)
				this.NDisShow = false
			})
		},
		MXSYconfirm() {
			this.$http.post('/user/add', this.manxingshenyanForm).then((res) => {
				console.log(res)
				this.NDisShow = false
			})
		},
		addTN() {
			this.TNisShow = true
			this.tangniaobingForm = {
				tanghuaxuehongdanbai: '',
				shousuoya: '',
				shuzhangya: '',
				zongdanguchun: '',
				dimiduzhidanbai: '',
				ganyousanzhi: '',
				gaomiduzhidanbai: '',
				xuejigan: '',
				niaosudan: '',
				niaoweiliangdanbai: '',
			}
		},
		addND() {
			this.NDisShow = true
			this.niaoduzhengForm = {
				xuejigan: '',
				niaosudan: '',
				xuejia: '',
				xuegai: '',
				xuelinhongdanbai: '',
				dongmaixueyangfenya: '',
				eryanghuatanfenya: '',
			}
		},
		addMXSY() {
			this.MXSYisShow = true
			this.manxingshenyanForm = {
				xuejigan: '',
				niaosudan: '',
				shenxiaoqiuguolvlv: '',
				niaodanbai: '',
			}
		},
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
