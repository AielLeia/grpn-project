import React from 'react';
import Message from '../../Message'


export default class EnvoyerMessage extends React.Component{
    constructor(props)
    {
        super(props);

        if(localStorage.getItem('userInfo')==null)
        {
         this.props.history.push('/connexion')
        }

       
    }

    
    render(){
return (<div>
<Message/>
</div>
)
    }


    }