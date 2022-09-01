import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user!: User;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  @Output() userProfile: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public signOutEmit(): void {
    this.signOut.emit();
  }

  userProfileEmit() {
    this.userProfile.emit();
  }
}
