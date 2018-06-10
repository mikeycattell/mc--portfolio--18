(function(){var t;t=function(){function t(t,e){var o,i;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(o in t)i=t[o],this.options[o]=i;this.context=null!=e?e:this,this.unique=this._genKey()}return t.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&this.context.nextUrl.length>0},t.prototype.next=function(){return!!this.hasNext()&&this.run(this.context.nextUrl)},t.prototype.run=function(e){var o,i,n;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&(n=document.createElement("script"),n.id="instafeed-fetcher",n.src=e||this._buildUrl(),o=document.getElementsByTagName("head"),o[0].appendChild(n),i="instafeedCache"+this.unique,window[i]=new t(this.options,this),window[i].unique=this.unique),!0},t.prototype.parse=function(t){var e,o,i,n,r,s,a,p,l,c,h,u,d,f,m,g,y,w,b,k,_,I,E,v,x,N,B,T,j,C,O,U,q;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(O="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"),C="least"===O[0],O[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",C);break;case"liked":t.data=this._sortBy(t.data,"likes.count",C);break;case"commented":t.data=this._sortBy(t.data,"comments.count",C);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&!1===this.options.mock){if(g=t.data,j=parseInt(this.options.limit,10),null!=this.options.limit&&g.length>j&&(g=g.slice(0,j)),a=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(g=this._filter(g,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(l="",f="",k="",q=document.createElement("div"),h=0,x=g.length;h<x;h++){if(u=g[h],"object"!=typeof(d=u.images[this.options.resolution]))throw s="No image found for resolution: "+this.options.resolution+".",new Error(s);_=d.width,w=d.height,b="square",_>w&&(b="landscape"),_<w&&(b="portrait"),m=d.url,c=window.location.protocol.indexOf("http")>=0,c&&!this.options.useHttp&&(m=m.replace(/https?:\/\//,"//")),f=this._makeTemplate(this.options.template,{model:u,id:u.id,link:u.link,type:u.type,image:m,width:_,height:w,orientation:b,caption:this._getObjectProperty(u,"caption.text"),likes:u.likes.count,comments:u.comments.count,location:this._getObjectProperty(u,"location.name")}),l+=f}for(q.innerHTML=l,n=[],i=0,o=q.childNodes.length;i<o;)n.push(q.childNodes[i]),i+=1;for(E=0,N=n.length;E<N;E++)T=n[E],a.appendChild(T)}else for(v=0,B=g.length;v<B;v++){if(u=g[v],y=document.createElement("img"),d=u.images[this.options.resolution],"object"!=typeof d)throw s="No image found for resolution: "+this.options.resolution+".",new Error(s);m=d.url,c=window.location.protocol.indexOf("http")>=0,c&&!this.options.useHttp&&(m=m.replace(/https?:\/\//,"//")),y.src=m,!0===this.options.links?(e=document.createElement("a"),e.href=u.link,e.appendChild(y),a.appendChild(e)):a.appendChild(y)}if("string"==typeof(U=this.options.target)&&(U=document.getElementById(U)),null==U)throw s='No element with id="'+this.options.target+'" on page.',new Error(s);U.appendChild(a),p=document.getElementsByTagName("head")[0],p.removeChild(document.getElementById("instafeed-fetcher")),I="instafeedCache"+this.unique,window[I]=void 0;try{delete window[I]}catch(t){r=t}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},t.prototype._buildUrl=function(){var t,e,o;switch(t="https://api.instagram.com/v1",this.options.get){case"popular":e="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");e="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");e="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");e="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return o=t+"/"+e,null!=this.options.accessToken?o+="?access_token="+this.options.accessToken:o+="?client_id="+this.options.clientId,null!=this.options.limit&&(o+="&count="+this.options.limit),o+="&callback=instafeedCache"+this.unique+".parse"},t.prototype._genKey=function(){var t;return""+(t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)})()+t()+t()+t()},t.prototype._makeTemplate=function(t,e){var o,i,n,r,s;for(i=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,o=t;i.test(o);)r=o.match(i)[1],s=null!=(n=this._getObjectProperty(e,r))?n:"",o=o.replace(i,function(){return""+s});return o},t.prototype._getObjectProperty=function(t,e){var o,i;for(e=e.replace(/\[(\w+)\]/g,".$1"),i=e.split(".");i.length;){if(o=i.shift(),!(null!=t&&o in t))return null;t=t[o]}return t},t.prototype._sortBy=function(t,e,o){var i;return i=function(t,i){var n,r;return n=this._getObjectProperty(t,e),r=this._getObjectProperty(i,e),o?n>r?1:-1:n<r?1:-1},t.sort(i.bind(this)),t},t.prototype._filter=function(t,e){var o,i,n,r,s;for(o=[],i=function(t){if(e(t))return o.push(t)},n=0,s=t.length;n<s;n++)r=t[n],i(r);return o},t}(),function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.Instafeed=e()}(this,function(){return t})}).call(this);var userFeed=new Instafeed({limit:"8",resolution:"low_resolution",get:"user",userId:241386756,accessToken:"241386756.505ff1d.eca4efbb08154e039996fa739087a6d4"});userFeed.run();