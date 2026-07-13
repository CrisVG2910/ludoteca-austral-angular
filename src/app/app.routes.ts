import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { Catalogo } from './pages/catalogo/catalogo';
import { DetalleJuego } from './pages/detalle-juego/detalle-juego';
import { Registro } from './pages/registro/registro';
import { Login } from './pages/login/login';
import { Contacto } from './pages/contacto/contacto';
import { Recuperar } from './pages/recuperar/recuperar';
import { Perfil } from './pages/perfil/perfil';
import { Carrito } from './pages/carrito/carrito';
import { Admin } from './pages/admin/admin';

import { Preventas } from './pages/preventas/preventas';
import { PreventasJsonServer } from './pages/preventas-json-server/preventas-json-server';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'catalogo', component: Catalogo },
  { path: 'juego/:id', component: DetalleJuego },
  { path: 'registro', component: Registro },
  { path: 'login', component: Login },
  { path: 'recuperar', component: Recuperar },
  { path: 'perfil', component: Perfil },
  { path: 'carrito', component: Carrito },
  { path: 'admin', component: Admin },
  { path: 'contacto', component: Contacto },

  { path: 'preventas', component: Preventas },
  { path: 'preventas-json-server', component: PreventasJsonServer },

  { path: '**', redirectTo: '' }
];
