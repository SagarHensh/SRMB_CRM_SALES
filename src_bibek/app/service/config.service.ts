import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  API_ROOT = environment.API_ROOT;
  SECRECT = environment.SECRECT;
  LOCAL_SECRECT = environment.LOCAL_SECRECT;
  IMAGE_PATH = environment.UPLOAD_IMAGE_BASE_PATH;
  DASHBOARD_API_ROOT = environment.DASHBOARD_API_ROOT;
  SFA_API_ROOT = environment.SFA_API_ROOT;
  constructor() { }
}
