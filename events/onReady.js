module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
      console.log(`¡El bot está en línea! Logueado como ${client.user.tag}`);
    },
  };
  