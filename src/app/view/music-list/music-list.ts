import {
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SONGS } from '../../model/song';
import { FormsModule } from '@angular/forms';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart as sHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as rHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-music-list',
  imports: [FormsModule, FontAwesomeModule, NgClass],
  templateUrl: './music-list.html',
  styleUrl: './music-list.css',
})
export class MusicList {
  private _songs: Signal<any[]>;
  private _songsDisplayed: Signal<any[]>;
  private _keyword: WritableSignal<string> = signal<string>('');

  public showForm: OutputEmitterRef<boolean> = output();
  public selectedSong: OutputEmitterRef<boolean> = output();

  public newSong: InputSignal<any> = input<any>();

  public deletedSong: InputSignal<any> = input<any>();
  public favoriteAction: InputSignal<any> = input<any>();

  private _searchBarFocused: WritableSignal<boolean>;

  sHeart = sHeart;
  rHeart = rHeart;
  play = faPlay;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor() {
    this._searchBarFocused = signal(false);

    this._songs = computed(() => {
      const songs = [...this.getSongs()];

      const ns = this.newSong();
      if (ns && ns.title) {
        songs.push(ns);
        this.storeSong(ns);
      }

      const del = this.deletedSong();
      if (del && del.title) {
        const index = songs.findIndex((e) => e.title === del.title && e.artist === del.artist);
        if (index !== -1) {
          songs.splice(index, 1);
          localStorage.setItem('Songs', JSON.stringify(songs));
        }
      }

      const fav = this.favoriteAction();
      if (fav && fav.title) {
        const idx = songs.findIndex((e) => e.title === fav.title && e.artist === fav.artist);
        if (idx !== -1) {
          songs[idx].favorite = fav.favorite;
          localStorage.setItem('Songs', JSON.stringify(songs));
        }
      }

      return songs;
    });

    //  ---------------------------------------------- //

    this._songsDisplayed = computed(() => {
      const keyword = this._keyword().toLowerCase() ?? '';

      let songs: any[];

      if (!keyword) {
        songs = this._songs();
      } else {
        songs = this._songs().filter(
          (e) => e.title.toLowerCase().includes(keyword) || e.artist.toLowerCase().includes(keyword)
        );
      }

      return songs;
    });
  }

  get searchBarFocused(): Signal<boolean> {
    return this._searchBarFocused.asReadonly();
  }

  get songs() {
    return this._songsDisplayed();
  }

  get keyWord(): WritableSignal<string> {
    return this._keyword;
  }

  playSong(song: any) {
    this.selectedSong.emit(song);
  }

  swapFavorite(song: any, event: Event) {
    const currentSongsString = localStorage.getItem('Songs');
    if (currentSongsString) {
      song.favorite = !song.favorite;
      const currentSongs: any[] = JSON.parse(currentSongsString);
      const index = currentSongs.findIndex(
        (e: any) => e.title == song.title && e.artist == song.artist
      );

      if (index != -1) {
        currentSongs[index] = song;

        localStorage.setItem('Songs', JSON.stringify(currentSongs));
      }
    }
    event.stopPropagation();
  }

  addSong() {
    this.showForm.emit(true);
  }

  getSongs() {
    const storedSongsString = localStorage.getItem('Songs');
    let songs;
    if (storedSongsString) {
      songs = JSON.parse(storedSongsString);
    } else {
      songs = SONGS;
      localStorage.setItem('Songs', JSON.stringify(songs));
    }
    return songs;
  }

  storeSong(newSong: any) {
    const storedSongsString = localStorage.getItem('Songs');
    if (storedSongsString) {
      const storedSongs = JSON.parse(storedSongsString);
      storedSongs.push(newSong);
      localStorage.setItem('Songs', JSON.stringify(storedSongs));
    }
  }

  selectSong(song: any) {
    this.selectedSong.emit(song);
  }

  toggleFocus() {
    this._searchBarFocused.set(!this._searchBarFocused())
  }
}
