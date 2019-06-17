/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as AllAnimals} from './all-animals'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
export {default as CartItem} from './cart-item'
export {default as Checkout} from './checkout'
export {default as Navbar} from './navbar'
export {default as OrderHistory} from './order-history'
export {default as SingleAnimal} from './single-animal'
export {default as ThankYou} from './thank-you'
export {default as UserHome} from './user-home'
