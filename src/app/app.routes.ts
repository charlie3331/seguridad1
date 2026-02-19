import { Routes } from '@angular/router';
import { Ejercicio } from './ejercicio/ejercicio';
import { Link } from './link/link';

export const routes: Routes = [
  { path: '', component: Ejercicio }, 
  { path: 'link', component: Link },    
  { path: '**', redirectTo: '' }
];