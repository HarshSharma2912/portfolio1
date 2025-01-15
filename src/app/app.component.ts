import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  dynamicWidth:any = "80%";
  constructor(private render:Renderer2){}

  ngOnInit(): void {
    this.setBarWidth(this.dynamicWidth);
  }


  setBarWidth(width:any ) {  
    // this.skillBarDataArray.map((res:any)=>{
      
    // })

    this.render.setStyle(document.body, '--dynamic-width', width);
    // this.render.setStyle(document.body,   '--html',"80%");
  }
  
}
