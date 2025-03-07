import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  imports: [FormsModule, MatFormFieldModule],
  encapsulation: ViewEncapsulation.None
})
export class PasswordDialogComponent {
  password: string = '';

  constructor(private dialogRef: MatDialogRef<PasswordDialogComponent>) {}

  confirm() {
    this.dialogRef.close(this.password);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
