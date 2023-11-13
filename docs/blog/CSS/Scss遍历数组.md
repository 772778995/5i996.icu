# Scss遍历数组

scss源文件：

```scss
$colorList: (
  danger: #F95556,
  warning: #E6A23C,
  success: #67C23A,
  info: #409EFF,
  auxiliary: #999,
  black: #333,
  white: #fff
);

@each $key, $item in $colorList {
    ._#{ $key } { color: $item; }
    ._#{ $key }-bg { background-color: $item; }
    ._#{ $key }-btn {
      background-color: $item;
      transition: .1s;
      &:active { filter: brightness(90%); }
    }
}
```

生成的css文件：

```css
._danger {
  color: #F95556; }

._danger-bg {
  background-color: #F95556; }

._danger-btn {
  background-color: #F95556;
  transition: .1s; }
  ._danger-btn:active {
    filter: brightness(90%); }

._warning {
  color: #E6A23C; }

._warning-bg {
  background-color: #E6A23C; }

._warning-btn {
  background-color: #E6A23C;
  transition: .1s; }
  ._warning-btn:active {
    filter: brightness(90%); }

._success {
  color: #67C23A; }

._success-bg {
  background-color: #67C23A; }

._success-btn {
  background-color: #67C23A;
  transition: .1s; }
  ._success-btn:active {
    filter: brightness(90%); }

._info {
  color: #409EFF; }

._info-bg {
  background-color: #409EFF; }

._info-btn {
  background-color: #409EFF;
  transition: .1s; }
  ._info-btn:active {
    filter: brightness(90%); }

._auxiliary {
  color: #999; }

._auxiliary-bg {
  background-color: #999; }

._auxiliary-btn {
  background-color: #999;
  transition: .1s; }
  ._auxiliary-btn:active {
    filter: brightness(90%); }

._black {
  color: #333; }

._black-bg {
  background-color: #333; }

._black-btn {
  background-color: #333;
  transition: .1s; }
  ._black-btn:active {
    filter: brightness(90%); }

._white {
  color: #fff; }

._white-bg {
  background-color: #fff; }

._white-btn {
  background-color: #fff;
  transition: .1s; }
  ._white-btn:active {
    filter: brightness(90%); }

```

