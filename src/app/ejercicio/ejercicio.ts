import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejercicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ejercicio.html',
  styleUrls: ['./ejercicio.css']
})
export class Ejercicio {
  textoOriginal: string = '';
  resultado: string = '';
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  desplazamiento: number = 3;
  metodo: string = 'cesar';

  procesar(accion: 'cifrar' | 'descifrar') {
    // texto vacio
    if (!this.textoOriginal.trim()) {
      Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'Por favor, escribe un mensaje primero.',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    // tipo de cifrado
    if (this.metodo === 'cesar') {
      this.resultado = this.cifradoCesar(this.textoOriginal, accion);
    } else {
      this.resultado = this.cifradoAtbash(this.textoOriginal);
    }

   
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });

    Toast.fire({
      icon: 'success',
      title: `Mensaje ${accion === 'cifrar' ? 'cifrado' : 'descifrado'} correctamente`
    });
  }

  cifradoCesar(texto: string, accion: 'cifrar' | 'descifrar'): string {
    const n = this.alfabeto.length;
    // desplazamiento inverso
    const shift = accion === 'cifrar' ? 
                  this.desplazamiento : 
                  (n - (this.desplazamiento % n)) % n;
    
    return texto.split('').map(char => {
      const index = this.alfabeto.indexOf(char);
      // si el caracter no existe, se deja igual
      if (index === -1) return char; 
      return this.alfabeto[(index + shift) % n];
    }).join('');
  }

  cifradoAtbash(texto: string): string {
    const n = this.alfabeto.length;
    return texto.split('').map(char => {
      const index = this.alfabeto.indexOf(char);
      if (index === -1) return char;
      // espejo:total - 1 - posicion actual
      return this.alfabeto[(n - 1) - index];
    }).join('');
  }

  copiarAlPortapapeles() {
    if (this.resultado) {
      navigator.clipboard.writeText(this.resultado);
      
      Swal.fire({
        title: '¡Copiado!',
        text: 'El resultado está en tu portapapeles',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 1500,
        showConfirmButton: false
      });
    }
  }
}