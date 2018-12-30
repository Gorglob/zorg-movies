import { DescriptionItem } from './../../dto/DescriptionItem';
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PopoverMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-menu',
  templateUrl: 'popover-menu.html'
})
export class PopoverMenuComponent {
  selected: string;
  items: DescriptionItem[];
  titre: string;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.items = navParams.get('items');
    this.titre = navParams.get('titre');
    this.selected = navParams.get('selected');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  select(item) {
    this.viewCtrl.dismiss(item);
  }
}
