import Mock from 'mockjs'
export default {
	getMenu: (param) => {
		const { username, password } = JSON.parse(param.body)
		if (username === 'doctor' && password === 'doctor') {
			return {
				code: 20000,
				data: {
					menu: [
						{
							label: '患者管理',
							icon: 'location',
							children: [
								{
									path: '/page1',
									name: 'page1',
									label: '患者建档',
									icon: 'setting',
									url: 'doctor/filing.vue',
								},
								{
									path: '/page2',
									name: 'page2',
									label: '患者列表',
									icon: 'setting',
									url: 'doctor/index.vue',
								},
							],
						},
						{
							label: '诊疗管理',
							icon: 'location',
							children: [
								{
									path: '/page3',
									name: 'page3',
									label: '诊疗建档',
									icon: 'setting',
									url: 'diagnosis/filing.vue',
								},
								{
									path: '/page4',
									name: 'page4',
									label: '诊疗记录',
									icon: 'setting',
									url: 'diagnosis/index.vue',
								},
							],
						},
						{
							label: '远程随访',
							icon: 'location',
							children: [
								{
									path: '/page5',
									name: 'page5',
									label: '发送随访',
									icon: 'setting',
									url: 'follow-up/send.vue',
								},
								{
									path: '/page6',
									name: 'page6',
									label: '随访历史',
									icon: 'setting',
									url: 'follow-up/index.vue',
								},
							],
						},
					],
					//token 是一个随机生成的登录凭证
					token: Mock.Random.guid(),
					message: '获取成功',
				},
			}
		} else if (username === 'user' && password === 'user') {
			return {
				code: 20000,
				data: {
					menu: [
						{
							path: '/',
							name: 'home',
							label: '首页',
							icon: 's-home',
							url: 'home/index',
						},
						{
							path: '/video1',
							name: 'video1',
							label: '个人信息',
							icon: 'video-play',
							url: 'Personal_Information/index',
						},
						{
							path: '/video2',
							name: 'video2',
							label: '诊疗记录',
							icon: 'video-play',
							url: 'Personal_Diagnosis/index',
						},
						{
							label: '随访功能',
							icon: 'location',
							children: [
								{
									path: '/page11',
									name: 'page11',
									label: '风险评估',
									icon: 'setting',
									url: 'Personal_follow-up/risk_assessment.vue',
								},
								{
									path: '/page12',
									name: 'page12',
									label: '随访历史',
									icon: 'setting',
									url: 'Personal_follow-up/follow-up_history.vue',
								},
							],
						},
					],
					token: Mock.Random.guid(),
					message: '获取成功',
				},
			}
		} else if (username === 'admin' && password === 'admin') {
			return {
				code: 20000,
				data: {
					menu: [
						{
							path: '/',
							name: 'home',
							label: '首页',
							icon: 's-home',
							url: 'home/index',
						},
						{
							path: '/user-doctor',
							name: 'user-doctor',
							label: '医生信息',
							icon: 'video-play',
							url: 'user-doctor/index',
						},
						{
							path: '/user',
							name: 'user',
							label: '账号管理',
							icon: 'video-play',
							url: 'user/index',
						},
					],
					token: Mock.Random.guid(),
					message: '获取成功',
				},
			}
		}else {
			return {
				code: -999,
				data: {
					message: '密码错误',
				},
			}
		}
	},
}
