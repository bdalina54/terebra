class terebra
{
	constructor(parent=null, child=null, ignore=null, button=null)
	{
		if(parent===null)
		{
			this.parent = parent;
			this.child = child;
			this.ignore = ignore;
			this.button =button;
		}
		else if(Array.isArray(parent))
		{
			this.parent = parent[0];
			this.child = parent[1];
			this.ignore = parent[2];
			this.button =parent[3];
		}
		else if(typeof parent == 'string')
		{
			this.parent = parent;
			this.child = child;
			this.ignore = ignore;
			this.button = button;
		}
		else if(Object.keys(parent) && typeof parent === "object")
		{
			this.parent = parent.parent;
			this.child = parent.child;
			this.ignore = parent.ignore;
			this.button = parent.button;
		}
		else if(Object.keys(parent[0]) && typeof parent === "object" )
		{
			this.parent = parent[0].parent;
			this.child = parent[0].child;
			this.ignore = parent[0].ignore;
			this.button = parent[0].button;
		}

		this.version =
					{
						name:"Terebra Achates",
						id:"1.0",
						description : "Centralized form validation in a single ajax request template",
						title:"Terebra JS",
						filename: "terebra.js",
						date :  "May 23, 2019 2:00pm"
					}
		this.author =
					{
						name:"Bradley B. Dalina",
						profession:"Senior System Engineer IV, Wordpress Fullstack Developer",
						email:"bdalina54@gmail.com",
						number:"(+63)9264482952",
						url:"https://www.bradley-dalina.tk/"
					}
		this.settings =
					{
						"type":"POST",
						"url": "/",
						"async": true,
						"dataType":"json",
						"data": [],
						"crossDomain":true,
						"beforeSend": null,
						"enctype": null,//'multipart/form-data',
						"cache": false,
						"contentType": 'application/x-www-form-urlencoded; charset=UTF-8',
						"processData": true
					}
		this.active=null;
		this.done=null;
		this.fail=null;
		this.complete=null;
	}

	fn_settings(settings)
	{
		/*
		=================================================
		Settings updater
		=================================================
		*/
		if(settings.length > 0)
		{
			let to_add = Object.keys(settings);
			for(let x=0; x < to_add.length; x++)
			{
				this.settings[to_add[x]]=settings[to_add[x]];
			}
		}
	}

	fn_request(active=null, done =null, fail=null, complete=null)
	{
		/*
		=================================================
		Centralized ajax request
		=================================================
		*/
		active = (active!=null) ? active : this.active;
		done = (done!=null) ? done : this.done;
		fail= (fail!=null) ? fail : this.fail;
		complete =(complete!=null) ? complete : this.complete;

		this.settings['beforeSend']=active;

		$.ajax(this.settings)
		.done(function(data,status, settings)
		{
			if(done!=null)
			{
				return done(data);
			}
			else
			{
				console.group('Server Request - Result');
				console.info(data);
				console.info(status);
				console.info(settings);
				console.groupEnd();
			}
		})
		.fail(function(settings, status, error)
		{
			if(fail!=null)
			{
				return fail();
			}
			else
			{
				console.error("An error occur, with a status of "+status+" at "+ this.url+ " "+error);
			}
		})
		.always(function(settings, status, error)
		{
			if(complete!=null)
			{
				return complete();
			}
		});
	}

	fn_timeout(ms, callback=null)
    {
		/*
		=================================================
		Timeout or delay function
		=================================================
		*/
		return new Promise(function(resolve, reject)
		{
            setTimeout(function() {
                (callback) ? callback() : '';
            }, ms);
        });
    }

	fn_autoClose(timeout=0, callback=null)
    {
		/*
		=================================================
		Auto close modal form
		=================================================
		*/
        return new Promise(function(resolve, reject)
		{
            setTimeout(function() {
                (callback) ? callback() : '';
            }, timeout);
        });
	}

	fn_oninput(el=null)
    {
		/*
		=================================================
		On input event reset input field border and value
		=================================================
		*/
        if(el)
        {
            $(document).on("input", el , function(e)
            {
                $(this).css('border','');
            });
        }
        else
        {
            if(typeof this.child =='string')
            {
                this.fn_oninput(this.child);
            }
            else
            {
                for(let i =0; i < this.child.length; i++)
                {
                    this.fn_oninput(this.child[i]);
                }
            }
        }
    }

	fn_reset(el=null)
    {
		/*
		=================================================
		On reset form inputs field border and values
		=================================================
		*/
		let ignore =this.ignore;
        if(el)
        {
            $(this.parent).find(el).each(function()
            {
                if( $(this).prop("tagName") != 'button' && $(this).attr('type') !='submit')
                {

                    if($(this)[0] !== $(ignore)[0])
                    {
						if( $(this).prop("tagName") != 'select' || $(this).attr("type") != 'checkbox' || $(this).attr("type") != 'radio' )
						{
							$(this).val('').css('border','');
						}
						// console.group('Comparison');
						// console.log($(this)[0]);
						// console.log($(ignore)[0]);
						// console.groupEnd();
                    }
                }
            });
        }
        else
        {
            if(typeof this.child =='string')
            {
                this.fn_reset(this.child);
            }
            else
            {
                for(let i =0; i < this.child.length; i++)
                {
                    this.fn_reset(this.child[i]);
                }
            }
        }
    }

	fn_focus(el=null)
    {
		/*
		=================================================
		On focus input field event
		=================================================
		*/
        if(el)
        {
            $(this.parent).find(el).each(function()
            {
                if( $(this).prop("tagName") != 'button' && $(this).attr('type') !='submit')
                {
                    if( $(this).val() === '' || $(this).val() === 0 || $(this).val() === '0' )
                    {
                        $(this).focus();
                        return false;
                    }
                }
            });
        }
        else
        {
            if(typeof this.child =='string')
            {
                this.fn_focus(this.child);
            }
            else
            {
                for(let i =0; i < (this.child).length; i++)
                {
                    this.fn_focus(this.child[i]);
                }
            }
        }
    }

	fn_lazyload( el, message )
    {
		/*
		=================================================
		Lazy load on request
		=================================================
		*/
        let tagname = $(el).prop('tagName');
        let old_elem = $(el);
        let old_message= $(el).html();
        let old_attr =[];
        $(el).each(function()
        {
              $.each(this.attributes, function()
              {
                    if(this.specified)
                    {
                      old_attr.push({ [this.name] : this.value});
                    }
              });
        });

        old_attr = JSON.stringify(old_attr).replace(/{|}|\[|\]|,/g,'');
        old_attr = old_attr.replace(/"/g,' ');
        old_attr = old_attr.replace(/:/g,'=');

        $(el).empty().append('<span><img src="'+site_url+'system/assets/images/loading.gif" style="display:inline; width:25px; margin-right:15px;"/> <small>'+message+'...</small></span>');
        this.fn_timeout( 2000, function(){ $(el).fadeOut(1200, function(){ $(el).replaceWith( "<"+tagname+" "+old_attr+">"+old_message+"</"+tagname+">" ); }); });
    }

	fn_click(callback)
    {
		/*
		=================================================
		Trigger on click event
		=================================================
		*/
        $(document).on("click", this.button, callback);
    }

    fn_submit()
    {
		/*
		=================================================
		Trigger submit form
		=================================================
		*/
        $(this.parent).submit();
    }

	fn_validEmail(email)
    {
		/*
		=================================================
		Email validator
		=================================================
		*/
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    fn_validUrl(url)
    {
		/*
		=================================================
		URL validator
		=================================================
		*/
		const res = new RegExp('^((ft|htt)ps?:\\/\\/)?'+ // protocol
						'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
						'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
						'(\\:\\d+)?(\\/[-a-z\\d%_@.~+]*)*'+ // port and path
						'((\\?|\\#)[:;&a-z\\d%_.~+=\\/-]*)?'+ // query string
						'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
						return res.test(String(url));
    }

	fn_validate(callback=null)
    {
		/*
		=================================================
		Validate form input fields
		=================================================
		*/
		let formdata = [];
		let filedata =[];
		let first_empty=null;
		let partial=null;
		let count=0;

		let validEmail = this.fn_validEmail;
		let validUrl = this.fn_validUrl;

        if(typeof this.child =='string')
        {
			$(this.parent).find(this.child).each(function()
			{
				if( $(this).prop("tagName") != 'button' && $(this).attr('type') !='submit')
				{
					if($(this).attr('required'))
					{
						if($(this).prop("type").toLowerCase() =='number')
						{
							if( ($(this).val()).trim() != 0 && ($(this).val()).trim() != '0' && ($(this).val()).trim().length > 0)
							{
								$(this).css('border','');
							}
							else
							{
								$(this).val('').css({'border' : 'solid 1px #ff0000'});
								if(!first_empty)
								{
									first_empty = $(this);
								}
							}
						}
						else if($(this).prop("type").toLowerCase() =='email')
						{
							if( validEmail( $(this).val() ) )
							{
								$(this).css('border','');
							}
							else
							{
								$(this).val('').css({'border' : 'solid 1px #ff0000'});
								if(!first_empty)
								{
									first_empty = $(this);
								}
							}
						}
						else if($(this).prop("type").toLowerCase() =='url' )
						{
							if(validUrl( $(this).val() ) )
							{
								$(this).css('border','');
							}
							else
							{
								$(this).val('').css({'border' : 'solid 1px #ff0000'});
								if(!first_empty)
								{
									first_empty = $(this);
								}
							}
						}
						else if( ($(this).val()).trim() === '' || ($(this).val()).trim().length === 0 )
						{
							$(this).css({'border' : 'solid 1px #ff0000'});
							if(!first_empty)
							{
								first_empty = $(this);
							}
						}
						else
						{
							$(this).css('border','');
						}
					}
					else
					{
						if($(this).prop("type").toLowerCase() =='email' )
						{
							if( ($(this).val()).trim() != '' || ($(this).val()).trim().length > 0  )
							{
								if( validEmail( $(this).val() ) )
								{
									$(this).css('border','');
								}
								else
								{
									$(this).val('').css({'border' : 'solid 1px #ff0000'});
									if(!first_empty)
									{
										first_empty = $(this);
									}
								}
							}
						}
						else if($(this).prop("type").toLowerCase() =='url' )
						{
							if( ($(this).val()).trim() != '' || ($(this).val()).trim().length > 0  )
							{
								if( validUrl( $(this).val() ) )
								{
									$(this).css('border','');
								}
								else
								{
									$(this).val('').css({'border' : 'solid 1px #ff0000'});
									if(!first_empty)
									{
										first_empty = $(this);
									}
								}
							}
						}
					}
					if( $(this).prop("tagName") =='select')
					{
						formdata.push({'name':$(this).attr('name'), 'value': $(this, 'option:selected').val()});
					}
					else if( $(this).attr('type') =='checkbox')
					{
						if($(this).is(':checked'))
						{
							formdata.push({'name':$(this).attr('name'), 'value': $(this).val()});
						}
					}
					else if( $(this).attr('type') =='radio')
					{
						if($(this).is(':checked'))
						{
							formdata.push({'name':$(this).attr('name'), 'value': $(this).val()});
						}
					}
					else if( $(this).attr('type') =='file')
					{
						if( document.getElementById($(this).attr('id')).files.length > 0 )
						{
							filedata.push({'name':$(this).attr('name'), 'id':$(this).attr('id')});
						}
					}
					else
					{
						formdata.push({'name': $(this).attr('name'), 'value': $(this).val()});
					}
				}
			});
		}
		else
		{
			for( let i =0; i < this['child'].length; i++)
			{
				$(this.parent).find(this.child[i]).each(function()
                {
                    if( $(this).prop("tagName") != 'button' && $(this).attr('type') !='submit')
                    {
                        if($(this).attr('required'))
                        {
							if($(this).prop("type").toLowerCase() =='number')
							{
								if( ($(this).val()).trim() != 0 && ($(this).val()).trim() != '0' && ($(this).val()).trim().length > 0)
								{
									$(this).css('border','');
								}
								else
								{
									$(this).val('').css({'border' : 'solid 1px #ff0000'});
									if(!first_empty)
									{
										first_empty = $(this);
									}
								}
							}
							else if($(this).prop("type").toLowerCase() =='email')
							{
								if( validEmail( $(this).val() ) )
								{
									$(this).css('border','');
								}
								else
								{
									$(this).val('').css({'border' : 'solid 1px #ff0000'});
									if(!first_empty)
									{
										first_empty = $(this);
									}
								}
							}
							else if($(this).prop("type").toLowerCase() =='url' )
							{
								if(validUrl( $(this).val() ) )
								{
									$(this).css('border','');
								}
								else
								{
									$(this).val('').css({'border' : 'solid 1px #ff0000'});
									if(!first_empty)
									{
										first_empty = $(this);
									}
								}
							}
							else if( ($(this).val()).trim() === '' || ($(this).val()).trim().length === 0 )
							{
								$(this).css({'border' : 'solid 1px #ff0000'});
								if(!first_empty)
								{
									first_empty = $(this);
								}
							}
							else
							{
								$(this).css('border','');
							}
                        }
						else
						{
							if($(this).prop("type").toLowerCase() =='email' )
							{
								if( ($(this).val()).trim() != '' || ($(this).val()).trim().length > 0  )
								{
									if( validEmail( $(this).val() ) )
									{
										$(this).css('border','');
									}
									else
									{
										$(this).val('').css({'border' : 'solid 1px #ff0000'});
										if(!first_empty)
										{
											first_empty = $(this);
										}
									}
								}
							}
							else if($(this).prop("type").toLowerCase() =='url' )
							{
								if( ($(this).val()).trim() != '' || ($(this).val()).trim().length > 0  )
								{
									if( validUrl( $(this).val() ) )
									{
										$(this).css('border','');
									}
									else
									{
										$(this).val('').css({'border' : 'solid 1px #ff0000'});
										if(!first_empty)
										{
											first_empty = $(this);
										}
									}
								}
							}
						}

						if( $(this).prop("tagName") =='select')
						{
							formdata.push({'name':$(this).attr('name'), 'value': $(this, 'option:selected').val()});
						}
						else if( $(this).attr('type') =='checkbox')
						{
							if($(this).is(':checked'))
							{
								formdata.push({'name':$(this).attr('name'), 'value': $(this).val()});
							}
						}
						else if( $(this).attr('type') =='radio')
						{
							if($(this).is(':checked'))
							{
								formdata.push({'name':$(this).attr('name'), 'value': $(this).val()});
							}
						}
						else if( $(this).attr('type') =='file')
						{
							if( document.getElementById($(this).attr('id')).files.length > 0 )
							{
								filedata.push({'name':$(this).attr('name'), 'id':$(this).attr('id')});
							}
						}
						else
						{
							formdata.push({'name': $(this).attr('name'), 'value': $(this).val()});
						}
                    }
                });
            }
		}

		if(first_empty)
		{
			formdata =[];
			filedata =[];
			first_empty.focus().val('');
			first_empty=null;
			return false;
		}
		else
		{
			if(callback)
			{
				callback();
			}
			first_empty=null;
			if(filedata.length > 0)
			{
				  var fd = new FormData();
                  for(let i =0; i < formdata.length; i++)
                  {
                      fd.append(formdata[i].name, formdata[i].value);
                  }
				  for(let i =0; i < filedata.length; i++)
                  {
						let attachments = document.getElementById(filedata[i].id).files;
						let files = attachments;
						// Loop through each of the selected files.
						for (let x = 0; x < files.length; x++)
						{
							let file = files[x];
							// Add the file to the request.
							fd.append(filedata[i].name, file, file.name);
						}
				  }

				  this.settings['enctype']='multipart/form-data';
				  this.settings['cache']=false;
				  this.settings['contentType']=false;
				  this.settings['processData']=false;
				  filedata= [];
				  return fd;
			  }
			return formdata;
		}
    }
}
