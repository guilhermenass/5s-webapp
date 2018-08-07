import { Component, OnInit, ViewChild } from '@angular/core';
import { EnviromentTypeService } from './enviroment-type.service';
import { EnviromentService } from '../enviroments/enviroment.service'
import { EnviromentType } from './enviroment-type';
import swal from 'sweetalert';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-enviroment-type',
  templateUrl: './enviroment-type.component.html'
})

export class EnviromentTypeComponent implements OnInit {

  constructor(public enviromentTypeService: EnviromentTypeService,
              public enviromentService: EnviromentService) { }

  enviromentTypes: EnviromentType[];
  enviromentType: EnviromentType = new EnviromentType();

  //Filter and pagination
  enviromentTypesFiltered: EnviromentType[];
  lengthEnvironmentTypePagination: number;
  @ViewChild('enviromentTypeForm') enviromentTypeForm : NgForm;

  ngOnInit() {
    this.load();
  }

  findEnvironmentTypes(typed: string){
    this.enviromentTypesFiltered = this.enviromentTypes.filter(
        enviromentType => enviromentType.name.toLowerCase().includes(typed.toLowerCase()));
    this.lengthEnvironmentTypePagination = this.enviromentTypesFiltered.length;
  }

  save(enviromentType): void {
    if (!enviromentType.id) {
      this.enviromentTypeService.save(enviromentType)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
      });
     } else {
      this.enviromentTypeService.update(enviromentType)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
      });
    }
  }

  getValidation(res) {
    swal({
      title: '',
      text: res["message"],
      icon: res["type"]
    });
  }

  load() {
    this.enviromentTypeService.load()
    .subscribe(
      enviromentsType => {
        this.enviromentTypes = enviromentsType;
        this.enviromentTypesFiltered = this.enviromentTypes.slice(0, 10);
        this.lengthEnvironmentTypePagination = this.enviromentTypes.length;
      },
      error => {
        console.log(error);
      },
    );
  }
  update(enviromentType: EnviromentType): void {
    this.enviromentType = enviromentType;
    window.scroll(0, 0);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.enviromentTypesFiltered = this.enviromentTypes.slice(startItem, endItem);
  }

  remove(id: string) {
    this.enviromentTypeService.removeAssociatedItems(id)
    .subscribe((res) => {
      this.enviromentTypeService.remove(id)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
        this.enviromentTypeForm.reset();
      },
      error => {
        this.getValidation(error.error);
      },
      )
    });
  }

  getModalAnswer(enviromentsTypeId) {
    swal({
      title: 'Exclusão de tipo de ambiente',
      text: 'Tem certeza que deseja excluir o tipo de ambiente?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.remove(enviromentsTypeId);
      }
    });
  }
}
