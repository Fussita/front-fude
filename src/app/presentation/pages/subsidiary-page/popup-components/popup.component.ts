import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { InfoLocationType } from '../types/info-location.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  imports: [
    MatDialogModule,
    CommonModule
  ],
  styleUrl: './popup.component.scss',
  standalone: true,
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoLocationType) {}
}
