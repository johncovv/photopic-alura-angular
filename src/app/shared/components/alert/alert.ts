export class Alert {
	constructor(public alertType: AlertType, public readonly message: string) {}
}

// eslint-disable-next-line no-shadow
export enum AlertType {
	SUCCESS,
	WARNING,
	DANGER,
	INFO,
}
