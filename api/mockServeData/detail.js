import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      uid: Mock.Random.guid(),//全局唯一的随机id——————uid
      account: Mock.Random.float(),
      patient_name: Mock.Random.cname(),//随机中文名————————用户名/账号
      birth: Mock.Random.date(),//随机生日
      type: Mock.Random.integer(0, 1),//0支出1收入
      'amount|1-10000': 0//年龄1-10000的数
    })
  )
}

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getDetailList: config => {
    const { name, page = 1, limit = 100 } = param2Obj(config.url)
    console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  /**
   * 增加用户
   * @param name, account, amount, birth, type
   * @return {{code: number, data: {message: string}}}
   */
  createDetail: config => {
    const { name, account, amount, birth, type } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    List.unshift({
      uid: Mock.Random.guid(),
      account: account,
      name: name,
      amount: amount,
      birth: birth,
      type: type
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteDetail: config => {
    const { id } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 批量删除
   * @param config
   * @return {{code: number, data: {message: string}}}
   */
  batchremove: config => {
    let { ids } = param2Obj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code: 20000,
      data: {
        message: '批量删除成功'
      }
    }
  },
  /**
   * 修改用户
   * @param id, name, account, amount, birth, type
   * @return {{code: number, data: {message: string}}}
   */
  updateDetail: config => {
    const { id, name, account, amount, birth, type } = JSON.parse(config.body)
    const type_num = parseInt(type)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.account = account
        u.amount = amount
        u.birth = birth
        u.type = type_num
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}
