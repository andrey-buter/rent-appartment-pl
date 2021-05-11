import URL from "url";
import cheerio from "cheerio";
import https from "https";
import { CustomError } from "./error";

export class ExternalRequest {
    options = {
        // host: 'www.minsktrans.by',
        host: '',
        // path: '/mg/suburbt.php?find_runs=1&minsk=1&other=501227',
        path: '',
        port: 80,
        method: 'GET',
        protocol: 'https:',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    chunks = [];

    constructor( private url: string, private onResponseEnd ) {}

    setOptions(newOptions) {
        return Object.assign(this.options, newOptions);
    }
    _parseUrl(url) {
        // see https://stackoverflow.com/questions/13506460/how-to-extract-the-host-from-a-url-in-javascript
        return URL.parse( url )
    }

    async request() {
        return new Promise( ( resolve, reject ) => {
            // const options = this.getOptions();
            const httpReq = https.request( this.url, ( httpResp ) => {
                httpResp.setEncoding( 'utf8' );
                httpResp.on( 'data', ( chunk ) => this.chunks.push( chunk ) );
                httpResp.on( 'end', () => {
                    const $ = cheerio.load( this.chunks.join( '' ) );
                    const data = this.onResponseEnd( $, this.url );

                    data instanceof Error ? reject( data ) : resolve( data );
                } );
            } );
            httpReq.end();
            httpReq.on( 'error', ( err ) => {
                reject( new CustomError( err, `Host ${err['host']} is not available` ) );
            } )
        } );
    }

    private getOptions() {
        const url = this._parseUrl( this.url );

        return this.setOptions( {
            path: url.path,
            host: url.host
        } );
    }
}
