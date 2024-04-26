import { required, email, helpers, minLength } from '@vuelidate/validators';

export function useValidationRules() {
  const requiredWithMessage = helpers.withMessage('Заполните обязательные поля формы.', required);
  const emailWithMessage = helpers.withMessage('Некорректный формат электронной почты.', email);
  const positiveNumber = helpers.withMessage('Введите положительное число.', isNonNegativeNumber);
  const name = helpers.withMessage(
    'Имя не может содержать цифры и спецсимволы.',
    helpers.regex(/^(?!.*([- ][- ]|[- ]$|^[ -]))(([А-Яа-яÀ-ÿ -]+)|([A-Za-zÀ-ÿ -]+))$/)
  );
  const surname = helpers.withMessage(
    'Фамилия не может содержать цифры и спецсимволы.',
    helpers.regex(/^(?!.*([- ][- ]|[- ]$|^[ -]))(([А-Яа-яÀ-ÿ -]+)|([A-Za-zÀ-ÿ -]+))$/)
  );
  const password = helpers.withMessage(
    'Пароль должен составлять минимум 8 символов.',
    minLength(8)
  );

  function isNonNegativeNumber(value: number) {
    if (typeof value !== 'number' || isNaN(value)) {
      return false;
    }

    return value > 0;
  }

  return {
    required: requiredWithMessage,
    email: emailWithMessage,
    positiveNumber,
    password,
    name,
    surname,
  };
}
