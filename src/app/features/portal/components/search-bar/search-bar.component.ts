import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CategoryChip } from '../../model/content.model';

@Component({
  selector: 'app-portal-search-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  categories = input.required<CategoryChip[]>();
  searchQuery = input<string>('');

  queryChange = output<string>();
  categoryToggle = output<string>();

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.queryChange.emit(value);
  }

  onSearchSubmit(): void {
    this.queryChange.emit(this.searchQuery());
  }

  onCategoryClick(catId: string): void {
    this.categoryToggle.emit(catId);
  }
}
