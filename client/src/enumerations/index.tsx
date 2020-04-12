/*
 * ENUMERATIONS
 * Enums allow us to organize a collection of related values. Think of them as
 * a class for values, wherein the value can only be a string , or number.
 *
 */

export enum Routes {
  HOME = '/',
  CHECKOUT = '/checkout',
  PAGE_403 = '/403',
  PAGE_404 = '/404',
  PAGE_500 = '/500',
}

export enum LocalStorage {
  ACCESS_TOKEN = 'x-token',
}
