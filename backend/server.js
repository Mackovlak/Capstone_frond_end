const Hapi = require("@hapi/hapi")
const connectDB = require("./db");
const userRoutes = require("./routes/user");

const init = async () => {
    await connectDB();

    const server = Hapi.server({
        port:4000,
        host:'localhost',
        routes:{
            cors:{
                origin: ['*']
            }
        }
    })

    // await server.register(require("@hapi/inert"))
    server.route(userRoutes)

    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) =>{
    console.log(err);
    process.exit(1);
})

init();