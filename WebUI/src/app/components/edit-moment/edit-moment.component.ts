import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moments } from 'src/app/Models/Moments';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentsService } from 'src/app/services/moments.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent {
  moment!: Moments
  btnText: String = 'Editar';


  constructor(private momentService: MomentsService, 
    private route: ActivatedRoute, 
    private messageService: MessagesService,
    private router: Router){}

  ngOnInit(): void{
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getByID(id).subscribe((res) => {this.moment = res.data!})
  }

  editHandler(momentData: Moments){
    const id = this.moment.id;

    this.momentService.updateMoment(momentData).subscribe((res) => {this.messageService.showMessage(res.message!)})

    this.router.navigate(['/'])
    
  }
}
