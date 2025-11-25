import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { faHeart as sHeart } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faHeart as rHeart } from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-player',
  imports: [FaIconComponent, FormsModule, NgClass],
  templateUrl: './player.html',
  styleUrl: './player.css',
})
export class Player {
  public currentSong: InputSignal<any> = input();

  public hidePlayer: OutputEmitterRef<boolean> = output();

  public favoriteToggle: OutputEmitterRef<any> = output();
  public deletedSong: OutputEmitterRef<any> = output();

  constructor() {}

  sHeart = sHeart;
  rHeart = rHeart;
  faTrashCan = faTrashCan;

  swapFavorite() {
    this.currentSong().favorite = !this.currentSong().favorite
    this.favoriteToggle.emit(this.currentSong());

  }

  deleteSong() {
    this.hidePlayer.emit(true);
    this.deletedSong.emit(this.currentSong());
  }
}
