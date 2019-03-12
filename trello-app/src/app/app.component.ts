import { Component } from '@angular/core';
import { TableService } from 'src/service/table.service';
import { FormControl } from '@angular/forms';
import { Table } from 'src/model/table';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tableName = new FormControl('');
  tables: Table[];

  constructor(private tableService: TableService) {
    tableService.getAll().pipe(take(1)).subscribe(tables => this.tables = tables);
  }

  createTable() {
    this.tableService.create({ name: this.tableName.value}).pipe(take(1))
      .subscribe(table => this.tables.push(table));
  }

  deleteTable(id: string) {
    this.tableService.delete(id).pipe(take(1))
      .subscribe(() => this.tables = this.tables.filter(table => table.id !== id));
  }
}
