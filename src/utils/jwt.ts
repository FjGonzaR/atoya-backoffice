import jwt from  'jsonwebtoken';
import '../../config';
// Función encargada de realizar la validación del token y que es directamente consumida por server.js
export const checkToken = ( req, res, next ) => {
  
  // Extrae el token de la solicitud enviado a través de cualquiera de los dos headers especificados
  // Los headers son automáticamente convertidos a lowercase
  let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];

  // Si existe algún valor para el token, se analiza
  // de lo contrario, un mensaje de error es retornado
  if( token ) {
    // Si el token incluye el prefijo 'Bearer ', este debe ser removido.
    //Este prefijo hace parte del protocolo.
    if ( token.startsWith( 'Bearer ' ) ) {

        token = token.slice(7, token.length );
        // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
        jwt.verify( token, process.env.SECRET_KEY, ( err, decoded ) => {
      
        // Si no pasa la validación, un mensaje de error es retornado
        // de lo contrario, permite a la solicitud continuar
        if( err ) 
        {
          return res.status(401).json( {
            success: false,
            message: 'Token is not valid'
          } );
        } else 
        {
          req.decoded = decoded;
          res.locals.token =  token;

          //permite referenciar el siguiente atributo usado en el router.get del index.js
          next();
        }
      } );
    }
    else
    {
        jwt.verify( token, process.env.SECRET_KEY, ( err, decoded ) => {
      
            // Si no pasa la validación, un mensaje de error es retornado
            // de lo contrario, permite a la solicitud continuar
            if( err ) {
              return res.status(401).json( {
                success: false,
                message: 'Token is not valid'
              } );
            } else {
              req.decoded = decoded;
              res.locals.token =  token;
              //permite referenciar el siguiente atributo usado en el router.get del index.js
              next();
            }
          } );
    }
  } else 
  {
    return res.status(401).json( {
      success: false,
      message: 'Auth token is not supplied'
    } );

  }
};

export const generateToken = (email:string) => {
    try{
    return jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '3h'});
    }
    catch(error){
        throw error;
    }
}