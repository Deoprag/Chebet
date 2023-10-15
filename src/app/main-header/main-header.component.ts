import { Component } from '@angular/core';

@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {

  ngOnInit() {
    window.addEventListener('resize', fixDisplay)
    showBar();
  }

  botao() {
    showBar();
  }
}

function fixDisplay() {
  const mainHeader = document.getElementById("main-header");
  const logo = document.getElementById("logo");
  
  if (mainHeader != undefined && logo != undefined) {
    if (window.innerWidth >= 768) {
      mainHeader.style.display = "block";
      logo.style.display = "none"
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
        dropdown.style.height = "75px";
        dropdown.style.flexDirection = "row";
        logo.style.display = "block";
        
        if (window.innerWidth <= 768) {
          
          mainHeader.style.display = "none";
          
        } else {
          
          mainHeader.style.display = "block";
          
        }
      }

    }

  }
}
