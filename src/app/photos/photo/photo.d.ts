export default interface IPhoto {
	id: number;
	url: string;
	description: string;
	allowComments: boolean;
	comments: number;
	likes: number;
	postData: Date;
	userId: number;
}

export interface IPhotoUpload {
	description: string;
	allowComments: boolean;
	imageFile: File;
}
