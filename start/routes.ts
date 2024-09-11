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
import { middleware } from './kernel.js';
import ImagesController from '#controllers/images_controller';
router.on('/').renderInertia('home').use(middleware.auth());
router.get('/login', [AuthController, 'login'])
router.get('/register', [AuthController, 'register'])
router.post('/register', [AuthController, 'create'])
router.post('/login', [AuthController, 'verify'])
router.post('/images/upload', [ImagesController, 'upload'])





// Mounting the IPX server on images route
router.get('/images/*', async ({ request, response }) => {
    const fullPath = request.param('*').join('/')
    console.log(fullPath)
    request.request.url = `/${fullPath}`;
    return ipxServer(request.request, response.response)
})


