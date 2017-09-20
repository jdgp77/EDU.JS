Framework para crear juegos educativos faciles y rapidos.

```js
// Crearlo es muy facil:
var miTablero = EduInt.createBoard({
  object: '#id_del_elemento',
  name: 'Nombre de mi hermoso tablero',
  width: 300,
  height: 300
});

//  Lugar donde crearemos nuestros objetos iniciales
miTablero.start(function(){
  // Todos los metodos(variables) que necesites colocalas con un this. antes
  this.posEnXDeLulu = 0;
  //  Puedes colocar todos los objetos que quieras, solo mira que tenga un nombre unico
  this.t('Lulu el Objeto');
});

//  Lo que esta aca dentro lo ejecuta 25 veces cada segundo
miTablero.createAnimation(function(){
  //  Entre las propiedades que tienen los objetos esta su posicion en X
  this.t('Lulu el Objeto').setPosInX(this.posEnXDeLulu);
  //  Le aumentamos uno a la variable(las 25 veces cada segundo)
  this.posEnXDeLulu = this.posEnXDeLulu + 1;
  //  Iniciamos la animación(jeje las 25 veces cada segundo)
}).startAnimation();
```
