import { PaymentIntentContext } from './model';
import contextDescriptions from './context-descriptions.json';

export const getDisplayName = (firstName: string, lastName: string): string => {
  firstName = firstName.trim();
  lastName = lastName.trim();
  return `${firstName.substr(0, 1).toUpperCase()}${firstName.substring(1)} ${lastName
    .substr(0, 1)
    .toUpperCase()}${lastName.substring(1)}`;
};

export const getIdempotencyKey = (primaryKey: string, secondaryKey: string, operation: string): string => {
  return `${primaryKey}-${secondaryKey}-${operation}`;
};

export const getContextDescription = (context: PaymentIntentContext): string => {

  return contextDescriptions[context];
};
