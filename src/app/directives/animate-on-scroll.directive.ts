// src/app/directives/animate-on-scroll.directive.ts
import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true, 

})
export class AnimateOnScrollDirective implements OnInit {
  @Input('appAnimateOnScroll') animationClass: string = 'animate-fade-in';
  @Input() threshold: number = .3; // Optional: Customize when the animation triggers

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // if( window.innerWidth > 768){
    //     this.threshold = 0.3;
    // }else{
    //   this.threshold = 0.1;
    // }
  
  }

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          console.log("harsh =>",entry);
          
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, this.animationClass);
            obs.unobserve(this.el.nativeElement);
          }
        });
      },
      {
        threshold: this.threshold
      }
    );

    observer.observe(this.el.nativeElement);
  }
}
