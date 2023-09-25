import { Component, OnInit } from '@angular/core';
import { DatagridServiceService } from 'src/services/datagrid-service.service';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.css'],
})
export class DatagridComponent implements OnInit {
  visible = false;
  employees: any[] = [];
  searchEditorOptions: any;
  searchFields: any;

  constructor(private datagridServiceService: DatagridServiceService) {}

  ngOnInit() {
    //sayfa iilk çalıştığında localstorage de veri yok ise datasource umuzu bozmasın diye if kontrolü ekledik
    var data = this.datagridServiceService.getData();
    if (data) this.employees = data;
  }

  //tabloya kayıt eklerken servisimizin post metoduna veriyi yolluyoruz
  onRowInserted(e: any) {
    this.datagridServiceService.postData(e.data);
  }

  //veriyi update ederken servicedeki put metoduna veriyi yolluyoruz
  onRowUpdated(e: any) {
    this.datagridServiceService.putData(e.data);
  }
  //veriyi silerken service deki delete metoduna Id yolluyoruz
  onRowRemoved(e: any) {
    this.datagridServiceService.deleteData(e.key);
  }
}
