const express = require('express');
const favicon = require('express-favicon');
const { createProxyMiddleware } = require('http-proxy-middleware');

const path = require('path');
const port = process.env.PORT;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/campaign', createProxyMiddleware({ target: 'https://dialitnow.ga:8080', changeOrigin: true }));


app.listen(port);
