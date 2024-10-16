import sanitizeHtml from 'sanitize-html';

export const unalib = {
  // Lógica que valida si un teléfono está correcto...
  isValidPhone(phone) {
    let isValid = false;
    const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;

    try {
      isValid = re.test(phone);
    } catch (e) {
      console.error(e);
    } finally {
      return isValid;
    }
  },

  // Valida si el mensaje contiene una URL segura
  isValidUrl(message) {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return urlPattern.test(message);
  },

  // Detecta si la URL es una imagen válida
  isImageUrl(url) {
    return /\.(jpeg|jpg|gif|png)$/i.test(url);
  },

  // Detecta si la URL es un video válido
  isVideoUrl(url) {
    return /\.(mp4|webm|avi)$/i.test(url);
  },

  // Función para limpiar el mensaje y prevenir inyecciones de código
  sanitizeMessage(message) {
    // Elimina scripts y etiquetas peligrosas, permitiendo solo etiquetas seguras
    return sanitizeHtml(message, {
      allowedTags: [],
      allowedAttributes: {},
    });
  },

  // Valida el mensaje y asegura la integridad de los datos
  validarMensaje(msg) {
    const obj = JSON.parse(msg);

    // Limpia el mensaje para eliminar cualquier código malicioso
    obj.mensaje = this.sanitizeMessage(obj.mensaje);

    // Si el mensaje es una URL válida
    if (this.isValidUrl(obj.mensaje)) {
      if (this.isImageUrl(obj.mensaje)) {
        console.log('Es una imagen válida!');
        // Renderiza la imagen en el chat
        obj.mensaje = `<img src="${obj.mensaje}" alt="imagen" style="max-width: 300px;">`;
      } else if (this.isVideoUrl(obj.mensaje)) {
        console.log('Es un video válido!');
        // Inserta un reproductor de video en el chat
        obj.mensaje = `
          <video width="320" height="240" controls>
            <source src="${obj.mensaje}" type="video/mp4">
            Tu navegador no soporta la etiqueta de video.
          </video>`;
      } else {
        console.log('Es una URL, pero no es una imagen ni un video válido!');
        // Rechaza URLs no seguras que no sean imágenes o videos
        obj.mensaje = 'URL no válida.';
      }
    } else {
      console.log('Es texto o no es una URL válida.');
    }

    return JSON.stringify(obj);
  }
};
