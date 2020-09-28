import { NzConfig } from 'ng-zorro-antd/core/config';
import { autoTips } from '@shared/validators';

export const ngZorroConfig: NzConfig = {
  form: {
    nzAutoTips: autoTips
  },
  message: {
    nzDuration: 3000
  }
};
