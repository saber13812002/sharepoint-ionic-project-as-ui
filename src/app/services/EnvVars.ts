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
            let query = '';
            if (relative == 'form')
                query = '?$select=Title,Editor/Title,Author/Title&$expand=Editor/Id,Author/Id';
            return environment.listIds.subsite + `/_api/Lists(guid'${environment.listIds[relative]}')/Items` + query;
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