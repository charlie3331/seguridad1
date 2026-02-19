import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './link.html',
  styleUrls: ['./link.css']
})
export class Link {
  llave: string = '';
  autorizado: boolean = false;

  validar() {
    // Validación de la llave (ZFF es el resultado de UAA con desplazamiento 5)
    if (this.llave.toUpperCase() === 'ZFF' || this.llave === 'Pvv') {
      this.autorizado = true;
      
      Swal.fire({
        title: '¡Identidad Confirmada!',
        text: 'El Pequeño César ha llegado a casa. Al cerrar esta ventana se abrirá el repositorio.',
        icon: 'success',
        confirmButtonColor: '#facc15',
        color: '#ffffff',
        background: '#121212'
      }).then((result) => {
        // Esto se ejecuta solo cuando el usuario cierra el SweetAlert
        if (result.isConfirmed || result.isDismissed) {
          this.abrirGithub();
        }
      });
      
    } else {
      Swal.fire({
        title: 'Acceso Denegado',
        text: 'César sigue perdido. Revisa el desplazamiento y la palabra clave.',
        icon: 'error',
        confirmButtonColor: '#facc15'
      });
    }
  }

  abrirGithub() {
    window.open('https://github.com/charlie3331/seguridad1', '_blank');
  }
}