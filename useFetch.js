import React, { useEffect, useRef, useState } from 'react'

export const useFetch = ( url ) => {

     const isMounted = useRef(true);

     useEffect(() => {
        console.log('creado');
         //no hacemos nada cuando se crea, solo cuando se desmonta
         return () => {
             console.log('no creado')
             isMounted.current = false;
         }
     },[])

    const [state, setState] = useState({data:null, loading:true, error:null});

    useEffect(() => {

        setState({data:null, loading:true, error:null});
        
        fetch ( url )
            .then( resp => resp.json())
            .then( data => {

                //reviso que el componente este renderizado, en dado caso ya no esta 
                //renderizado se usa el EFFECT para desmontar lo siguiente y que no de 
                // error.

                if (isMounted.current) {
                    
                    setState({
                        ...state,
                        loading:false,
                        data
                    })
                    
                }


            });
    }, [url])

    return state;
    
}
