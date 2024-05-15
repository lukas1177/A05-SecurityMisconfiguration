import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {DataService} from "../data.service";
import {ResponseData} from "../response-data-interface";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatError,
    NgIf,
    MatButton,
    MatInput,
    MatFormField,
    MatLabel,
    MatCardTitle
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginInvalid: boolean = false;
  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {}

  async login() {
    const username = this.username;
    const password = this.password;
    const requestBody = { username, password };

    try {
      const response = await this.http.post('http://localhost:3000/auth/login', requestBody).toPromise();
      const responseBody = response as ResponseData;
      this.dataService.setResponseData(responseBody);

      if (responseBody.success) {
        await this.router.navigate(['game']);
      }
      else {
        this.loginInvalid = true;
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  }
}
