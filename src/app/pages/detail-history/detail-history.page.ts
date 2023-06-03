import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; 
import { ApiService } from 'src/app/api/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-detail-history',
  templateUrl: './detail-history.page.html',
  styleUrls: ['./detail-history.page.scss'],
})
export class DetailHistoryPage implements OnInit {

  token = localStorage.getItem('token') 
  headers  = new HttpHeaders({ 
    'Authorization': `${this.token}`
  });
  DataUser : any
  idpesanan : any

 constructor(private alertController: AlertController, private api : ApiService,private route: ActivatedRoute, private router:Router) {}

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
  isButtonDisabled: boolean = true;
  cek:any

  order(id : any){
    this.yakin()
    this.idpesanan = id
  }
  update(){
    this.api.selesai(this.cek,this.headers).subscribe( (res:any) =>{ 
      this.router.navigateByUrl('history')
    });
  }
  ngOnInit(){
    this.route.params.subscribe(params => { 
      const data = params['data']; 
      const cek = params['status']; 
      if (cek === 'perjalanan') {
        this.isButtonDisabled = false
      }else{
        this.isButtonDisabled = true
  
      }
      this.cek = data
      console.log(data) 
      console.log(cek) 
 
      this.api.getdetailhistory(data,this.headers).subscribe( (res:any) =>{ 
        this.DataUser = res['data']; 
        console.log('Data User ===>'+JSON.stringify( res['data']) ); 
      });
      
    });

    

  }

}
