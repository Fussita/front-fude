import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  templateUrl: './delete-popup.component.html',
  imports: [
    MatDialogModule,
    CommonModule
  ],
  styleUrl: './delete-popup.component.scss',
  standalone: true,
})
export class PopupComponent {
  
  title = 'Eliminar Elemento'
  desc = '¿Estas seguro de eliminar el elemento?'
  
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.title) this.title = data.title
    if (data.desc) this.desc = data.desc
  }
  
  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }

}
