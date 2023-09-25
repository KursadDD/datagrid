import { Injectable } from '@angular/core';
import { DataModel } from 'src/app/models/datamodel';

@Injectable({
  providedIn: 'root',
})
export class DatagridServiceService {
  constructor() {}

  getData() {
    //localstorage daki veriyi alıyoruz. veri boş değil ise json çevirip return ediyoruz
    var stringData = localStorage.getItem('data');
    if (stringData !== null) var jsonData = JSON.parse(stringData);
    return jsonData;
  }

  postData(value: DataModel) {
    //get metodu aracılığı ile localstorage daki veriyi json olacak alıyoruz
    //data var ise yeni veriyi var olana ekleyip tekrar storage a kaydediyoruz
    //data yok ise direk olarak yeni eklenen veriyi storage a yolluyoruz
    var jsonData = this.getData();
    if (jsonData) jsonData.push(value);
    else {
      jsonData = [];
      jsonData.push(value);
    }

    var stringData = JSON.stringify(jsonData);
    localStorage.setItem('data', stringData);
  }

  putData(value: DataModel) {
    //get metodu aracılığı ile localstorage daki veriyi json olacak alıyoruz
    //edit yaptığımız için verinin olmama durumu mümkün gözükmesede yine de veri varsa yoksa diye iki ayrı duruma bakıyoruz
    //veri var ise, gelen json içerisinden Id ile find metodu yardımı ie arama yaparak güncelleyeceğimiz veriyi buluyoruz
    //bulduğumuz veriyi yeni değerleri ile güncelledikten sonra tekrar storage üzeründe veriyi güncelliyoruz
    var jsonData = this.getData();
    if (jsonData) {
      var findData = jsonData.find((obj: DataModel)=>{
        return obj.Id == value.Id
      })
      findData.Link = value.Link
      findData.Name = value.Name
      findData.Description = value.Description
      var stringData = JSON.stringify(jsonData);
      localStorage.setItem('data', stringData);
    } else {
      jsonData = [];
      jsonData.push(value);
    }
  }

  deleteData(Id: string) {
    //get metodu aracılığı ile localstorage daki veriyi json olacak alıyoruz
    //veri var ise, gelen json içerisinden Id ile filter metodu yardımı ie arama yaparak sileceğimiz verinin dışında kalan verilerden yeni bi array oluşturuyoruz
    //oluşan yeni arrayı storage üzerine yollayarak sadece silmek isteğimiz verinin dışında kalan verileri storage da tutmuş  oluyoruz
    var jsonData = this.getData();
    if (jsonData) {
      var newArray = jsonData.filter((obj: DataModel)=>{
        return obj.Id != Id
      })
      var stringData = JSON.stringify(newArray);
      localStorage.setItem('data', stringData);
    } 
  }
}
