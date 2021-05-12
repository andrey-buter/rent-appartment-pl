import { OlxParser } from '../parsers/olx/olx.parser';
import { Router } from "express";
import { ExternalRequest } from "../utils/external-request"

const router = Router();

router.get( '/get/:path', async ( request, responce, next ) => {
    const path = decodeURIComponent(request.params.path)
        // remove all html tags
        // https://stackoverflow.com/questions/5002111/how-to-strip-html-tags-from-string-in-javascript
        .replace( /<\/?[^>]+(>|$)/g, "" )
        // remove all spaces
        // https://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text
        .replace( / /g, '' );

    const parser = new OlxParser();

    const extRequest = new ExternalRequest( path, ( $ ) => {
        parser.setDOM( $ );
        return parser.getPageItems();
    });
    const data = await extRequest.request();

    // allow request from any domain
    responce.header( 'Access-Control-Allow-Origin', '*' );
    responce.json( data );
} );

router.get('/*', (req, res) => {
    // res.sendFile( path.join( __dirname,  '../frontend/dist/schedule/index.html'));
    res.json('page loaded');
});

export default router;
