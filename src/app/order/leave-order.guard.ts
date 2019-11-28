import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OrderComponent } from "./order.component";

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {

    canDeactivate(orderComponent: OrderComponent,
                  activatedRoute: ActivatedRouteSnapshot,
                  routerState: RouterStateSnapshot): boolean {
        if(!orderComponent.isOrderCompleted()) {
            return window.confirm('Are you sure you want to quit your order?')
        }else {
            return true
        }
    }
}