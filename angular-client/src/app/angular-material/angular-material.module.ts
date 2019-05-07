import { NgModule } from '@angular/core';
import { MatCardModule, MatInputModule, MatToolbarModule,
   MatSnackBarModule, MatCheckboxModule, MatIconModule,
    MatGridListModule, MatTableModule, MatPaginatorModule,
     MatSortModule, MatDatepickerModule, MatNativeDateModule, MatListModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  imports: [
      MatCardModule,
      MatFormFieldModule,
      MatButtonModule,
      MatInputModule,
      MatToolbarModule,
      MatSnackBarModule,
      MatSidenavModule,
      MatCheckboxModule,
      MatIconModule,
      MatGridListModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatListModule
    ],
  exports: [
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ]
})
export class AngularMaterialModule { }
