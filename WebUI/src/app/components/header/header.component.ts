import { Component, Input } from '@angular/core';
import { ModulesService } from 'src/app/services/modules.service';
import { Modules } from 'src/app/Models/Modules';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() perfil!: string;
  modulos: Modules[] = [];

constructor(private modules: ModulesService){}

ngOnInit(){
  this.getAllModules(this.perfil);
}

getAllModules(perfil: string): void{
  
  this.modules.getAll(perfil).subscribe((modulos) => (this.modulos = modulos));
}


}
