require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient, twitterBearer } = require("./twitterClient.js");


// Función asíncrona para dar "me gusta" a los tweets con un hashtag específico
const like = async () => {
    try {
        // Realiza una búsqueda en Twitter usando el cliente de Bearer Token para encontrar tweets'
        const { data } = await twitterBearer.v2.search('PALABRE CLAVE PARA RETWEET');
        const tweets = data || []; // Asegurarse de que tweets sea un array

        // Verifica si se encontraron tweets
        if (tweets.length === 0) {
            console.log('No se encontraron tweets');
            return; // Salir de la función si no hay tweets
        }

        // Recorre todos los tweets encontrados
        for (const tweet of tweets) {
            try {
                // Da "me gusta" al tweet usando el cliente de autenticación de la app
                await twitterClient.v2.like(process.env.APP_ID, tweet.id);
                console.log(`Dio "me gusta" al tweet ${tweet.id}`);
            } catch (likeError) {
                // Captura y muestra errores al dar "me gusta"
                console.error(`Error al dar "me gusta" al tweet ${tweet.id}:`, likeError);
            }
        }
    } catch (searchError) {
        // Captura y muestra errores en la búsqueda de tweets
        console.error('Error al buscar tweets:', searchError);
    }
}


// Función asíncrona para retuitear el primer tweet encontrado con un hashtag específico
const retweet = async () => {
    let tweetID; // Definir fuera del bloque try
    try {
        // Realiza una búsqueda en Twitter usando el cliente de Bearer Token para encontrar tweets con el hashtag'
        const { data } = await twitterBearer.v2.search('PALABRE CLAVE PARA RETWEET');
        const tweets = data || []; // Asegurarse de que tweets sea un array

        // Verifica si se encontraron tweets
        if (tweets.length === 0) {
            console.log('No se encontraron tweets');
            return; // Salir de la función si no hay tweets
        }

        // Obtiene el ID del primer tweet encontrado
        tweetID = tweets[0].id;

        // Retuitea el tweet usando el cliente de autenticación de la app
        await twitterClient.v2.retweet(process.env.APP_ID, tweetID);
        console.log(`Retuiteó el tweet ${tweetID}`);
    } catch (searchError) {
        // Captura y muestra errores en la búsqueda de tweets
        console.error('Error al buscar tweets:', searchError);}
}



// Función asíncrona para ejecutar las funciones 'like' y 'retweet' en secuencia
const run = async () => {
    await like();
    await retweet(); 
}

// Llama a la función 'run' para iniciar el proceso
run();
