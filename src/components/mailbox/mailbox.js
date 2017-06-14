
import MailboxComponent from './mailbox.component';
import MailEntryComponent from './mail-entry/mail-entry.component';


let mailboxModule = angular.module('mailbox', [])
    .component('mailbox', MailboxComponent)
    .component('mailEntry', MailEntryComponent)
    .name;

export default mailboxModule;