import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from '../../../admin/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') { // Verificar si estamos en el cliente
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      const tempEmail = sessionStorage.getItem('tempEmail');

      if (token) {
        this.router.navigate(['/admin']);
      }

      if (rememberedEmail) {
        // Si el correo está en localStorage, lo establecemos y marcamos "Remember me"
        this.loginForm.get('mail')?.setValue(rememberedEmail);
        this.loginForm.get('rememberMe')?.setValue(true);
      } else if (tempEmail) {
        // Si hay un correo temporal en sessionStorage, lo establecemos
        this.loginForm.get('mail')?.setValue(tempEmail);
      }

      // Observamos los cambios en el campo "mail" para almacenarlo temporalmente
      this.loginForm.get('mail')?.valueChanges.subscribe(value => {
        sessionStorage.setItem('tempEmail', value || '');
      });
    }
  }

  funIngresar() {
    if (this.loginForm.valid) {
      const { mail, password, rememberMe } = this.loginForm.value;

      // Omite la verificación real y acepta cualquier correo y contraseña
      const dummyToken = 'dummy-token'; // Token ficticio para simular autenticación

      // Guardar el token en localStorage o sessionStorage según el caso
      if (rememberMe) {
        localStorage.setItem('token', dummyToken);
        localStorage.setItem('rememberedEmail', mail || '');
      } else {
        sessionStorage.setItem('token', dummyToken);
        localStorage.removeItem('rememberedEmail');
      }

      // Limpiar el correo temporal
      sessionStorage.removeItem('tempEmail');

      // Mostrar mensaje de éxito y redirigir
      this.messageService.add({
        severity: 'success',
        summary: 'Login exitoso',
        detail: 'Has iniciado sesión correctamente'
      });
      this.router.navigate(['/admin']);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario inválido',
        detail: 'Por favor, complete todos los campos'
      });
    }
  }
}

