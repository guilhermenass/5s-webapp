import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user';
import swal from 'sweetalert';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgForm } from '@angular/forms';
import { IOption } from 'ng-select';
import { UserType } from './user-type.enum'
import { UserTypeDisplay } from './user-type-display.enum'


const helper = new JwtHelperService();

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  
  user: User = new User();
  users: User[];
  userSession: User = new User();
  selectItems: Array<String> = [];
  selectedTypeUser: Array<IOption> = [
    {label: 'Administrador', value: '1'},
    {label: 'Avaliador', value: '2'},
    {label: 'Responsável pelo ambiente ', value: '4'}
  ];
  UserTypeDisplay = UserTypeDisplay;
  userFiltered: User[];
  lengthUsersPagination: number;
  @ViewChild('userForm') userForm: NgForm;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.load();
    this.userSession = helper.decodeToken(localStorage.getItem('token'));
  }

  findUsers(typed: string) {
    this.userFiltered = this.users.filter(
      user => user.name.toLowerCase().includes(typed.toLowerCase()));
    this.lengthUsersPagination = this.userFiltered.length;
  }

  getModalAnswer(userId) {
    swal({
      title: 'Exclusão de usuário',
      text: 'Tem certeza que deseja excluir o usuário?',
      buttons: ['Cancelar', 'OK'],
      icon: 'warning',
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.remove(userId);
        }
      });
  }

  getValidation(res) {
    swal({
      title: '',
      text: res["message"],
      icon: res["type"]
    });
  }

  load() {
    this.userService.load()
      .subscribe(
        users => {
          this.users = users;
          this.userFiltered = this.users.slice(0, 10);
          this.lengthUsersPagination = this.users.length;
        },
        error => {
          console.log(error);
        },
    );
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.userFiltered = this.users.slice(startItem, endItem);
  }

  remove(id: string): void {
    this.userService.remove(id)
      .subscribe((res) => {
        this.getValidation(res);
        this.load();
        this.userForm.reset();
      },
        error => {
          this.getValidation(error.error)
        }
      );
  }

  checkIfExists(user: User) {
    let isRegistered = this.users.find(currentUser => currentUser.email === user.email);
    user.password = 'newPasswordFirstAccess';

    if (isRegistered && isRegistered.id !== user.id) {
      this.showModal('Usuário não cadastrado', 'Já existe um usuário com este e-mail');
      return true;
    }
    return false;
  }

  save(user): void {

    user["profile"] = 
      Number(this.selectItems[0]) |
      Number(this.selectItems[1]) |
      Number(this.selectItems[2])

    if(!this.checkIfExists(user)) {
      if (!user.id) {
        this.userService.save(user)
          .subscribe(res => {
            this.getValidation(res);
            this.load();
          });
      } else {
        this.userService.update(user)
        .subscribe((res) => {
          this.getValidation(res);
          this.load();
        })
      }
    }
  }

  showModal(title, text) {
    swal({
      title: title,
      text: text,
      buttons: [null, 'OK'],
      icon: 'warning',
      dangerMode: true,
    });
  }

  update(user: User): void {
    this.user = new User(user.id, user.name, user.email, user.password, user.profile)
    window.scroll(0, 0);
    this.selectItems = this.getUserType(user.profile);
  }

  getUserType(profile) : Array<String> {
    switch(profile) {

      case UserType.ADMIN:
        return ['1'];

      case UserType.APPRAISER:
        return ['2']

      case UserType.ADMIN_APPRAISER:
        return ['1, 2'];

      case UserType.RESPONSIBLE:
        return ['4'];
      
      case UserType.ADMIN_RESPONSIBLE:
        return ['1', '4'];

      case UserType.RESPONSIBLE_APPRAISER:
        return ['4', '2'];

      default:
        return ['1', '2', '4'];
    }
  }
}