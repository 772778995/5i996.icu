# JS 内卷大法

## 字符

### 求某个字符串第 n 个字符

```js
const string = '我爱你'

// 普通
const str1 = string.charAt(1)	// 爱

// 简写
const str2 = string[1]			// 爱
```



### 获取 url 参数

```js
// split 方法
function getParams(url) {
  const res = {}
  if (url.includes('?')) {
    const str = url.split('?')[1]
    const arr = str.split('&')
    arr.forEach(item => {
      const key = item.split('=')[0]
      const val = item.split('=')[1]
      res[key] = decodeURIComponent(val) // 解码
    })
  }
  return res
}

// URLSearchParams 方法
// 创建一个URLSearchParams实例
const urlSearchParams = new URLSearchParams(window.location.search)
// 把键值对列表转换为一个对象
const params = Object.fromEntries(urlSearchParams.entries())
```





## 数字

### 求 n 次方

```js
// 普通
2 * 2 * 2 * 2 * 2	// 32

// 简写
2 ** 5				// 32
```



### 浮点数转换成整数

```js
// 普通
Math.floor(5.4321)		// 5

// 简写
~~5.4321				// 5

// 注意只适用于32位整数
// 即大于2147483647的数字会给出错误的结果，这种情况使用 Math.floor()
```



### 求数组中最大和最小的数字

```js
const arr = [5, 4, 3, 2, 1, 0]

const max = Math.max(...arr)	// 5
const min = Math.min(...arr)	// 0
```



## 数组

### 合并数组

```js
// 普通
let arr1 = [2, 1, 0]
arr1 = arr1.concat([1, 2])	// [2, 1, 0, 1, 2]

// 简写
let arr2 = [2, 1, 0]
arr2 = [...arr2, 1, 2]		// [2, 1, 0, 1, 2]
```



### 数组去重

```js
// indexOf 去重
function resetArr(arr) {
  let res = []
  arr.forEach(item => {
    if (res.indexOf(item) === -1) {
      res.push(item)
    }
  })
  return res
}

// Array.from 去重
const newArr = Array.from(new Set(arr))

// Set 去重
cosnt newArr = [...new Set(arr)]
```



### 循环数组

```js
const arr = [5, 4, 3, 2, 1, 0]

// 普通
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
}

// 简写方式一，只有一句代码时配合箭头函数最简短
arr.forEach(item => console.log(item))

// 简写方式二，通常用于遍历对象
for (const prop in arr) {
    console.log(arr[prop])
}

// 简写方式三，利用迭代器遍历
for (const item of arr) {
    console.log(item)
}
// 方式三对于相对于外部的异步操作很有效
async function() {
    for (const item of arr) {
    	await item()
	}
}
```



## 转换

### Number  > String 

```js
// 普通
10.toString()		// '10'

// 简写
10 + ''				// '10'
```



### String  >  Number 

```js
// 普通
parseInt('10')		// 10
parseFloat('10.5')	// 10.5

// 简写
+'10'				// 10
+'10.5'				// 10.5
```



###  下划线  > 小驼峰

```js
// 下划线转驼峰
const underline2Hump = s => {
	return s.replace(/_(\w)/g, (_, letter) => {
		return letter.toUpperCase()
	})
}

// 对象下划线转换为小驼峰
const toHump = obj => {
	if (obj instanceof Array) {
		obj.forEach(v => toHump(v))
	} else if (obj instanceof Object) {
		Object.keys(obj).forEach(key => {
			const newKey = underline2Hump(key)
			if (newKey !== key) {
				obj[newKey] = obj[key]
				delete obj[key]
			}
			toHump(obj[newKey])
		})
	}
}
```



### 小驼峰 > 下划线

```js
// 驼峰转下划线
const hump2Underline = s => s.replace(/([A-Z])/g, '_$1').toLowerCase()

// 转为下划线
const toUnderline = obj => {
	if (obj instanceof Array) {
		obj.forEach(v => toUnderline(v))
	} else if (obj instanceof Object) {
		Object.keys(obj).forEach(key => {
			const newKey = hump2Underline(key)
			if (newKey !== key) {
				obj[newKey] = obj[key]
				delete obj[key]
			}
			toUnderline(obj[newKey])
		})
	}
}
```



## 比较

### 判断是否等于某个值

