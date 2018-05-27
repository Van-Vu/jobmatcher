const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')


const isProd = process.env.NODE_ENV === 'production'
//const isProd = true
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`


const app = express()

function createRenderer(bundle, options) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, Object.assign(options, {
        // for component caching
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),
        // recommended for performance
        runInNewContext: false
    }))
}


let renderer
let readyPromise
const templatePath = resolve('./index.html')

if (isProd) {
    // In production: create server renderer using server bundle and index HTML
    // template from real fs.
    // The server bundle is generated by vue-ssr-webpack-plugin.
    const template = fs.readFileSync(templatePath, 'utf-8')
    const serverBundle = require('./dist/vue-ssr-server-bundle.json')

    const clientManifest = require('./dist/vue-ssr-client-manifest.json')


    // src/index.template.html is processed by html-webpack-plugin to inject
    // build assets and output as dist/index.html.
    renderer = createRenderer(serverBundle, {
        template,
        clientManifest
    })
} else {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = require('./build/dev-server')(
      app,
      templatePath,
      (bundle, options) => {
          renderer = createRenderer(bundle, options)
      }
    )
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})


app.use(compression({ threshold: 0 }))
app.use('/static', serve('./dist/static', true))
app.use('/dist', serve('./dist', true))
app.use('/favicon.ico', serve('./favicon.ico', true))
app.use(express.static('dist', { index: false }))
app.use('/service-worker.js', serve('./dist/service-worker.js'))

function render(req, res) {
    const s = Date.now()

    res.setHeader("Content-Type", "text/html")
    //res.setHeader("Server", serverInfo)

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        }

        console.log('handle error in server.js');
        console.log(err.status);
        switch (err.status) {
            case 400:
                res.status(400).sendFile(path.join(__dirname+'/static/page/400.html'));
                break;
            case 401:
                res.status(401).sendFile(path.join(__dirname+'/static/page/401.html'));
                break;
            case 403:
                //res.status(403).send('403 | Unauthorized operation');
                res.status(403).sendFile(path.join(__dirname+'/static/page/403.html'));
                break;
            case 404:
                res.status(404).sendFile(path.join(__dirname+'/static/page/404.html'));
                break;
            case 422:
                res.status(302).redirect("/login");
                break;
            default:
                // Render Error Page or Redirect
                res.status(500).sendFile(path.join(__dirname+'/static/page/500.html'));
                console.error(`error during render : ${req.url}`)
                console.error(err.stack)
        }
    }

    const context = { url: req.url }

    renderer.renderToStream(context)
    .on('error', handleError)
    .on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
    .pipe(res)
}

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 3000
app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`server started at http://localhost:${port}`)
})