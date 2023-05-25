const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://collinskirui23:colo123@cluster0.hnhuyzz.mongodb.net/blogsdb')
        console.log(`Connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
   
}

module.exports = connectDb