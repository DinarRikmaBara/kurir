import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(  private http : HttpClient) { }
  login(form : any) : Observable<any>{ 
    return this.http.post('https://bayurestapi.shop/api/login',form,); 
  }

  rKurir(form : any) : Observable<any>{ 
    return this.http.post('https://bayurestapi.shop/api/kurir',form); 
  }
  // ambil(toko : any,nama: any ,headers:any){ 
  //   return this.http.put('https://bayurestapi.shop/api/kurir/ambil/'+ toko+'/'+ nama,{},{headers : headers}); 
  // }

  getpesanan(headers : any){
    return this.http.get('https://bayurestapi.shop/api/kurir/pesanan',{headers : headers})
  }
  history(email : any,headers : any){
    return this.http.get('https://bayurestapi.shop/api/kurir/pesanan/'+ email,{headers : headers})
  }
  
  getakunkurir(email:any,headers:any){
    return this.http.get('https://bayurestapi.shop/api/kurir/profil/'+email,{headers:headers})
  }
  getdetailpesanan(data:any, data1 : any, headers:any){
    return this.http.get('https://bayurestapi.shop/api/kurir/detailPesanan/'+data1+'/'+data,{headers:headers})
  }
  getdetailhistory(data:any, headers:any){
    return this.http.get('https://bayurestapi.shop/api/kurir/detailhostory/'+data,{headers:headers})
  }
  selesai(id:any,headers:any){
    return this.http.post('https://bayurestapi.shop/api/kurir/selesai/'+id,{},{headers:headers})
  }
  feedback(form:any,headers:any){
    return this.http.post('https://bayurestapi.shop/api/kurir/feedback',{
      'kritik':form
    },{headers : headers})
  }
}
