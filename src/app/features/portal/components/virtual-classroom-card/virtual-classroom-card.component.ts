import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-virtual-classroom-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './virtual-classroom-card.component.html',
  styleUrl: './virtual-classroom-card.component.css'
})
export class VirtualClassroomCardComponent {}
