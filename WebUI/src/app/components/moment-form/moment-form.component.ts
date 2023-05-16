import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moments } from 'src/app/Models/Moments';
import { Observable, Subscriber } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Helpers } from 'src/app/Helpers/Helpers';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent {
  @Output() onSubmit = new EventEmitter<Moments>();
  @Input() btnText!: string;
  
  base64!: string;

  momentForm!: FormGroup;

  

  ngOnInit(): void{
    this.momentForm = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    })
  }

  get title(){
    return this.momentForm.get('title')!;

  }

  get description(){
    return this.momentForm.get('description')!;
    
  }
  constructor(private helpers: Helpers){}
  async onFileSelected(event: any){
    const file: File = event.target.files[0];
    await this.helpers.convertFileToBase64(file).then((i) => {this.base64 = i as string;});  
    
    this.momentForm.patchValue({'image' : this.base64})
  }

  submit(): void{
    this.onSubmit.emit(this.momentForm.value);
  }
  


  
}
