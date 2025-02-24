import http from 'http';

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
        // 设置响应头
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        });

        // 发送事件
        const sendEvent = (msg) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const data = `data: ${msg ? msg : new Date().toLocaleTimeString()}\n\n`;
                    res.write(data);
                    resolve();
                }, 1000);
            });
        };

        // 每秒发送一次消息
        await sendEvent('Start');
        for (let i = 0; i < 10; i++) {
            await sendEvent();
        }
        await sendEvent('End');
        res.end();

        // 清理连接
        req.on('close', () => {
            console.log('Client disconnected');
            res.end();
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

// 监听端口
server.listen(3000, () => {
    console.log('SSE server is running at http://localhost:3000/events');
});
