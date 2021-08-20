import { leerMessages } from "./app";

/**
 * DATOS A MANIPULAR
 */

/* Definiendo mis Array */
const productos = []; 
const dbIDs = []; 
const lastID = { lastID: 0 }; 
const msn = []; 

/* Validar si existen mensajes guardados */
function checkMessagesOld() {

    let messageOld = JSON.parse(leerMessages());
    if (messageOld !== -1) {
      msn.push.apply(msn, messageOld);
    }
}

/* Inicializamos los mensajes */
checkMessagesOld();
export { productos, dbIDs, lastID, msn };
