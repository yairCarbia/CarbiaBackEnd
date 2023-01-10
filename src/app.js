import app from './index.js'
import './db/database.js'

const PORT = process.env.PORT
export const server = app.listen(PORT, () => console.log(`sv running on port ${PORT}`))