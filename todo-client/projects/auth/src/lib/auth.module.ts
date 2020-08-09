import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  exports: [LoginComponent]
})
export class AuthModule { }
