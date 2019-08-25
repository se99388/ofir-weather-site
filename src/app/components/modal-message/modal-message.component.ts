
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Error } from '../../models/err';


@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent  {

    constructor(
        public dialogRef: MatDialogRef<ModalMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Error) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }

}
