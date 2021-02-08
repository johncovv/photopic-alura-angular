import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { mergeMap, switchMap, tap, toArray } from 'rxjs/operators';

import { IPhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
	selector: 'app-photo-comments',
	templateUrl: './photo-comments.component.html',
	styleUrls: ['./photo-comments.component.less'],
})
export class PhotoCommentsComponent implements OnInit {
	@Input() photoId!: number;

	comments!: Array<IPhotoComment>;
	commentForm!: FormGroup;

	constructor(
		private photoService: PhotoService,
		private formBuild: FormBuilder,
	) {}

	ngOnInit(): void {
		this.photoService.getComments(this.photoId).subscribe((comments) => {
			this.comments = comments.reverse();
		});

		this.commentForm = this.formBuild.group({
			comment: ['', [Validators.required, Validators.maxLength(300)]],
		});
	}

	save() {
		const comment = this.commentForm.get('comment')?.value as string;

		this.photoService
			.addComment(this.photoId, comment)
			.subscribe((newComment) => {
				this.comments = [...this.comments, newComment];
				this.commentForm.reset();
			});
	}
}
