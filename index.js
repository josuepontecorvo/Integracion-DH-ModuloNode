const autos = require('./autos');

const concesionaria = {
   autos: autos,
   buscarAuto : function (patente) {
       let auto = null;
       for (let i = 0; i < autos.length; i++) {
           if (autos[i].patente == patente) {
               auto = autos[i];
           }
       }
       return auto;
   },
   venderAuto : function (patente) {
       let auto = this.buscarAuto(patente);
       if (auto != null) {
           let indice = concesionaria.autos.indexOf(auto);
           autos[indice].vendido = true;
       }
   },
   autosParaLaVenta : function () {
       let autosParaLaVenta = this.autos.filter(function (auto) { return !auto.vendido});
       return autosParaLaVenta;
   },
   autosNuevos : function () {
       let autosParaLaVenta = this.autosParaLaVenta();
       let autosNuevos = autosParaLaVenta.filter(auto => auto.km < 100);
       return autosNuevos;
   },
   listaDeVentas: function () {
       lista = []; 
       this.autos.forEach(function(auto){
           if (auto.vendido == true) {
               lista.push(auto.precio);
           }
       }) 
       return lista;
   },
   totalDeVentas: function () {
       let listaVentas = this.listaDeVentas();
       let total = 0;
       if (listaVentas.length != 0) {
          total = listaVentas.reduce((acum, val) => acum + val);
       }
       return total;
   },
   puedeComprar: function (auto,persona){
       let autos = this.autosParaLaVenta();
       let indice = autos.indexOf(auto);
       if (indice != -1) { 
       let precio = autos[indice].precio;
       let cuotas = autos[indice].cuotas;
       return precio <= persona.capacidadDePagoTotal && (precio / cuotas) <= persona.capacidadDePagoEnCuotas;
       } else { return "El auto ya fue vendido"};
   },
   autosQuePuedeComprar: function (persona) {
       let autos = this.autosParaLaVenta();
       let array = autos.filter((auto) => this.puedeComprar(auto,persona));
       return array;
   }
};








