import { Component, OnInit } from '@angular/core';
declare var google:any;
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/customer.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
constructor(private router:Router,private customerservice:CustomerService){}
isloggedIn:boolean=false
ngOnInit(): void {
  if(sessionStorage.getItem("Loggedinuser")){
    this.isloggedIn=true
  }else{
    this.isloggedIn=false
  }


  google.accounts.id.initialize({
    client_id:"401568573575-d4rh28vunkusl1sh94se2pv7eivv8bac.apps.googleusercontent.com",
    callback:(response:any)=>{this.handlelogin(response);

    }
  })
}
ngAfterViewInit():void{
  this.rendergooglebutton();
}
private rendergooglebutton():void{
  const googlebtn=document.getElementById('google-btn');
  if(googlebtn){
    google.accounts.id.renderButton(googlebtn,{
      theme:'outline',
      size:'medium',
      shape:'pill',
      width:150,
    })
  }
}

private decodetoken(token:String){
  return JSON.parse(atob(token.split(".")[1]))
}
handlelogin(response:any){
  const payload=this.decodetoken(response.credential)
  this.customerservice.addcustomermongo(payload).subscribe({
    next:(response)=>{
      console.log('POST success',response);
      sessionStorage.setItem("Loggedinuser",JSON.stringify(response))
    },
    error:(error)=>{
      console.error('Post request failed',error)
    }
  })
}
handlelogout(){
  google.accounts.id.disableAutoSelect();
  sessionStorage.removeItem('Loggedinuser');
  window.location.reload()
}
navigate(route:string){
  this.router.navigate([route])
}
}
