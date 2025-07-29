# SweetMeSoft JS

Una librería JavaScript/TypeScript completa que proporciona utilidades y componentes para el desarrollo web moderno, incluyendo funcionalidades AJAX, gráficos, mapas, tablas y herramientas de interfaz de usuario.

## 📋 Descripción

SweetMeSoft JS es una librería que simplifica el desarrollo web proporcionando una colección de herramientas y componentes reutilizables. Está construida en TypeScript y diseñada para trabajar con jQuery y otras librerías populares como Bootstrap, Chart.js, Google Maps y SweetAlert2.

## 🚀 Instalación

### NPM
```bash
npm install sweetmesoft-js
```

### Desde el repositorio
```bash
git clone https://github.com/SweetMeSoft/sweetmesoft-js.git
cd sweetmesoft-js
npm install
```

## 📁 Estructura de Archivos

### `Ajax.ts`
Contiene funciones para realizar peticiones HTTP de manera simplificada:
- **`getOptions()`**: Puebla elementos select/dropdown con opciones obtenidas desde una URL
- **`get()`**: Realiza peticiones GET con manejo automático de errores y loading
- **`post()`**: Realiza peticiones POST con configuración automática de headers
- **`downloadFile()`**: Descarga archivos desde el servidor

### `Charts.ts`
Proporciona funcionalidades para generar gráficos usando Chart.js:
- **`generateChart()`**: Crea gráficos dinámicos con datos obtenidos desde APIs
- Soporte para gráficos diarios y mensuales
- Configuración automática de datasets y labels

### `Classes.ts`
Define todas las interfaces y tipos TypeScript utilizados en la librería:
- **`OptionsSelect`**: Configuración para elementos select
- **`OptionsCropper`**: Configuración para recorte de imágenes
- **`OptionsModal`**: Configuración para modales
- **`OptionsTable`**: Configuración para tablas DataTables
- **`OptionsChart`**: Configuración para gráficos
- **`OptionsMap`**: Configuración para mapas de Google
- **`OptionsRequest`**: Configuración para peticiones AJAX

### `Common.ts`
Contiene constantes y variables globales utilizadas en toda la librería:
- Arrays de meses abreviados y días
- Variables de control de estado

### `JQueryAddOns.ts`
Extiende jQuery con métodos adicionales:
- **`disable()`/`enable()`**: Habilita/deshabilita elementos
- **`check()`/`uncheck()`**: Marca/desmarca checkboxes
- **`initializeSelect()`**: Inicializa Bootstrap Select
- **`toBlob()`**: Convierte imágenes a Blob
- **`isNullOrEmpty()`**: Extensión para String que verifica si está vacío

### `Maps.ts`
Integración con Google Maps API:
- **`generateMap()`**: Crea mapas interactivos con marcadores
- Soporte para geolocalización
- Autocompletado de direcciones
- Mapas en modales o contenedores específicos
- Manejo de múltiples marcadores

### `Tools.ts`
Utilidades generales para el desarrollo:
- **`on()`/`off()`**: Control de overlays de carga
- **`capitalizeFirstLetter()`**: Capitaliza la primera letra de un string
- **`getFormatedDate()`**: Formatea fechas con patrones personalizados
- **`isValidDate()`**: Valida si un objeto es una fecha válida
- **`getUrlParameter()`**: Obtiene parámetros de la URL
- **`generateCropper()`**: Crea un recortador de imágenes con Cropper.js

## 🛠️ Tecnologías Utilizadas

- **TypeScript**: Lenguaje principal de desarrollo
- **jQuery**: Manipulación del DOM y AJAX
- **Bootstrap**: Framework CSS y componentes UI
- **Bootstrap Select**: Componente de select mejorado
- **Chart.js**: Librería para gráficos
- **Google Maps API**: Integración de mapas
- **SweetAlert2**: Modales y alertas elegantes
- **Cropper.js**: Recorte de imágenes
- **DataTables**: Tablas interactivas

## 📖 Uso Básico

### Peticiones AJAX
```typescript
// GET request
SweetMeSoft.get({
    url: '/api/data',
    successCallback: (data) => {
        console.log('Datos recibidos:', data);
    }
});

// Poblar un select
SweetMeSoft.getOptions({
    url: '/api/options',
    dropDowns: [$('#mySelect')],
    text: 'name',
    internal: 'id'
});
```

### Gráficos
```typescript
SweetMeSoft.generateChart({
    chart: $('#myChart'),
    url: '/api/chart-data',
    interval: 'monthly'
});
```

### Mapas
```typescript
SweetMeSoft.generateMap({
    edtLatitude: $('#latitude'),
    edtLongitude: $('#longitude'),
    showCurrentLocation: true,
    modal: true
});
```

### Extensiones jQuery
```typescript
// Inicializar un select
$('#mySelect').initializeSelect();

// Verificar si un string está vacío
if (myString.isNullOrEmpty()) {
    console.log('String está vacío');
}
```

## 🔧 Configuración

La librería utiliza TypeScript con la siguiente configuración:
- Target: ES2019
- Module: ES6
- Declaraciones incluidas
- Compilación automática habilitada

## 📦 Despliegue

### Desarrollo Local
1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Compila TypeScript: `tsc`
4. Los archivos compilados estarán en la carpeta `src/`

### Publicación en NPM
El paquete está disponible en NPM como `sweetmesoft-js` y se actualiza regularmente.

### Integración en Proyectos
```html
<!-- Incluir las dependencias -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Incluir SweetMeSoft JS -->
<script src="node_modules/sweetmesoft-js/src/Ajax.js"></script>
<script src="node_modules/sweetmesoft-js/src/Charts.js"></script>
<script src="node_modules/sweetmesoft-js/src/Maps.js"></script>
<script src="node_modules/sweetmesoft-js/src/Tools.js"></script>
<script src="node_modules/sweetmesoft-js/src/JQueryAddOns.js"></script>
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Erick Velasco** - [erickvelasco11@gmail.com](mailto:erickvelasco11@gmail.com)

## 🔗 Enlaces

- [Repositorio en GitHub](https://github.com/SweetMeSoft/sweetmesoft-js)
- [Paquete en NPM](https://www.npmjs.com/package/sweetmesoft-js)
- [Reportar Issues](https://github.com/SweetMeSoft/sweetmesoft-js/issues)

---

*Desarrollado con ❤️ por SweetMeSoft*