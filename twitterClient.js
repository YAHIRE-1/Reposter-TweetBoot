// Importa la clase TwitterApi del paquete twitter-api-v2
const { TwitterApi } = require("twitter-api-v2");

// Crea una nueva instancia de TwitterApi utilizando las claves y tokens de acceso de la API de Twitter
const client = new TwitterApi({
    // Clave de la API, obtenida de las variables de entorno
    appKey: process.env.API_KEY,
    // Secreto de la API, obtenido de las variables de entorno
    appSecret: process.env.API_SECRET,
    // Token de acceso, obtenido de las variables de entorno
    accessToken: process.env.ACCESS_TOKEN,
    // Secreto del token de acceso, obtenido de las variables de entorno
    accessSecret: process.env.ACCESS_SECRET,
});

// Crea una nueva instancia de TwitterApi utilizando un token Bearer
const bearer = new TwitterApi(process.env.BEARER_TOKEN);

// Crea un cliente de Twitter con permisos de lectura y escritura
const twitterClient = client.readWrite;
// Crea un cliente de Twitter con permisos de solo lectura
const twitterBearer = bearer.readOnly;

// Exporta las instancias de los clientes de Twitter para que puedan ser utilizadas en otros archivos
module.exports = { twitterClient, twitterBearer };
