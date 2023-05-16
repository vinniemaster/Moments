import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Moments } from 'src/app/Models/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { MessagesService } from 'src/app/services/messages.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/Models/Comment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})

export class MomentComponent {
  moment?: Moments;
  showCommentForm: boolean = false
  commentForm!: FormGroup
  constructor(
    private router: Router,
    private momentService: MomentsService,
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private commentService : CommentService
   ) {}

  ngOnInit(){
    const id = Number( this.route.snapshot.paramMap.get("id"))

    this.momentService.getByID(id).subscribe(item => this.moment = item.data)

      this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    })
  }

  get text(){
    return this.commentForm.get('text')!
  }
  get username(){
    return this.commentForm.get('username')!
  }

  async removeHandler(id: Number){

    await this.momentService.removeMoment(id).subscribe(((res) =>{
      this.messageService.showMessage(res.message!)

      this.router.navigate(['/'])
    }))
  }

  enableCommentForm(){
    this.showCommentForm = !this.showCommentForm;
  }


  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid){
      return
    }
    
    const data: Comment = this.commentForm.value;

    data.momentId = Number(this.moment!.id);


    await this.commentService.createComment(data).subscribe((comment) => {this.messageService.showMessage(comment.message!)})

  }
}
