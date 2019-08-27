import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BowlsService } from '../bowls.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {

  constructor(private bowlsService: BowlsService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const name = form.value.bowlName;
    this.bowlsService.createBowl(name);
    form.reset();
  }
}
