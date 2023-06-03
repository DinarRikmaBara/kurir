import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';
@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage  {
  submitted = false;
  supportMessage!: string;

  constructor( public alertCtrl: AlertController,  public toastCtrl: ToastController,private api:ApiService ,private router:Router) { }
  email = localStorage.getItem('email')
  token = localStorage.getItem('token')

  headers  = new HttpHeaders({
    'Authorization': `${this.token}`
  });

  form : any

  feedback(){
    this.api.feedback(this.form,this.headers).subscribe( (res:any) =>{
      this.router.navigateByUrl('profile')
    });
  }

}
