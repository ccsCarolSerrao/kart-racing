import 'reflect-metadata'
import { App } from './app'

const port = process.env.PORT || 3000

App.appFactory().then(app => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`)
    })
})
