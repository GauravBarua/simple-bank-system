require('dotenv').config()
require('./models/mongoose')

const config = require('./config/config')

const port = process.env.PORT || 3000
const app = config.setUpServer()

Route: /auth
Method: POST,
AdminPrivilege: false,
Header: --,
Body: {
        email: teste@teste.com,
        password: "teste"
    }

app.listen(port, () => {
  console.log(` ----------------------\n|      SERVER ON!      |\n|      Porta: ${port}     |\n ----------------------`)
})
