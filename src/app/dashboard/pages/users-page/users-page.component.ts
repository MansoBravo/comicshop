import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../../auth/interfaces/periodic-element.interface';
import { User } from 'src/app/auth/interfaces';
import { UserService } from '../../services/user-service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'auth-users-page',
  templateUrl: './users-page.component.html',
  styles: [
  ]
})
export class UsersPageComponent {
  displayedColumns: string[] = ['position', 'nombre', 'email', 'rol'];
  dataSource = ELEMENT_DATA;

  public users: User[] = [];

  displayedColumns1: string[] = ['#','name','email','rol','active'];

  private usersService = inject( UserService );

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe( users => this.users = users );

  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, nombre: 'Hydrogen', email: 'a@a.es', rol: 'H'},
  {position: 2, nombre: 'Helium', email: 'a@a.es', rol: 'He'},
  {position: 3, nombre: 'Lithium', email: 'a@a.es', rol: 'Li'},
  {position: 4, nombre: 'Beryllium', email: 'a@a.es', rol: 'Be'},
  {position: 5, nombre: 'Boron', email: 'a@a.es', rol: 'B'},
  {position: 6, nombre: 'Carbon', email: 'a@a.es', rol: 'C'},
  {position: 7, nombre: 'Nitrogen', email: 'a@a.es', rol: 'N'},
  {position: 8, nombre: 'Oxygen', email: 'a@a.es', rol: 'O'},
  {position: 9, nombre: 'Fluorine', email: 'a@a.es', rol: 'F'},
  {position: 10, nombre: 'Neon', email: 'a@a.es', rol: 'Ne'},
];
