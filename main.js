import './sass/main.scss';
import Handlebars from 'handlebars';
const start = async () => {
//   console.log('DOM asds');

  try {
    const respuesta = await fetch('templates/card.hbs');

    if (!respuesta.ok) {
      throw new Error('no se pudo obtener la plantilla');
    }
    const plantilla = await respuesta.text();
    
    // compilo plantilla con hb
    const template = Handlebars.compile(plantilla);

    const respuestaBack = await fetch('http://localhost:8080/productos')

    if ( !respuestaBack.ok ) {
        throw new Error('Algo paso con los productos', respuestaBack.status)
    }
    const dataProductos = await respuestaBack.json();
    
    const data = {productos: dataProductos}
    // console.log(data);
    // console.log(dataProductos);
    const html = template(data);
    // console.log(html);


    const contenedorCards = document.querySelector('#container-cards');
    contenedorCards.innerHTML = html;
} catch (error) {
     
  }
};

window.addEventListener('DOMContentLoaded', start);
