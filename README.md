# Carpintería Martín — Tienda virtual

## Estructura
```
carpinteria-martin/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── img/   (vacía, para tus fotos reales)
```

## Antes de publicar, revisá esto:

1. **Número de WhatsApp**: en `js/script.js`, línea con `NUMERO_WHATSAPP`,
   reemplazá `"5491100000000"` por el número real del taller
   (código de país + número, sin espacios ni el "+").

2. **Fotos de productos**: ahora mismo cada producto usa una imagen de
   relleno (picsum.photos). Subí tus fotos reales a la carpeta `img/`
   y cambiá el campo `img:` de cada producto en `js/script.js`.

3. **Precios y medidas**: son de ejemplo, ajustalos en el mismo archivo
   (array `productos` al inicio de `js/script.js`). Asumí precios en
   pesos por el formato del alias — avisame si en realidad son en
   pesos colombianos y te lo dejo con el formato correcto.

4. **Alias de transferencia**: ya está cargado (`jonathan.antivero.1`)
   y aparece en el panel del carrito con botón de copiar.

## Cómo funciona
- El botón "Agregar al carrito" guarda los productos en el navegador
  (localStorage), así que el carrito no se pierde si la persona
  recarga la página.
- Al completar el formulario de contacto, se arma un mensaje con el
  detalle del pedido, el total y el alias de transferencia, y se abre
  WhatsApp automáticamente para enviarlo.
- No hay backend ni base de datos: todo el "pago" se coordina por
  WhatsApp/transferencia manual, como en tus proyectos anteriores.

## Deploy
Igual que siempre: subís esta carpeta a un repo de GitHub y la
conectás a Vercel (o la subís directo a Vercel). No hace falta build,
son archivos estáticos.
