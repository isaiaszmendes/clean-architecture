import { Notification } from './notification';

describe('Unit Test Notification', () => {
	it('should create erros', () => {
		const notification = new Notification();

		const error = {
			message: 'error message',
			context: 'customer'
		};

		notification.addError(error);

		expect(notification.messages('customer')).toEqual('customer: error message');


		const error2 = {
			message: 'error message2',
			context: 'customer'
		};

		notification.addError(error2);
		expect(notification.messages('customer')).toEqual('customer: error message,customer: error message2');

		const error3 = {
			message: 'error message3',
			context: 'order'
		};

		notification.addError(error3);
		expect(notification.messages('customer')).toEqual('customer: error message,customer: error message2');

		expect(notification.messages('order')).toEqual('order: error message3');

		expect(notification.messages()).toEqual('customer: error message,customer: error message2,order: error message3');

	});
});
