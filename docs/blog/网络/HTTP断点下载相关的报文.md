## HTTP断点下载相关的报文

- Accept-Ranges
  告诉客户端服务器是否支持断点续传，服务器返回
- Content-Range
  在HTTP协议中，响应首部 Content-Range 显示的是一个数据片段在整个文件中的位置。
- ETag
  资源标识 非必须 服务器返回
- Last-Modified
  资源最后一次更新的时间 非必须 服务器返回

```js
//响应示例 
accept-ranges: bytes
Content-Range: bytes 200-1000/67589 // 返回文件 200字节到1000字节 的数据，总文件大小67589字节
etag: "5f0dce96-48e"
last-modified: Tue, 14 Jul 2020 15:26:14 GMT
```

- Range
  请求头设置Range, 指定服务器返回指定区域内容，如果不设置Range会返回整个文件。服务器片段返回状态码是206，请求的范围如果无效状态码会是416，全部返回状态码是200

```js
//示例 
Range: bytes=0-499 表示第 0-499 字节范围的内容 
Range: bytes=500-999 表示第 500-999 字节范围的内容 
Range: bytes=-500 表示最后 500 字节的内容 
Range: bytes=500- 表示从第 500 字节开始到文件结束部分的内容 
Range: bytes=0-0,-1 表示第一个和最后一个字节 
Range: bytes=500-600,601-999 同时指定几个范围
```