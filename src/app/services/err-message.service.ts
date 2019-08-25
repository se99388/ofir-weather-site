import { Injectable } from '@angular/core';
import { ModalMessageComponent } from '../components/modal-message/modal-message.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Injectable({
    providedIn: 'root'
})
export class ErrMessageService {

    constructor(public dialog: MatDialog) { }

    openModal(errMsg): void {
            const dialogRef = this.dialog.open(ModalMessageComponent, {
                width: '600px',
                data: errMsg
            });

            dialogRef.afterClosed().subscribe();

    }
}
