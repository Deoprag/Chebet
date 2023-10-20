import { Component } from '@angular/core';
import { AuthService } from '../service/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
  providers: [AuthService]
})
export class MainHeaderComponent {
  isUserLoggedIn = !this.authService.isTokenExpired();
  
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    window.addEventListener('resize', fixDisplay)
    if(this.isUserLoggedIn) {
      this.router.navigate(['/edit-user'])
    } else {
      this.router.navigate(['/main-content'])
    }
    showBar();
  }

  botao() {
    showBar();
  }
}

function fixDisplay() {
  const mainHeader = document.getElementById("main-header");
  const logo = document.getElementById("logo");
  const dropdown = document.getElementById("dropdown");
  
  if (mainHeader != undefined && logo != undefined && dropdown != undefined) {
    if (window.innerWidth >= 768) {
      mainHeader.style.display = "block";
      logo.style.display = "none"
      dropdown.style.height = "0";
    } else {
      mainHeader.style.display = "none";
      logo.style.display = "block"
    }
  }
  
}

function showBar() {
  const mainHeader = document.getElementById("main-header");
  const dropdown = document.getElementById("dropdown");
  const logo = document.getElementById("logo");

  if (mainHeader != undefined && dropdown != undefined && logo != undefined) {

    if (mainHeader.style.display == "none") {
      
      mainHeader.style.display = "block";
      dropdown.style.height = "450px";
      dropdown.style.flexDirection = "column";
      logo.style.display = "none";
      
    } else {
      if (window.innerWidth <= 768) {
        dropdown.style.flexDirection = "row";
        logo.style.display = "block";
        
        if (window.innerWidth <= 768) {
          
          mainHeader.style.display = "none";
          dropdown.style.height = "75px";
          
        } else {
          
          mainHeader.style.display = "block";
          
        }
      }

    }

  }
}
