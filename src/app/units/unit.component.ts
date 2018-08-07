import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitService } from './unit.service';
import { Unit } from './unit';
import swal from 'sweetalert';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html'
})

export class UnitComponent implements OnInit {

  constructor( public unitService: UnitService) { }

  cities: any;
  states: any;
  units: Unit[];
  unit: Unit = new Unit();

  //Filter and pagination
  unitFiltered: Unit[];
  lengthUnitPagination: number;

  @ViewChild('unitForm') unitForm : NgForm;

  ngOnInit() {
    this.getStates();
    this.load();
  }

  findUnits(typed: string){
    this.unitFiltered = this.units.filter(
        unit => unit.name.toLowerCase().includes(typed.toLowerCase()));
    this.lengthUnitPagination = this.unitFiltered.length;
  }

  getStates() {
    this.unitService.getStates().subscribe(
      states => {
        this.states = states;
      },
      error => {
        console.log(error);
      },
    );
    console.log(this.states);
  }

  getCities(stateId) {
    this.unitService.getCities(stateId).subscribe(
      cities => {
        this.cities = cities;
      },
      error => {
        console.log(error);
      },
    );
    console.log(this.cities);
  }

  save(unit): void {
    if (!unit.id) {
      this.unitService.save(unit)
        .subscribe(res => {
          this.getValidation(res);
          this.load();
      });
    } else {
      this.unitService.update(unit)
      .subscribe(res => {
        this.getValidation(res);
        this.load();
      });
    }
  }

  getValidation(res) {
    swal({
      title: '',
      text: res['message'],
      icon: res['type']
    });
  }

  load() {
    this.unitService.load()
    .subscribe(
      units => {
        this.units = units;
        this.unitFiltered = this.units.slice(0, 10);
        this.lengthUnitPagination = this.units.length;
      },
      error => {
        console.log(error);
      },
    );
  }

  update(unit: Unit): void {
    this.getCities(unit.state);
    this.unit = unit;
    window.scroll(0, 0);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.unitFiltered = this.units.slice(startItem, endItem);
  }
  
  remove(id: string): void {
    this.unitService.remove(id)
    .subscribe((res) => {
      this.getValidation(res);
      this.load();
      this.unitForm.reset();
    });
  }

  getModalAnswer(unitId) {
    swal({
      title: 'Exclusão de unidade',
      text: 'Tem certeza que deseja excluir a unidade?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.remove(unitId);
      }
    });
  }
}
