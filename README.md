# BotDiscord: Reproducción de Música y Frases Precargadas

Este proyecto es un bot de Discord diseñado para reproducir música y emitir frases precargadas en canales de voz. Ideal para animar tu servidor de Discord y proporcionar entretenimiento interactivo a los miembros.

## Características

- Reproducción de música directamente desde YouTube.
- Emisión de frases precargadas con un comando simple.
- Comandos de control de reproducción como `play`, `skip`, y `stop`.

## Instalación

Para instalar y ejecutar este bot, sigue los siguientes pasos:

1. Clona el repositorio a tu máquina local o descarga los archivos.
2. Abre una terminal y navega hasta la carpeta del proyecto.
3. Ejecuta `npm install` para instalar todas las dependencias necesarias.

```bash
git clone https://tu-repositorio-aqui.git
cd botDiscord
npm install
```

# .env
DISCORD_TOKEN=tu-token-de-bot-aquí  
```bash https://discord.com/developers/applications ```
## Para iniciar
node index.js


# Despliegue del Bot de Discord en EC2 con PM2

## Manteniendo tu Bot de Discord en Línea

Para que tu bot de Discord se mantenga en funcionamiento continuo en una instancia de EC2, puedes utilizar PM2, un gestor de procesos para aplicaciones Node.js que asegura que tu aplicación se mantenga viva y se reinicie automáticamente después de fallos o reinicios.

### Instalación

1. **Instalar PM2 Globalmente**:
   ```sh
   npm install pm2 -g
2. **cd /ruta/a/tu/bot**
3. **pm2 start index.js**
4. **pm2 startup**


