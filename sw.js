self.addEventListener('push', e => {
    
    const { title = '', options = {} } = e.data.json();
    e.waitUntil( self.registration.showNotification( title, options ))

})
  
self.addEventListener('notificationclick', e => {
 
    const url = e.notification.data.url;

    const respuesta = clients.matchAll().then( clientes => {

        const cliente = clientes.find( c => {
            return c.visibilityState === 'visible'
        })

        if( cliente !== undefined ){
            cliente.navigate( url )
            cliente.focus();
        } else {
            clients.openWindow(url)
        }

        return e.notification.close()
    })

    e.waitUntil( respuesta )
});