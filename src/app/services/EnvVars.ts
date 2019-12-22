import { environment } from 'src/environments/environment';

export class EnvVars {

    constructor() {
    }

    get formEndpoint() {
        let endpoint = environment.listIds.subsite + `/_api/Lists(guid'${environment.listIds.form1}')/Items`;
        return endpoint;
    }

    get ostanEndpoint() {
        let endpoint = environment.listIds.subsite + `/_api/Lists(guid'${environment.listIds.ostan}')/Items`;
        return endpoint;
    }


    abs(relative) {
        if (environment.listIds[relative]) {
            return environment.listIds.subsite + `/_api/Lists(guid'${environment.listIds[relative]}')/Items`;
        } else {
            return environment.listIds.subsite;
        }
    }

    list(relative) {
        if (environment.listName[relative]) {
            return environment.listName[relative] + 'ListItem';
        }
        return relative + 'ListItem';
    }
}