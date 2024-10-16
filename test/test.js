var unalib = require('../unalib/index');
 var assert = require('assert');
  //Pruebas
 
 
  describe('unalib', function() {

    // Prueba para la validación de URLs de imágenes
    describe('Validación de URLs de Imágenes', function() {
      it('debería aceptar una URL de imagen válida y mostrarla correctamente', function() {
        const mensajeImagen = JSON.stringify({ mensaje: 'https://example.com/image.jpg' });
        const resultado = unalib.validarMensaje(mensajeImagen);
        const objResultado = JSON.parse(resultado);
        assert.ok(objResultado.mensaje.includes('<img'), 'La URL de la imagen debería ser mostrada como una etiqueta <img>');
      });
  
      it('debería rechazar una URL no válida como imagen', function() {
        const mensajeInvalido = JSON.stringify({ mensaje: 'https://example.com/image.txt' });
        const resultado = unalib.validarMensaje(mensajeInvalido);
        const objResultado = JSON.parse(resultado);
        assert.strictEqual(objResultado.mensaje, 'URL no válida.', 'Debería rechazar URLs no válidas.');
      });
    });
  
    // Prueba para la validación de URLs de videos
    describe('Validación de URLs de Videos', function() {
      it('debería aceptar una URL de video válida y mostrar un reproductor de video', function() {
        const mensajeVideo = JSON.stringify({ mensaje: 'https://example.com/video.mp4' });
        const resultado = unalib.validarMensaje(mensajeVideo);
        const objResultado = JSON.parse(resultado);
        assert.ok(objResultado.mensaje.includes('<video'), 'La URL de video debería ser mostrada como un reproductor <video>');
      });
  
      it('debería rechazar una URL no válida como video', function() {
        const mensajeInvalido = JSON.stringify({ mensaje: 'https://example.com/video.txt' });
        const resultado = unalib.validarMensaje(mensajeInvalido);
        const objResultado = JSON.parse(resultado);
        assert.strictEqual(objResultado.mensaje, 'URL no válida.', 'Debería rechazar URLs no válidas.');
      });
    });
  
    // Prueba para la prevención de inyección de scripts
    describe('Prevención de Inyección de Scripts', function() {
      it('debería bloquear un intento de inyección de script', function() {
        const mensajeMalicioso = JSON.stringify({ mensaje: '<script>alert("Hacked!");</script>' });
        const resultado = unalib.validarMensaje(mensajeMalicioso);
        const objResultado = JSON.parse(resultado);
        assert.strictEqual(objResultado.mensaje, '', 'El mensaje debería ser limpiado y no debería contener el script.');
      });
  
      it('debería aceptar texto seguro sin etiquetas maliciosas', function() {
        const mensajeSeguro = JSON.stringify({ mensaje: 'Este es un mensaje seguro.' });
        const resultado = unalib.validarMensaje(mensajeSeguro);
        const objResultado = JSON.parse(resultado);
        assert.strictEqual(objResultado.mensaje, 'Este es un mensaje seguro.', 'Debería aceptar y no alterar mensajes de texto seguros.');
      });
    });
  });