import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';

import {MailService} from '../MailService/mail.service';

import {Mail} from '../MailObjInterface/mail-obj.interface';

@Injectable()
export class ViewMailResolveService implements Resolve<Mail> {
  constructor(private mailService: MailService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Promise<Mail>|Promise<boolean> {
    let id = route.params['id'];
    return this.mailService.getMail(id).then(mail => {
      if (mail) {
        return mail;
      } else {
        this.router.navigate(['/mail']);
        return false;
      }
    });
  }
}
