import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmailService } from './email.service';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  dynamicWidth:any = "80%";
  emailData = {
    name: '',
    email: '',
    message: '',
  };


  constructor(private emailService: EmailService,private render:Renderer2){}

  ngOnInit(): void {
    this.setBarWidth(this.dynamicWidth);
  }


  setBarWidth(width:any ) {  
    // this.skillBarDataArray.map((res:any)=>{
      
    // })

    this.render.setStyle(document.body, '--dynamic-width', width);
    // this.render.setStyle(document.body,   '--html',"80%");
  }
   sendEmail() {
    this.emailService.sendEmail(this.emailData)
      .then(response => console.log('Email sent successfully!', response))
      .catch(error => console.error('Error sending email:', error));
  }

}
