import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import emailjs from 'emailjs-com';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    AnimateOnScrollDirective,
    MatSidenavModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {

  faCoffee = faLink;

  contactForm: FormGroup;
  submitted = false;
  events: string[] = [];
  opened: boolean = true;
  value: any = 'side';
  name: string = '';

  isLargeScreen = window.innerWidth > 768;

  sideNameArray = [
    { heading: 'Home', id: 'section1', icon: '' },
    { heading: 'About', id: 'section2', icon: '' },
    { heading: 'Skills', id: 'section3', icon: '' },
    { heading: 'Resume', id: 'section4', icon: '' },
    { heading: 'Projects', id: 'section5', icon: '' },
    { heading: 'Services', id: 'section6', icon: '' },
    { heading: 'Development Methodologies', id: 'section7', icon: '' }
  ];

  skillBarDataArray = [
    { text: 'Html', width: '90%', name: '--html' },
    { text: 'Css', width: '95%', name: '--css' },
    { text: 'Bootstrap', width: '95%', name: '--Bootstrap' },
    { text: 'Js', width: '80%', name: '--java' },
    { text: 'Angular', width: '80%', name: '--python' },
    { text: 'Ionic', width: '60%', name: '--ionic' },
    { text: 'WordPress', width: '70%', name: '--wordpress' }
  ];

  formarr = [{ val: 'harsh' }, { val: 'harsh' }, { val: 'harsh' }];

  textToType = [
    { text: 'Freelancer' },
    { text: 'Frontend Developer' }
  ];

  typeTextIndex = 0;
  textTypingSpeed = 150;
  textEraseSpeed = 125;
  waitingTimeAfterType = 2000;

  isViewInit: boolean = false;
  isAnimationOver: boolean = false;

  constructor(
    private render: Renderer2,
    private el: ElementRef,
    private fb: FormBuilder
  ) {
    this.typingFun();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isLargeScreen = window.innerWidth > 768;
    this.opened = this.isLargeScreen;
    if (!this.isLargeScreen) {
      this.value = 'over';
    }
  }

  ngOnInit(): void {
    this.setStyle('--dynamic-width', '80%');
    this.generateDynamicKeyframes();

    for (let subData of this.formarr) {
      subData.val = '';
    }
  }

  ngAfterViewInit(): void {
    this.isViewInit = true;
    if (!this.isLargeScreen) {
      this.value = 'over';
    }
    setTimeout(() => {
      // this.isAnimationOver = true;
    }, 2000);

    throw new Error('Method not implemented.');
  }

  typingFun() {
    let count = 0;
    this.typeTextIndex = (this.typeTextIndex + 1) % this.textToType.length;
    let typingText = this.textToType[this.typeTextIndex].text;

    const intervalId = setInterval(() => {
      this.name += typingText[count];
      count++;
      if (count === typingText.length) {
        setTimeout(() => {
          this.clearText();
        }, this.waitingTimeAfterType);
        clearInterval(intervalId);
      }
    }, this.textTypingSpeed);
  }

  clearText() {
    let typingText = this.textToType[this.typeTextIndex].text;
    let count = typingText.length;

    const intervalId = setInterval(() => {
      this.name = this.name.slice(0, count);
      count--;
      if (count < 0) {
        this.typingFun();
        clearInterval(intervalId);
      }
    }, this.textEraseSpeed);
  }

  setStyle(variable: string, value: string) {
    this.skillBarDataArray.forEach(skill => {
      document.documentElement.style.setProperty(skill.name, skill.width);
    });
  }

  generateDynamicKeyframes(): void {
    const style = document.createElement('style');
    style.type = 'text/css';

    this.skillBarDataArray.forEach(skill => {
      const keyframes = `
        @keyframes ${skill.name} {
          0% {
            background-color: var(--themeColor);
            width: 0;
          }
          100% {
            background-color: var(--themeColor);
            width: ${skill.width};
          }
        }
      `;
      style.innerHTML += keyframes;
    });

    document.head.appendChild(style);
  }

  scrollToSection(targetId: string, status: boolean): void {
    setTimeout(() => {
      const target = document.getElementById(targetId);
      this.opened = status;

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (!this.isLargeScreen) {
          setTimeout(() => {
            this.opened = false;
          }, 500);
        }
      } else {
        console.warn('Scroll target not found:', targetId);
      }
    }, 100);
  }

  toggleSlider() {
    this.opened = true;
  }

  isControlInvalid(controlName: string, errorName: string) {
    const control = this.contactForm.get(controlName);
    return (this.submitted || control?.touched) && !!control?.hasError(errorName);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData, 'YOUR_PUBLIC_KEY')
        .then(() => {
          alert('Message sent successfully!');
          this.contactForm.reset();
          this.submitted = false;
        })
        .catch(error => {
          console.error('Error sending email:', error);
          alert('Failed to send message. Please try again.');
        });
    }
  }
}
