import http from 'http';
import sse from './module/sse.js';
import xss from './module/xss.js';

const server = http.createServer(async (req, res) => {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有域名访问
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的 HTTP 方法
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // 允许的请求头

    if (req.method === 'OPTIONS') {
        // 对于预检请求，直接返回
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/events') {
        sse(req, res);
        return;
    }

    if (req.url.startsWith('/xss/test')) {
        xss(req, res);
        return;
    }

    res.writeHead(404);
    res.end();
});

// 监听端口
server.listen(3000, () => {
    console.log('node server is running at http://localhost:3000');
});
