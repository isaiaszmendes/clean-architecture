export type NotificationError = {
	message: string;
	context: string;
}

export class Notification {
	private errors: NotificationError[] = [];

	addError(error: NotificationError): void {
		this.errors.push(error);
	}

	messages(context?: string): string {
		return this.errors
			.filter(error => error.context === context || context === undefined)
			.map(error => `${error.context}: ${error.message}`)
			.join(',');
	}
}