/*
    Diego Cajal - Personal de Teco
    decajalperez@teco.com.ar
    Desafío clase 12 - nodeJS: webSockets

    * Consigna 1:
        +   Modificar el último entregable para que disponga de un canal de webSocket que permita representar,
            por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real.
            -   Puede haber varios clientes conectados simultáneamente y en cada uno de ello se reflejarán
                los cambios que se realicen en los productos sin necesdidad de recargar ls vista.
            -   Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.
    * Aspectos a incluir en el entregable:
        Para construir la tabla dinámica con los datos recibidos por webSocket utilizar handlebars en el frontend.
        Considerar usar archivos públicos para alojar la plantilla vacía y obtenerla usando la función fetch.
        ! Recordar que fetch devuelve una promesa.
    * Consigna 2:
        +   Añadiremos al proyecto un canal de chat entre los clientes y el servidor.
    *  Aspectos a incluir en el entregable:
        +   En la parte inferior del formulario de ingreso se presentará el centro de mensajes almacenados en el servidor,
            donde figuren todos los mensajes de todos lo usuarios identificados por su e-mail.
        +   El formato a representar será:
            ! email (texto negrita en azul) [fecha y hora (DD/MM/YYYY HH:MM:SS)] (texto normal en marrón): mensaje (texto italic en verde)
        +   Además incorporar dos elementos de entrada: uno para que el usuario ingresu su e-mail (obligatorio para poder utilizar el chat)
            y otro para ingresar mensajes y enviarlos mediante un botón.
        +   Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable)
*/
const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
