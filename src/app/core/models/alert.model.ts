import { AlertType } from '@/shared/constants/alert-type.enum';

export interface Alert {
  type: AlertType;
  message: string;
}
