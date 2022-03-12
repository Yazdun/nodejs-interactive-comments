require('dotenv').config()
require('express-async-errors')

// SECURITY PACKAGES
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// APP
const express = require('express')
const app = express()
const connectDB = require('./db/connect')

// MIDDLEWARES
const { authUser, isLoggedIn } = require('./middleware/authentication')

// ROUTES
const public_comment_router = require('./routes/public.comment')
const public_auth_router = require('./routes/public.auth')
const protected_comment_router = require('./routes/protected.comment')
const protected_user_router = require('./routes/protected.user')

// ERROR HANDLERS
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// INITIAL APP
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
)

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(xss())

app.use('/', express.static('docs'))

// ROUTERS
app.use('/api/v1/public/comment', isLoggedIn, public_comment_router)
app.use('/api/v1/public/auth', public_auth_router)
app.use('/api/v1/protected/comment', authUser, protected_comment_router)
app.use('/api/v1/protected/user', authUser, protected_user_router)

// ERROR HANDLER
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
