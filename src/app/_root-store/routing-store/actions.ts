import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = createAction(
  '[ROUTER] Go',
  props<{ path: any[]; query?: object; extras?: NavigationExtras }>()
);
export const BACK = createAction('[ROUTER] Back');
export const FORWARD = createAction('[ROUTER] forward');
