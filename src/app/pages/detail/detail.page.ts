import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { ApiService } from 'src/app/api/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(private router : Router,private alertController: AlertController, private api : ApiService,private route: ActivatedRoute,private http : HttpClient) {}
  token = localStorage.getItem('token') 
  headers  = new HttpHeaders({ 
    'Authorization': `${this.token}`
  });
  DataProduk : any
  DataToko : any
  DataUSer : any
  DataTambahan:any
  idpesanan : any


  async yakin() { 
    const alert = await this.alertController.create({ 
      header: 'Konfirmasi', 
      message: 'Apakah anda yakin ingin mengantar pesanan ini?', 
      buttons: [ 
        { 
          text: 'Batal', 
          role: 'cancel', 
          cssClass: 'secondary', 
          handler: () => { 
            console.log('Dibatalkan'); 
          }, 
        }, 
        { 
          text: 'Ya', 
          handler: () => { 
            console.log('Diterima');
            this.update()
            
          }, 
        }, 
      ], 
    }); 
 
    await alert.present(); 
  } 
  toko: any
  costumer :any

  order(){
    this.yakin()

  }
  update(){
    return this.http.put('https://bayurestapi.shop/api/kurir/ambil/'+ this.toko+'/'+ this.costumer,{},{headers : this.headers}).subscribe( (res:any) =>{ 
      this.router.navigateByUrl('history')
    });
  }
  ngOnInit(){
    this.route.params.subscribe(params => { 
      const data = params['data']; 
      const data1 = params['data1'];
      this.toko = data 
      this.costumer = data1
      console.log(data) 
      console.log(data1) 
 
      this.api.getdetailpesanan(data, data1, this.headers).subscribe( (res:any) =>{ 
        this.DataProduk = res['pesanan']; 
        this.DataToko = res['toko']; 
        this.DataUSer = res['user']; 
        this.DataTambahan = res['tambahan'];
        console.log('DataProduk'+JSON.stringify( res['pesanan']) ); 
        console.log('DataToko'+JSON.stringify( res['toko']) ); 
        console.log('DataUser'+JSON.stringify( res['user']) ); 
        console.log('tambahan'+JSON.stringify( res['tambahan']) ); 
      });

    });
  }

}
