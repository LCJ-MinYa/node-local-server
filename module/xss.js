import url from 'url';

export default async function (req, res) {
    // 设置响应状态码和内容类型
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // 获取请求的 Cookies，这个只有相同域名才行，没有意义
    const cookies = req.headers.cookie;
    // 解析 URL 和查询参数
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;

    // 返回 JSON 数据
    const responseData = {
        message: '我已经获取到该用户的cookie了！',
        cookies,
        queryParams,
        timestamp: new Date().toString(),
    };

    // 将数据写入响应体
    res.end(JSON.stringify(responseData));
}
