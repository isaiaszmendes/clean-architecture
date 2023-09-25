export type NotificationError = {
	message: string;
	context: string;
}

export class Notification {
	private errors: NotificationError[] = [];

	addError(error: NotificationError): void {
		this.errors.push(error);
	}

	messages(context: string): string {
		const messages = this.errors
			.filter(error => error.context === context)
			.map(error => error.message)
			.join(',');

		return `${context}: ${messages},`;
	}
}