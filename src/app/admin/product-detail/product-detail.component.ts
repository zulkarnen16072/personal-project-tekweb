import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  userData: any = {};

  constructor(
    public dialogRef:MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      this.userData = res;
      console.log("This.user Data " + this.userData.uid)
    })
  }

  saveData() {
    this.dialogRef.close(this.data);
    
  }

  save() {
    if (this.data.id == undefined) {
    let doc = new Date().getTime().toString();
    this.db.collection('test').doc(doc).set(this.data).then(res => {
      alert("Document successfully written!");
      this.dialogRef.close(this.data);
    }).catch(error => {
      console.log(error);
      alert("Error" + error)
    })
  }
  }

}
