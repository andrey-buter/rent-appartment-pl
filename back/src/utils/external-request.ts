import URL from "url";
import cheerio from "cheerio";
import http from "http";
import { CustomError } from "./error";

export class ExternalRequest {
    options;
    chunks;
    onResponceEnd;
    url;

    constructor( url, onResponceEnd ) {
        this.options = {
            // host: 'www.minsktrans.by',
            host: '',
            // path: '/mg/suburbt.php?find_runs=1&minsk=1&other=501227',
            path: '',
            port: 80,
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        this.chunks = [];

        this.onResponceEnd = onResponceEnd;
        this.url = this._parseUrl( url );

        this.setOptions( {
            path: this.url.path,
            host: this.url.host
        } );

    }
    setOptions(newOptions) {
        this.options = Object.assign(this.options, newOptions);
    }
    _parseUrl(url) {
        // see https://stackoverflow.com/questions/13506460/how-to-extract-the-host-from-a-url-in-javascript
        return URL.parse( url )
    }

    async request() {
        return new Promise( ( resolve, reject ) => {
            const httpReq = http.request( this.options, ( httpResp ) => {
                httpResp.setEncoding( 'utf8' );
                httpResp.on( 'data', ( chunk ) => this.chunks.push( chunk ) );
                httpResp.on( 'end', () => {
                    const $ = cheerio.load( this.chunks.join( '' ) );
                    const data = this.onResponceEnd( $, this.url );

                    data instanceof Error ? reject( data ) : resolve( data );
                } );
            } );
            httpReq.end();
            httpReq.on( 'error', ( err ) => {
                reject( new CustomError( err, `Host ${err['host']} is not available` ) );
            } )
        } );
    }
}
