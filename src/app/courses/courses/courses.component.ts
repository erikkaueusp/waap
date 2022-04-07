import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  // cursos: Course = {_id:1,name:'Spring',category:'backend'};
  courses$: Observable<Course[]>;
  displayedColumns = ['name','category'];
  A = {A: {nome: "erik", idade: "31"},B: {nome: "erik", idade: "31"},C: {nome: "erik", idade: "31"},D: {nome: "erik", idade: "31"},E: {nome: "erik", idade: "31"}}

  constructor(private courseService:CoursesService,
        public dialog: MatDialog) {
    // this.courses = [];
    this.courses$ = this.courseService.list()
    .pipe(
      catchError(error => {
        console.log(`Erro ao carregar cursos: ${error}`);
        this.onError("Erro ao carregar cursos.");
        return of([])
      })
      );
   }

   onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


  ngOnInit(): void {

  }


}
