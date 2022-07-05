import React from "react";
import Phims from"./Phim/body"
export default class Phim extends React.PureComponent{

    render(){
        const search = (window.location.href).split('/');
        const concatid=search[search.length-1].split('.')
        const EpisodeNumber=concatid[0]
        const IdServer=search[search.length-2]
        const idAnime=search[search.length-3]
        return(
            <>
            
            <Phims idAnime={idAnime} IdServer={IdServer} EpisodeNumber={EpisodeNumber}/>

            </>
        );
    }
}