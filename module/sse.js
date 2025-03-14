export default async function (req, res) {
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
            }, 100);
        });
    };

    // 每秒发送一次消息
    await sendEvent('Start');
    for (let i = 0; i < 200; i++) {
        await sendEvent();
    }
    await sendEvent('End');
    res.end();

    // 清理连接
    req.on('close', () => {
        console.log('Client disconnected');
        res.end();
    });
}
