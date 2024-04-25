import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  private readonly toastrService = inject(ToastrService);

  // FIXME: Works only once.
  // Redirects to browser homepage on second browser "Back" button click.
  @HostListener('window:popstate', ['$event'])
  preventNavigationBack($event: PopStateEvent): void {
    this.toastrService.warning(
      'Press "Continue shopping" to return on products page.'
    );

    history.pushState(null, '', location.href);
  }
}
