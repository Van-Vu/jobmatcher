// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { app, router, store } from './root'

const meta = (app as any).$meta() // here

const isDev = process.env.NODE_ENV !== 'production'

export default context => {
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()

        context.meta = meta // and here

        // wait until router has resolved possible async components and hooks
        const routeReady = () => {
            const matchedComponents = router.getMatchedComponents()

            if (process.env.NODE_ENV !== 'production') {
                console.log(`hit the server ${context.url}`);
            }

            // no matched routes, reject with 404
            if (!matchedComponents.length) {
                reject({ code: 404 })
            }
            // call asyncData() on all matched route components
            Promise.all(matchedComponents.map(component => {
                if (component && (component as any).asyncData) {
                    return (component as any).asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                // After all preFetch hooks are resolved, our store is now
                // filled with the state needed to render the app.
                // When we attach the state to the context, and the `template` option
                // is used for the renderer, the state will automatically be
                // serialized and injected into the HTML as window.__INITIAL_STATE__.
                isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
                context.state = store.state
                resolve(app)
            }).catch(reject)

            // the Promise should resolve to the app instance so it can be rendered
            //resolve(app)
        }

        // set server-side router's location
        router.push(context.url, () => {
           router.onReady(routeReady, reject)
        }, () => {
            router.onReady(routeReady, reject)
        })
    })

}