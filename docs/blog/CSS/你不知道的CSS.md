# 你不知道的 CSS

## 文本

### 文字环绕

<div style="width: 700px;">
	<img style="width: 500px; height: 500px; float: left; shape-outside: inset(10px 10px 10px 10px round 50%);" src="https://img.wuhaochao.top/funny.png">
	<p>阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿
    </p>
</div>

```html
<style>
  body {
    width: 700px;
  }
  img {
    width: 500px;
    height: 500px;
    float: left;
    shape-outside: inset(10px 10px 10px 10px round 50%);
  }
</style>

<body>
  <img src="https://img.wuhaochao.top/funny.png" />
  <p>
    阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿阿巴阿巴阿巴阿巴阿巴阿巴阿
  </p>
</body>
```



### 首字


```html
<style>
  p::first-letter {
    color: red;
    font-weight: bold;
  }
</style>
<body>
  <p>阿巴阿巴阿巴阿巴阿</p>
</body>
```



### 选中背景颜色

```html
<style>
  ::selection {
    background-color: #f3b70f;
  }
</style>
<body>
  <p>测试选中</p>
</body>
```



### 模糊文本


```html
<style>
  p {
    font-size: 30px;
    color: transparent;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
</style>
<body>
  <p>阿巴阿巴阿巴</p>
</body>
```



## 图片

### 透明图片投影


```html
<style>
  img {
    width: 500px;
    height: 500px;
    object-fit: cover;
    filter: drop-shadow(30px 10px 4px #757575);
  }
</style>
<body>
  <img src="https://img.wuhaochao.top/funny.png" />
</body>
```



## 事件

### 禁止鼠标事件

```html
<style>
  [disabled] {
    pointer-events: none;
  }
</style>
<body>
  <a href="#">默认</a>
  <a href="#" disabled>禁止</a>
</body>
```
