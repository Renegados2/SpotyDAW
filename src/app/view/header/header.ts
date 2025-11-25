import { Component, output, Output, OutputEmitterRef, Signal, signal, WritableSignal } from '@angular/core';
import { faHouse } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faListUl, faPlay } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private _displayingIndex: WritableSignal<boolean>;
  private _displayingList: WritableSignal<boolean>;
  private _displayingForm: WritableSignal<boolean>;
  private _displayingPlayer: WritableSignal<boolean>;

  public showList: OutputEmitterRef<boolean> = output();
  public showForm: OutputEmitterRef<boolean> = output();
  public showPlayer: OutputEmitterRef<boolean> = output();
  public showIndex: OutputEmitterRef<boolean> = output();

  faHouse = faHouse;
  faPlus = faPlus;
  faListUl = faListUl;
  faPlay = faPlay;

  constructor() {
    this._displayingIndex = signal(true);
    this._displayingList = signal(false);
    this._displayingForm = signal(false);
    this._displayingPlayer = signal(false);
  }

  get displayingIndex(): Signal<boolean> {
    return this._displayingIndex.asReadonly()
  }

  get displayingList(): Signal<boolean> {
    return this._displayingList.asReadonly()
  }

  get displayingForm(): Signal<boolean> {
    return this._displayingForm.asReadonly()
  }

  get displayingPlayer(): Signal<boolean> {
    return this._displayingPlayer.asReadonly()
  }

  clickedIndex() {
    this.resetDisplay();

    this.showIndex.emit(true);
    this._displayingIndex.set(true);
  }
  
  clickedList() {
    this.resetDisplay();

    this.showList.emit(true);
    this._displayingList.set(true);
  }

  clickedForm() {
    this.resetDisplay();

    this.showForm.emit(true);
    this._displayingForm.set(true);
  }

  clickedPlayer() {
    this.resetDisplay();

    this.showPlayer.emit(true);
    this._displayingPlayer.set(true);
  }

  resetDisplay() {
    this._displayingIndex.set(false);
    this.showIndex.emit(false)
    this._displayingList.set(false);
    this.showList.emit(false)
    this._displayingForm.set(false);
    this.showForm.emit(false)
    this._displayingPlayer.set(false);
    this.showPlayer.emit(false)
  }
}
