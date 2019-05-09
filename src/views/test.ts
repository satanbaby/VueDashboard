
/** 定義人物介面 */
interface persion{
  /**
   * 名字
   */
  name: string
  /**
   * 年齡
   */
  age: number
}

let p = {
  tempPersion: []
}

let per:persion[] = p.tempPersion
per.push({
  name: '1234',
  age: 18
})

export default persion
