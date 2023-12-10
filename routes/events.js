/*
event Rout
 /api/events

*/

const {Router} =require('express')

const {check} =require('express-validator')

const { isDate } = require('../helpers/isDate')

const {validarCampos }= require('../middlewares/validar-campos')

console.log(validarCampos)
const {validarJWT } = require('../middlewares/validar-jwt')

const {getEventos,crearEvento,actulizarEvento,eleminarEvento} = require('../controllers/events')

const router=Router()


//todas tienes que pasar por la validacion del JWT

router.use(validarJWT)


// Todas tienes que passa por la validacion del JWT
 
//Obtener eventos

router.get(
  '/', 

  getEventos)

//Crear un nuevo Evento


router.post(
  '/',
  [
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','fecha de inicio es obligatorio').custom(isDate),
    check('end','fecha de inicio es obligatorio').custom(isDate)
    ,validarCampos
  ],
  crearEvento)
 
//Actualizar Evento
router.put('/:id' ,actulizarEvento)


//Actualizar Evento
router.delete('/:id',eleminarEvento)

module.exports=router