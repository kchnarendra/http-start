import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { map, catchError } from 'rxjs/operators';
import { throwError} from "rxjs";

@Injectable()
export class ServerService {
    constructor(private http: Http) {}

    storeServers(servers: any[]) {
        const headers = new Headers({'Content-Type': 'application/json'});
        //return this.http.post('https://test-two-db.firebaseio.com/data.json', servers, {headers: headers});
        return this.http.put('https://test-two-db.firebaseio.com/data.json', servers, {headers: headers});
    }

    getServers() {
        //return this.http.get('https://test-two-db.firebaseio.com/data.json')
        return this.http.get('https://test-two-db.firebaseio.com/')     
            .pipe(
                map(
                    (response: Response) => {
                        const data = response.json();
                        for(const server of data) {
                            server.name = 'FETCHED_' + server.name;
                        }
                        return data;
                    }
                ),  
                catchError(
                    (error: Response) => {
                        return throwError('Something Went Wrong!!!'); 
                    }
                )  
            );
    }

    getAppName() {
        return this.http.get('https://test-two-db.firebaseio.com/data/appName.json')
            .pipe(
                map(
                    (response: Response) => {
                        return response.json();
                    }
                )
            );
    }
}
