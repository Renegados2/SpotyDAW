import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { MusicList } from './view/music-list/music-list';
import { AddForm } from './view/add-form/add-form';
import { Player } from './view/player/player';
import { Header } from './view/header/header';
import { faHeart as sHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as rHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MusicList, AddForm, Player, Header, FontAwesomeModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  sHeart = sHeart;
  rHeart = rHeart;

  protected readonly title = signal('spoty-daw');

  private _showPlayer: WritableSignal<boolean>;
  private _showForm: WritableSignal<boolean>;
  private _showList: WritableSignal<boolean>;
  private _showIndex: WritableSignal<boolean>;
  private _currentSong: WritableSignal<any>;

  private _favoriteAction: WritableSignal<any>;
  private _deletedSong: WritableSignal<any>;

  private _newSong: WritableSignal<any>;

  constructor() {
    this._newSong = signal({});
    this._deletedSong = signal({});
    this._currentSong = signal({});
    this._favoriteAction = signal({});
    this._deletedSong = signal({});

    this._showPlayer = signal(false);
    this._showForm = signal(false);
    this._showList = signal(false);
    this._showIndex = signal(false);
  }

  // Getters

  get newSong() {
    return this._newSong.asReadonly();
  }

  get currentSong() {
    return this._currentSong.asReadonly();
  }

  get deletedSong() {
    return this._deletedSong.asReadonly();
  }

  get favoriteAction() {
    return this._favoriteAction.asReadonly();
  }

  // Display Logic Getters
  get showPlayer(): Signal<boolean> {
    return this._showPlayer.asReadonly();
  }

  get showForm(): Signal<boolean> {
    return this._showForm.asReadonly();
  }

  get showList(): Signal<boolean> {
    return this._showList.asReadonly();
  }

  get showIndex(): Signal<boolean> {
    return this._showIndex.asReadonly();
  }

  // Display Logic Setters
  set showPlayer(newValue: boolean) {
    this._showPlayer.set(newValue);
  }

  set showForm(newValue: boolean) {
    this._showForm.set(newValue);
  }

  set showList(newValue: boolean) {
    this._showList.set(newValue);
  }

  set showIndex(newValue: boolean) {
    this._showIndex.set(newValue);
  }

  // Functions
  prepareForm() {
    this._showPlayer.set(false);
    this._showForm.set(true);
  }

  addSong(song: any) {
    this._newSong.set(song);
  }

  showSong(song: any) {
    this._currentSong.set(song);
    this._showPlayer.set(true);
    this._showForm.set(false);
  }

  onFavoriteAction(song: any) {
    this._favoriteAction.set({ ...song });
  }

  toggleFavorite() {
    this._currentSong().favorite = !this._currentSong().favorite
  }

  onDeletedSong(song: any) {
    this._deletedSong.set(song);
    this._currentSong.set({})
  }
}
