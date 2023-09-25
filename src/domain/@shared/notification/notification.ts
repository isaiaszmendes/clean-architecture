export type NotificationErrorProps = {
	message: string;
	context: string;
}

export class Notification {
	private errors: NotificationErrorProps[] = [];

	getErrors(): NotificationErrorProps[] {
		return this.errors;
	}

	addError(error: NotificationErrorProps): void {
		this.errors.push(error);
	}

	messages(context?: string): string {
		return this.errors
			.filter(error => error.context === context || context === undefined)
			.map(error => `${error.context}: ${error.message}`)
			.join(',');
	}

	hasErrors(): boolean {
		return this.errors.length > 0;
	}
}