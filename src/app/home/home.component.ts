import { AfterViewInit, Component ,HostListener} from '@angular/core';
import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faL, faLink } from '@fortawesome/free-solid-svg-icons';
import { style } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
 


@Component({ 
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule,AnimateOnScrollDirective,MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {

  faCoffee = faLink;

  events: string[] = [];
  opened: boolean = true;

  sideNameArray :any = [
    {
      "heading": "Home",
      "id" : "section1", 
      "icon" : ""
    },
    {
      "heading": "About",
      "id" : "section2", 
      "icon" : "" 
    },
    {
      "heading": "Skills",
      "id" : "section3", 
      "icon" : "" 
    },
    {
      "heading": "Resume",
      "id" : "section4", 
      "icon" : "" 
    },
    {
      "heading": "Projects",
      "id" : "section5", 
      "icon" : "" 
    },
    {
      "heading": "Services",
      "id" : "section6", 
      "icon" : "" 
    },
    {
      "heading": "Development Methodologies",
      "id" : "section7", 
      "icon" : "" 
    }
  ]


  isLargeScreen = window.innerWidth > 768; 
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isLargeScreen = window.innerWidth > 768;
    this.opened = this.isLargeScreen;
  }
  
  constructor(private render:Renderer2, private el:ElementRef){
    this.typingFun();
 
  }

  isViewInit:boolean = false;
  isAnimationOver:boolean = false;
  ngAfterViewInit(): void {
    this.isViewInit = true;
    setTimeout(() => {
      // this.isAnimationOver = true;
    }, 2000);
    throw new Error('Method not implemented.');
  }

  textToType:any=[{"text" : "Freelancer"},
    {"text" : "Frontend Developer"} 
    // {"text" : "Wordpress Developer"}
  ];





  typeTextIndex:number = 0;

  textTypingSpeed:any = 150;
  textEraseSpeed:any = 125;
  waitingTimeAfterType:any = 2000;

 

  typingFun(){
    let count = 0;
    this.typeTextIndex = (this.typeTextIndex +1)%this.textToType.length;
    
 let typingText = this.textToType[this.typeTextIndex].text;

  let intervalId =   setInterval(() => {
      
      this.name+=typingText[count];
      count++;
      count = count % typingText.length;
      if(count ==0){
        // this.name = "";

       let timeoutInterval =  setTimeout(() => {
          this.clearText();
          clearTimeout(timeoutInterval); 
        }, this.waitingTimeAfterType);
        clearInterval(intervalId);

      }

    }, this.textTypingSpeed);
  }
    
  clearText(){
    let typingText = this.textToType[this.typeTextIndex].text;

    let count = typingText.length;

    let intervalId =   setInterval(() => {

    // this.name+=this.toType[count];
   this.name =  this.name.slice(0,count)
    // console.log("reverse =>",this.name);
    
    count--;

    // count = count % this.toType.length;
    if(count <0){
      // this.name = "";
      this.typeTextIndex %= this.textToType.length;
      this.typingFun();
      clearInterval(intervalId);

    }

  }, this.textEraseSpeed);

  }

  name:any="";

  skillBarDataArray:any=[
    {
      "text" : "Html",
      "width" : "90%",
      "name" : "--html"
    },
    {
      "text" : "Css", 
      "width" : "95%",
      "name" : "--css"
    },
    {
      "text" : "Bootstrap", 
      "width" : "95%",
      "name" : "--Bootstrap"
    },
    {
      "text" : "Js", 
      "width" : "80%", 
      "name" : "--java"
    },
    {
      "text" : "Angular", 
      "width" : "80%",
      "name" : "--python"
    },
    {
      "text" : "Ionic", 
      "width" : "60%",
      "name" : "--ionic"
    },
    {
      "text" : "WordPress", 
      "width" : "70%",
      "name" : "--wordpress"
    } 
  ]

  dynamicWidth:any = "80%"; 

  formarr:any = [{'val':"harsh"},{'val':"harsh"},{'val':"harsh"}];


  
  
  

  ngOnInit(): void {
     this.setStyle('--dynamic-width', '80%');
     this.generateDynamicKeyframes();

    //  for (let i = 0; i < this.formarr.length; i++) {
    //   this.formarr[i].val = "";
    // }

    console.log("harsh array =>",this.formarr);


    for (let subData of this.formarr) {
      subData.val = "";
    }

    console.log("harsh array =>",this.formarr);
    

  }

  



  setStyle(variable:any,value:any) {
    this.skillBarDataArray.map((res:any)=>{
      document.documentElement.style.setProperty(res.name, res.width);
      
    })

  }


  generateDynamicKeyframes(): void {
    // Create a new style element
    const style = document.createElement('style');
    style.type = 'text/css';

    // Iterate over skillBarDataArray to create keyframes for each item
    this.skillBarDataArray.forEach((skill:any) => {
      const keyframeName = skill.name;
      const keyframes = `
        @keyframes ${keyframeName} {
          0% {
            background-color: var(--themeColor);
            width: 0;
          }
          100% {
            background-color: var(--themeColor);;
            width: ${skill.width};
          }
        }
      `;
      style.innerHTML += keyframes; // Add the keyframes rule to the style element
    });

    // Append the style element to the document head
    document.head.appendChild(style);
  }
  


  scrollToSection(targetId:any, status:boolean): void {
    this.opened = status;
    const target = document.getElementById(targetId);
    if (target) {
      // target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
      
    }

    
    if(!this.isLargeScreen){
       this.opened = false;
    }
  }

  
  toggleSlider(){
    this.opened = true;
  }
 

 
  



}
