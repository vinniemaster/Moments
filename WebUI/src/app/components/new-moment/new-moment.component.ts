import { Component } from '@angular/core';
import { Moments } from 'src/app/Models/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { Buffer } from 'buffer';
import { Observable, Subscriber } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/Models/APIResponse';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = "Compartilhe!"
  response!: APIResponse<Moments>;
    
  constructor(private momentService: MomentsService, 
    private messageService: MessagesService,
    private router: Router
    ){}

  ngOnInit(){}

  async createHandler(moment: Moments){
      
    await this.momentService.createMoment(moment);

    this.router.navigate(['/'])
  }

  

}