```js
const val = 2

// 普通
if (val === 1 || val === 2 || val === 3) {
    // ……
}

// 简写
if ([1, 2, 3].includes(val)) {
	// ……
}
```



### 深拷贝

```js
function deepClone(obj, cache = new WeakMap()) {
  if (typeof obj !== 'object') return obj // 普通类型，直接返回
  if (obj === null) return obj
  if (cache.get(obj)) return cache.get(obj) // 防止循环引用，程序进入死循环
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  
  // 找到所属原型上的constructor，所属原型上的constructor指向当前对象的构造函数
  let cloneObj = new obj.constructor()
  cache.set(obj, cloneObj) // 缓存拷贝的对象，用于处理循环引用的情况
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache) // 递归拷贝
    }
  }
  return cloneObj
}

// 测试
const obj = { name: 'Jack', address: { x: 100, y: 200 } }
obj.a = obj // 循环引用
const newObj = deepClone(obj)
console.log(newObj.address === obj.address) // false
```



## 函数

### 防抖

```js
function debounce(fn, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 测试
function task() {
  console.log('run task')
}
const debounceTask = debounce(task, 1000)
window.addEventListener('scroll', debounceTask)
```



### 节流

```js
function throttle(fn, delay) {
  let last = 0 // 上次触发时间
  return (...args) => {
    const now = Date.now()
    if (now - last > delay) {
      last = now
      fn.apply(this, args)
    }
  }
}

// 测试
function task() {
  console.log('run task')
}
const throttleTask = throttle(task, 1000)
window.addEventListener('scroll', throttleTask)
```



## 异步

### 并发 await

```js
const foo = await getFoo();
const bar = await getBar();
// 上面这样写法 getFoo完成以后，才会执行getBar

// 同时触发写法 ↓

// 写法一
const [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
const fooPromise = getFoo()
const barPromise = getBar()
const foo = await fooPromise
const bar = await barPromise
```



### 手写 Promise

```js
class MyPromise {
  constructor(executor) { // executor执行器
    this.status = 'pending' // 等待状态
    this.value = null // 成功或失败的参数
    this.fulfilledCallbacks = [] // 成功的函数队列
    this.rejectedCallbacks = [] // 失败的函数队列
    const that = this
    function resolve(value) { // 成功的方法
      if (that.status === 'pending') {
        that.status = 'resolved'
        that.value = value
        that.fulfilledCallbacks.forEach(myFn => myFn(that.value)) //执行回调方法
      }
    }
    function reject(value) { //失败的方法
      if (that.status === 'pending') {
        that.status = 'rejected'
        that.value = value
        that.rejectedCallbacks.forEach(myFn => myFn(that.value)) //执行回调方法
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === 'pending') {
      // 等待状态，添加回调函数到成功的函数队列
      this.fulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      // 等待状态，添加回调函数到失败的函数队列
      this.rejectedCallbacks.push(() => {
        onRejected(this.value)
      })
    }
    if (this.status === 'resolved') { // 支持同步调用
      console.log('this', this)
      onFulfilled(this.value)
    }
    if (this.status === 'rejected') { // 支持同步调用
      onRejected(this.value)
    }
  }
}

// 测试
function fn() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if(Math.random() > 0.6) {
        resolve(1)
      } else {
        reject(2)
      }
    }, 1000)
  })
}
fn().then(
  res => {
    console.log('res', res) // res 1
  },
  err => {
    console.log('err', err) // err 2
  })
```



### 异步控制并发

```js
function limitRequest(urls = [], limit = 3) {
  return new Promise((resolve, reject) => {
    const len = urls.length
    let count = 0 // 当前进行到第几个任务

    const start = async () => {
      const url = urls.shift() // 从数组中拿取第一个任务
      if (url) {
        try {
          await axios.post(url)
          if (count == len - 1) {
            // 最后一个任务成功
            resolve()
          } else {
            count++
            // 成功，启动下一个任务
            start()
          }
        } catch (e) {
          if (count == len - 1) {
            // 最后一个任务失败
            resolve()
          } else {
            count++
            // 失败，启动下一个任务
            start()
          }
        }
      }
    }

    // 启动limit个任务
    while (limit > 0) {
      start()
      limit -= 1
    }
  })
}

// 测试
limitRequest(['http://xxa', 'http://xxb', 'http://xxc', 'http://xxd', 'http://xxe'])
```

