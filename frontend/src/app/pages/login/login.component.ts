import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: Login;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  onLogin() {
    console.log('Datos de login enviados:', this.loginObj);
    this.http.post('http://localhost:4000/api/usuarios/login', this.loginObj).subscribe((res: any) => {
      console.log('Respuesta del servidor:', res);
      if (res.token) {
        alert("Login Success");
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('dashboard');
      } else {
        alert(res.message);
      }
    }, (error) => {
    
      alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
    });
  }
}

export class Login {
  correo: string;
  contrasena: string;
  constructor(){
    this.correo = '';
    this.contrasena = ''; 
  }
}
