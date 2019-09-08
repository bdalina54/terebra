(function(w, d)
    {
        'use_strict';
        function _()
        {
            const terebra = {};
            terebra.id = (str) =>
            {
                str = String (str);
                let invalid_id = str.match(/[^#a-z0-9-_]/gmi); // a valid id #a-zA-Z-0-9-_
                if(!invalid_id)
                {
                    return d.getElementById( str.replace(/#/gm,'') );
                }
                else
                {
                    return terebra.qr(str);
                }
            };
            terebra.cl = (str) =>
            {
                let invalid_class = str.match(/[^.a-z0-9-_]/gmi); // a valid class .a-zA-Z-0-9-_
                if(str.indexOf('.') > 0 || invalid_class !==null )
                {
                    return terebra.qa(str);
                }
                else
                {
                    return d.getElementsByClassName( str.replace(/\./gm,'') );
                }
            };
            terebra.qr = (str) => { return d.querySelector(str); };
            terebra.qa = (str) => { return d.querySelectorAll(str); };
            terebra.ta = (str) =>
            {
                let invalid_tag = str.match(/[^a-z]/gmi); // a valid tag a-zA-Z
                if(!invalid_tag)
                {
                    return d.getElementsByTagName(str);
                }
                else
                {
                    return terebra.qa(str);
                }
            };
            terebra.version =
            {
            	name:"Terebra",
            	id:"1.0",
            	description : "Settings",
            	title:"Terebra Aciculina JS",
            	filename: "terebra-aciculina.js",
            	date :  "September 8, 2019 08:19pm"
            }
            terebra.author =
            {
            	name:"Bradley B. Dalina",
            	profession:"Senior System Engineer IV, Wordpress Fullstack Developer",
            	email:"bdalina54@gmail.com",
            	number:"(+63)9264482952",
            	url:"https://bdalina54.github.io/"
            }

            terebra.ready = function ready(callback=null)
            {
                w.onload = function()
                {
                    return ( callback ) ? callback() : void(0) ;
                }
            }

            //return function
            return terebra;
    };

    if(typeof (terebra) === 'undefined')
    {
        w.terebra = _();
    }
    else
    {
        console.log("Library already defined.");
    }

})(window, document);
