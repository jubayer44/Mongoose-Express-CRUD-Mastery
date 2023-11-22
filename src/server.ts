import app from './app'
import config from './app/config'

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${config.port}`) // eslint-disable-line
})
