import app from './index.js'
import './db/database.js'

const port = process.env.PORT || 8080

app.listen(port, () => console.log('running on 8080'))