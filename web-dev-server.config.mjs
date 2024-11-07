export default {
    open: true,
    watch: true,
    appIndex: 'index.html',
    nodeResolve: true,
    middleware: [
        function rewriteIndex(context, next) {
            if (context.url.startsWith('/employees')) {
                context.url = '/index.html';
            }
            return next();
        },
    ],
    plugins: []
};