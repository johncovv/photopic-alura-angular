import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UserService } from '../../core/user/user.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
	templateUrl: './photo-form.component.html',
	styleUrls: ['./photo-form.component.less'],
	host: {
		class: 'container pt-3',
	},
})
export class PhotoFormComponent implements OnInit, AfterViewInit {
	@ViewChild('descriptionInput') fileInput!: ElementRef<HTMLInputElement>;

	photoForm!: FormGroup;
	preview!: string;
	file!: File;

	percentDone: number = 0;

	constructor(
		private formBuilder: FormBuilder,
		private photoService: PhotoService,
		private router: Router,
		private alertService: AlertService,
		private userService: UserService,
	) {}

	ngOnInit(): void {
		this.photoForm = this.formBuilder.group({
			file: ['', Validators.required],
			description: ['', Validators.maxLength(300)],
			allowComments: [true],
		});
	}

	ngAfterViewInit(): void {
		this.fileInput.nativeElement.focus();
	}

	handleConvertFileToBase64(file: File): void {
		const reader = new FileReader();

		reader.onloadend = ({ target }) => {
			this.preview = target?.result as string;
		};

		reader.readAsDataURL(file);
	}

	handleFile(inputFile: EventTarget | null) {
		// fixing typing and getting first file
		const file = (((inputFile as HTMLInputElement)
			.files as unknown) as Array<File>)[0];

		this.file = file;

		this.handleConvertFileToBase64(file);
	}

	upload(): void {
		const description = this.photoForm.get('description')?.value as string;
		const allowComments = this.photoForm.get('allowComments')?.value as boolean;
		const imageFile = this.file;

		const datas = { description, allowComments, imageFile };

		this.photoService
			.upload(datas)
			.pipe(
				// when finished, having an error or not, navigate to the timeline
				finalize(() => {
					this.router.navigate(['/user', this.userService.getUserName()]);
				}),
			)
			.subscribe(
				(event) => {
					if (event.type === HttpEventType.UploadProgress) {
						this.percentDone = Math.round(
							(100 * event.loaded) / (event.total as number),
						);
					} else if (event instanceof HttpResponse) {
						this.alertService.success(
							'The photo was successfully uploaded!',
							true,
						);
					}
				},
				(err) => {
					this.alertService.danger(
						'Error trying to upload the photo, Try again later!',
						true,
					);
					console.error('FILE UPLOAD ERROR:', err);
				},
			);
	}
}
