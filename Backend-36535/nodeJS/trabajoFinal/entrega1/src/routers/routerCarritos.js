import { Router } from 'express';
import { delCart, delProd, getProd, postCart, postProd} from '../controllers/controllerCarritos.js';
const router = Router();

// Carritos
router.post('/', postCart);
router.delete('/:id', delCart); // pendiente por ahora
// Productos
router.get('/:id/productos', getProd); // lista los productos del carrito con el id que se envía
router.post('/:id/productos', postProd); // envía un producto al carrito, lo agrega a la lista de prouctos dentro del carrito, como nos envía el id del producto
router.delete('/:id/productos/:id_prod', delProd);

export default router ;