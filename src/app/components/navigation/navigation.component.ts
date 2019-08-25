import { Component } from '@angular/core';
import { NgRedux } from '../../../../node_modules/ng2-redux';
import { Store } from '../../redux/store';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
    constructor(public redux:NgRedux<Store>) { }

}
