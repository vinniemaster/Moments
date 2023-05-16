import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Moments } from 'src/app/Models/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})

export class MomentComponent {
  moment?: Moments;
  constructor(
    private router: Router,
    private momentService: MomentsService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
   ) {}

  ngOnInit(){
    const id = Number( this.route.snapshot.paramMap.get("id"))

    this.momentService.getByID(id).subscribe(item => this.moment = item.data)
  }

  async removeHandler(id: Number){

    await this.momentService.removeMoment(id).subscribe(((res) =>{
      this.messageService.showMessage(res.message!)

      this.router.navigate(['/'])
    }))
  }
}
