/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { createIPX, createIPXNodeServer, ipxFSStorage, ipxHttpStorage } from 'ipx';

// Initialize IPX
const ipx = createIPX({
    storage: ipxFSStorage({ dir: './storage/uploads' }), // Local file system storage
    httpStorage: ipxHttpStorage({ domains: ['picsum.photos'] }), // External domains
});
const ipxServer = createIPXNodeServer(ipx);

import router from '@adonisjs/core/services/router';
import AuthController from '#controllers/auth_controller';
router.on('/').renderInertia('home', { version: 6 })
router.get('/login', [AuthController, 'login'])
router.get('/register', [AuthController, 'register'])
router.get('/images/*', async ({ request, response }) => {
    const fullPath = request.param('*').join('/')
    console.log(fullPath)
    request.request.url = `/${fullPath}`;
    return ipxServer(request.request, response.response)
})


