import { Component, output, OutputEmitterRef, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-form',
  imports: [FormsModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.css',
})
export class AddForm {
  private readonly emptySong: any = {
    title: '',
    artist: '',
    favorite: false,
    description: '',
    mp3Url: '',
    cover: '',
  };

  private _newSong: WritableSignal<any> = signal({...this.emptySong});

  public formSent: OutputEmitterRef<any> = output();
  public hideForm: OutputEmitterRef<boolean> = output();


  get newSong() {
    return this._newSong.asReadonly();
  }

  handleFormSubmit() {
    this.formSent.emit({...this.newSong()})
    this.eraseForm()

  }

  eraseForm() {
    this._newSong.set({...this.emptySong})
  }

  cancel() {
    this.hideForm.emit(true)
    this.eraseForm()
  }
}
