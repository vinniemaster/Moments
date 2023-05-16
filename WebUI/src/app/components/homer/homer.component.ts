import { Component } from '@angular/core';
import { MomentsService } from 'src/app/services/moments.service';
import { Moments } from 'src/app/Models/Moments';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-homer',
  templateUrl: './homer.component.html',
  styleUrls: ['./homer.component.css']
})
export class HomerComponent {
  allMoments: Moments[] = [];
  moments: Moments[] = [];

  baseApiUrl = environment.baseApiUrl


  constructor(private momentService: MomentsService) {}

  ngOnInit(): void{
    
    this.momentService.getAll().subscribe((all) => {
      
      all.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
        item.updated_at = new Date(item.updated_at!).toLocaleDateString('pt-BR');
      })

      this.moments = all
      this.allMoments = all
    })

    
    
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value)
    );
  }

}
