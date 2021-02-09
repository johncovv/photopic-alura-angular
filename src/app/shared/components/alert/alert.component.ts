import { Component, Input } from '@angular/core';

import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.less'],
})
export class AlertComponent {
	@Input() timeout: number = 3000;

	alerts: Array<Alert> = [];

	constructor(private alertService: AlertService) {
		this.alertService.getAlert().subscribe((alert) => {
			if (!alert) {
				this.alerts = [];

				return;
			}

			this.alerts.push(alert);

			setTimeout(() => this.removeAlert(alert), this.timeout);
		});
	}

	getAlertClass(alert: Alert): string | undefined {
		if (!alert) return;

		switch (alert.alertType) {
			case AlertType.DANGER:
				return 'alert-danger';
			case AlertType.INFO:
				return 'alert-info';
			case AlertType.SUCCESS:
				return 'alert-success';
			case AlertType.WARNING:
				return 'alert-warning';
		}
	}

	removeAlert(alertToRemove: Alert) {
		this.alerts = this.alerts.filter((alert) => alert !== alertToRemove);
	}
}
