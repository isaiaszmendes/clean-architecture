import { ValidatorInterface } from '../../@shared/validator/validator.interface';
import { Address } from '../value-object/Address';
import * as yup from 'yup';

export class AddressYupValidator implements ValidatorInterface<Address> {
	validator(entity: Address): void {
		try {
			yup
				.object()
				.shape({
					street: yup.string().required('Street is required'),
					number: yup.number().required('Number is required'),
					city: yup.string().required('City is required'),
					zip: yup.string().required('Zip is required'),
				}).validateSync({
					street: entity.street,
					number: entity.number,
					city: entity.city,
					zip: entity.zip,
				}, { abortEarly: false });
		} catch (error) {
			const e = error as yup.ValidationError;
			e.errors.forEach((error) => {
				entity.notification.addError({
					context: 'customer',
					message: error,
				});
			});
		}
	}
}