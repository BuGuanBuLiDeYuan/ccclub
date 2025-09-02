/**
 * 微信分享优化脚本
 * 自动配置微信分享的标题、描述和图片
 */

(function () {
    'use strict';

    // 默认分享配置
    const defaultConfig = {
        title: 'Claude Code Club - AI编程学习社区',
        desc: '专业的AI编程学习社区，提供Claude AI编程教程、代码示例和最佳实践',
        imgUrl: 'https://ccclub.club/assets/og-image.png'
    };

    // 从页面 meta 标签获取分享信息
    function getShareConfig() {
        const config = {
            title: document.querySelector('meta[property="og:title"]')?.content ||
                document.querySelector('meta[itemprop="name"]')?.content ||
                document.title ||
                defaultConfig.title,

            desc: document.querySelector('meta[property="og:description"]')?.content ||
                document.querySelector('meta[itemprop="description"]')?.content ||
                document.querySelector('meta[name="description"]')?.content ||
                defaultConfig.desc,

            link: document.querySelector('meta[property="og:url"]')?.content ||
                document.querySelector('link[rel="canonical"]')?.href ||
                window.location.href,

            imgUrl: document.querySelector('meta[property="og:image"]')?.content ||
                document.querySelector('meta[itemprop="image"]')?.content ||
                defaultConfig.imgUrl
        };

        return config;
    }

    // 设置微信分享
    function setupWechatShare() {
        const shareConfig = getShareConfig();

        // 确保图片 URL 是绝对路径
        if (shareConfig.imgUrl && !shareConfig.imgUrl.startsWith('http')) {
            shareConfig.imgUrl = window.location.origin + '/' + shareConfig.imgUrl.replace(/^\//, '');
        }

        // 微信 JS-SDK 配置
        if (typeof WeixinJSBridge !== 'undefined') {
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function () {
                WeixinJSBridge.invoke('shareTimeline', {
                    title: shareConfig.title,
                    desc: shareConfig.desc,
                    link: shareConfig.link,
                    img_url: shareConfig.imgUrl
                });
            });

            // 分享给朋友
            WeixinJSBridge.on('menu:share:appmessage', function () {
                WeixinJSBridge.invoke('sendAppMessage', {
                    title: shareConfig.title,
                    desc: shareConfig.desc,
                    link: shareConfig.link,
                    img_url: shareConfig.imgUrl
                });
            });

            // 分享到 QQ
            WeixinJSBridge.on('menu:share:qq', function () {
                WeixinJSBridge.invoke('shareQQ', {
                    title: shareConfig.title,
                    desc: shareConfig.desc,
                    link: shareConfig.link,
                    img_url: shareConfig.imgUrl
                });
            });
        }

        // 动态更新页面标题（确保微信能正确读取）
        document.title = shareConfig.title;

        // 在控制台输出分享配置（调试用）
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('微信分享配置:', shareConfig);
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupWechatShare);
    } else {
        setupWechatShare();
    }

    // 监听微信 JS-SDK 加载
    document.addEventListener('WeixinJSBridgeReady', setupWechatShare);

})();