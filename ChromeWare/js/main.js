(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

module.exports = CryptoJS;
},{}],2:[function(require,module,exports){
//AES Formatter
//var CryptoJS = require("./aes");
var CryptoJS = require("./md5");

var CryptoJS = CryptoJS || {};
CryptoJS.JsonFormatter = {
        stringify: function (cipherParams) {
            // create json object with ciphertext
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };

            // optionally add iv and salt
            if (cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if (cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }

            // stringify json object
            return JSON.stringify(jsonObj);
        },

        parse: function (jsonStr) {
            // parse json string
            var jsonObj = JSON.parse(jsonStr);

            // extract ciphertext from json object, and create cipher params object
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });

            // optionally extract iv and salt
            if (jsonObj.iv) {
                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
            }
            if (jsonObj.s) {
                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
            }

            return cipherParams;
        }
};

module.exports = CryptoJS;
},{"./md5":4}],3:[function(require,module,exports){
var CryptoJS = require("./cryptoJSFormatter");

var LazyCrypt = function(params){
	var params = params || {};
	var size;
	
	this.hashFn = params.hashFn || CryptoJS.MD5;
	this.encryptFn = params.encryptionFn || CryptoJS.AES.encrypt;
	this.decryptFn = params.decryptionFn || CryptoJS.AES.decrypt;
	this.opts = params.opts || { format: CryptoJS.JsonFormatter };
	this.enc = params.encoding || CryptoJS.enc.Utf8;
	this.storedKey = params.fieldName || "encryptedPassPart";
	this.storedHash = params.hashName || "hashPass";
	this.storedKeys = [this.storedKey];
	size = params.size || 30;
	
	//Init the hash
	var storedHash = localStorage[this.storedHash];
	if(typeof storedHash === 'undefined'){
		this.initHash(size);
	}
};

LazyCrypt.prototype.makeRandStr = function(size){
	var buf = [];
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]";
	var possibleLen = possible.length;
	var i, pos;
	
	for(i = 0; i < size; i++){
		pos = Math.floor(Math.random() * possibleLen);
		buf.push(possible.charAt(pos));
	}
	return buf.join('');
};

LazyCrypt.prototype.initHash = function(size){
	var size = size || 30;
	var hash = this.hashFn(this.makeRandStr(size));
	hashPass = hash.toString();
	localStorage[this.storedHash] = hashPass;
};

LazyCrypt.prototype.addKey = function(key){
	if(this.storedKeys.indexOf(key) != -1){
		this.storedKeys.push(key);
	}
};

LazyCrypt.prototype.encrypt = function(opts){
	var opts = opts || {};
	var encryptedPassPart;
	var respText;
	var suc = false;
	var hash = localStorage[this.storedHash];
	
	var pass = opts.pass || '';
	var callback = opts.callback;
	var key = opts.field || this.storedKey;
	this.addKey(key);
	if(pass.length > 0){
		encryptedPassPart = this.encryptFn(pass, hash, this.opts);
		localStorage[key] = encryptedPassPart;
		respText = 'Password Set';
		suc = true;
	}
	else{
		respText = 'You must enter a password that has a length greater than 0';
	}
	var response = { text: respText,  success: suc};
	if(typeof callback === 'function'){
		callback(response);
	}
};

LazyCrypt.prototype.decrypt = function(opts){
	var opts = opts || {};
	var key = opts.key || this.storedKey;
	
	var encryptedPassPart = localStorage[key];
	var secret = localStorage[this.storedHash];
	var ret;
	
	if(typeof encryptedPassPart !== 'undefined' && typeof secret !== 'undefined'){
		ret = this.decryptFn(encryptedPassPart, secret, this.opts).toString(this.enc);
	}
	return ret;
};

LazyCrypt.prototype.clearStorage = function(){
	var fieldsToClear = this.storedKeys.concat(this.storedHash);
	var i, len;
	for(i = 0, len = fieldsToClear.length; i < len; i++){
		localStorage.removeItem(fieldsToClear[i]);
	}
};

module.exports = LazyCrypt;
},{"./cryptoJSFormatter":2}],4:[function(require,module,exports){
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

var CryptoJS = require('./aes');

var CryptoJS=CryptoJS||function(s,p){var m={},l=m.lib={},n=function(){},r=l.Base={extend:function(b){n.prototype=this;var h=new n;b&&h.mixIn(b);h.hasOwnProperty("init")||(h.init=function(){h.$super.init.apply(this,arguments)});h.init.prototype=h;h.$super=this;return h},create:function(){var b=this.extend();b.init.apply(b,arguments);return b},init:function(){},mixIn:function(b){for(var h in b)b.hasOwnProperty(h)&&(this[h]=b[h]);b.hasOwnProperty("toString")&&(this.toString=b.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=l.WordArray=r.extend({init:function(b,h){b=this.words=b||[];this.sigBytes=h!=p?h:4*b.length},toString:function(b){return(b||t).stringify(this)},concat:function(b){var h=this.words,a=b.words,j=this.sigBytes;b=b.sigBytes;this.clamp();if(j%4)for(var g=0;g<b;g++)h[j+g>>>2]|=(a[g>>>2]>>>24-8*(g%4)&255)<<24-8*((j+g)%4);else if(65535<a.length)for(g=0;g<b;g+=4)h[j+g>>>2]=a[g>>>2];else h.push.apply(h,a);this.sigBytes+=b;return this},clamp:function(){var b=this.words,h=this.sigBytes;b[h>>>2]&=4294967295<<
32-8*(h%4);b.length=s.ceil(h/4)},clone:function(){var b=r.clone.call(this);b.words=this.words.slice(0);return b},random:function(b){for(var h=[],a=0;a<b;a+=4)h.push(4294967296*s.random()|0);return new q.init(h,b)}}),v=m.enc={},t=v.Hex={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++){var k=a[j>>>2]>>>24-8*(j%4)&255;g.push((k>>>4).toString(16));g.push((k&15).toString(16))}return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j+=2)g[j>>>3]|=parseInt(b.substr(j,
2),16)<<24-4*(j%8);return new q.init(g,a/2)}},a=v.Latin1={stringify:function(b){var a=b.words;b=b.sigBytes;for(var g=[],j=0;j<b;j++)g.push(String.fromCharCode(a[j>>>2]>>>24-8*(j%4)&255));return g.join("")},parse:function(b){for(var a=b.length,g=[],j=0;j<a;j++)g[j>>>2]|=(b.charCodeAt(j)&255)<<24-8*(j%4);return new q.init(g,a)}},u=v.Utf8={stringify:function(b){try{return decodeURIComponent(escape(a.stringify(b)))}catch(g){throw Error("Malformed UTF-8 data");}},parse:function(b){return a.parse(unescape(encodeURIComponent(b)))}},
g=l.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(b){"string"==typeof b&&(b=u.parse(b));this._data.concat(b);this._nDataBytes+=b.sigBytes},_process:function(b){var a=this._data,g=a.words,j=a.sigBytes,k=this.blockSize,m=j/(4*k),m=b?s.ceil(m):s.max((m|0)-this._minBufferSize,0);b=m*k;j=s.min(4*b,j);if(b){for(var l=0;l<b;l+=k)this._doProcessBlock(g,l);l=g.splice(0,b);a.sigBytes-=j}return new q.init(l,j)},clone:function(){var b=r.clone.call(this);
b._data=this._data.clone();return b},_minBufferSize:0});l.Hasher=g.extend({cfg:r.extend(),init:function(b){this.cfg=this.cfg.extend(b);this.reset()},reset:function(){g.reset.call(this);this._doReset()},update:function(b){this._append(b);this._process();return this},finalize:function(b){b&&this._append(b);return this._doFinalize()},blockSize:16,_createHelper:function(b){return function(a,g){return(new b.init(g)).finalize(a)}},_createHmacHelper:function(b){return function(a,g){return(new k.HMAC.init(b,
g)).finalize(a)}}});var k=m.algo={};return m}(Math);
(function(s){function p(a,k,b,h,l,j,m){a=a+(k&b|~k&h)+l+m;return(a<<j|a>>>32-j)+k}function m(a,k,b,h,l,j,m){a=a+(k&h|b&~h)+l+m;return(a<<j|a>>>32-j)+k}function l(a,k,b,h,l,j,m){a=a+(k^b^h)+l+m;return(a<<j|a>>>32-j)+k}function n(a,k,b,h,l,j,m){a=a+(b^(k|~h))+l+m;return(a<<j|a>>>32-j)+k}for(var r=CryptoJS,q=r.lib,v=q.WordArray,t=q.Hasher,q=r.algo,a=[],u=0;64>u;u++)a[u]=4294967296*s.abs(s.sin(u+1))|0;q=q.MD5=t.extend({_doReset:function(){this._hash=new v.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(g,k){for(var b=0;16>b;b++){var h=k+b,w=g[h];g[h]=(w<<8|w>>>24)&16711935|(w<<24|w>>>8)&4278255360}var b=this._hash.words,h=g[k+0],w=g[k+1],j=g[k+2],q=g[k+3],r=g[k+4],s=g[k+5],t=g[k+6],u=g[k+7],v=g[k+8],x=g[k+9],y=g[k+10],z=g[k+11],A=g[k+12],B=g[k+13],C=g[k+14],D=g[k+15],c=b[0],d=b[1],e=b[2],f=b[3],c=p(c,d,e,f,h,7,a[0]),f=p(f,c,d,e,w,12,a[1]),e=p(e,f,c,d,j,17,a[2]),d=p(d,e,f,c,q,22,a[3]),c=p(c,d,e,f,r,7,a[4]),f=p(f,c,d,e,s,12,a[5]),e=p(e,f,c,d,t,17,a[6]),d=p(d,e,f,c,u,22,a[7]),
c=p(c,d,e,f,v,7,a[8]),f=p(f,c,d,e,x,12,a[9]),e=p(e,f,c,d,y,17,a[10]),d=p(d,e,f,c,z,22,a[11]),c=p(c,d,e,f,A,7,a[12]),f=p(f,c,d,e,B,12,a[13]),e=p(e,f,c,d,C,17,a[14]),d=p(d,e,f,c,D,22,a[15]),c=m(c,d,e,f,w,5,a[16]),f=m(f,c,d,e,t,9,a[17]),e=m(e,f,c,d,z,14,a[18]),d=m(d,e,f,c,h,20,a[19]),c=m(c,d,e,f,s,5,a[20]),f=m(f,c,d,e,y,9,a[21]),e=m(e,f,c,d,D,14,a[22]),d=m(d,e,f,c,r,20,a[23]),c=m(c,d,e,f,x,5,a[24]),f=m(f,c,d,e,C,9,a[25]),e=m(e,f,c,d,q,14,a[26]),d=m(d,e,f,c,v,20,a[27]),c=m(c,d,e,f,B,5,a[28]),f=m(f,c,
d,e,j,9,a[29]),e=m(e,f,c,d,u,14,a[30]),d=m(d,e,f,c,A,20,a[31]),c=l(c,d,e,f,s,4,a[32]),f=l(f,c,d,e,v,11,a[33]),e=l(e,f,c,d,z,16,a[34]),d=l(d,e,f,c,C,23,a[35]),c=l(c,d,e,f,w,4,a[36]),f=l(f,c,d,e,r,11,a[37]),e=l(e,f,c,d,u,16,a[38]),d=l(d,e,f,c,y,23,a[39]),c=l(c,d,e,f,B,4,a[40]),f=l(f,c,d,e,h,11,a[41]),e=l(e,f,c,d,q,16,a[42]),d=l(d,e,f,c,t,23,a[43]),c=l(c,d,e,f,x,4,a[44]),f=l(f,c,d,e,A,11,a[45]),e=l(e,f,c,d,D,16,a[46]),d=l(d,e,f,c,j,23,a[47]),c=n(c,d,e,f,h,6,a[48]),f=n(f,c,d,e,u,10,a[49]),e=n(e,f,c,d,
C,15,a[50]),d=n(d,e,f,c,s,21,a[51]),c=n(c,d,e,f,A,6,a[52]),f=n(f,c,d,e,q,10,a[53]),e=n(e,f,c,d,y,15,a[54]),d=n(d,e,f,c,w,21,a[55]),c=n(c,d,e,f,v,6,a[56]),f=n(f,c,d,e,D,10,a[57]),e=n(e,f,c,d,t,15,a[58]),d=n(d,e,f,c,B,21,a[59]),c=n(c,d,e,f,r,6,a[60]),f=n(f,c,d,e,z,10,a[61]),e=n(e,f,c,d,j,15,a[62]),d=n(d,e,f,c,x,21,a[63]);b[0]=b[0]+c|0;b[1]=b[1]+d|0;b[2]=b[2]+e|0;b[3]=b[3]+f|0},_doFinalize:function(){var a=this._data,k=a.words,b=8*this._nDataBytes,h=8*a.sigBytes;k[h>>>5]|=128<<24-h%32;var l=s.floor(b/
4294967296);k[(h+64>>>9<<4)+15]=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360;k[(h+64>>>9<<4)+14]=(b<<8|b>>>24)&16711935|(b<<24|b>>>8)&4278255360;a.sigBytes=4*(k.length+1);this._process();a=this._hash;k=a.words;for(b=0;4>b;b++)h=k[b],k[b]=(h<<8|h>>>24)&16711935|(h<<24|h>>>8)&4278255360;return a},clone:function(){var a=t.clone.call(this);a._hash=this._hash.clone();return a}});r.MD5=t._createHelper(q);r.HmacMD5=t._createHmacHelper(q)})(Math);

module.exports = CryptoJS;
},{"./aes":1}],5:[function(require,module,exports){
/**
 * Created by pnarielwala on 2/25/2016.
 */
var Constants = function(){
    this.buttons = {
        logout: "btn-logout",
        login: "signin",
        request: "btn-createRequest",
        cancelRequest: "btn-cancel",
        createRequest: "btn-create",
        screenshot: "btn-screenshot",
        gotoRequest: "btn-gotoRequest",
        quickLinks: "btn-quickLinks",
        softwareRequest: "btn-softwareRequest",
        softwareRequirement: "btn-softwareRequirement",
        softwareTestFile: "btn-softwareTestFile",
        softwareBack: "btn-softwareBack"
    };
    this.ebYes = 2;
    this.ebNo = 1;
    this.priority = {
        immediate: "1",
        at_the_earliest: "2",
        normal: "3",
        later: "4"
    };
    this.severity = {
        severe: "1",
        major: "2",
        minor: "3"
    };
    this.type = {
        bug: "BG",
        enhancement: "EV",
        product_opening: "OR",
        question: "QU"
    };
    this.impactLayer = {
        product: "2",
        as: "1"
    };

    this.validSites = [	"inno",
        "inno2",
        "innous",
        "innous2",
        "www29",
        "localhost",
        "demo",
        "demo2",
        "demous",
        "demous2",
        "devus",
        "devus1",
        "devus2",
        "devus3",
        "devus4",
        "rctus",
        "rctus1",
        "rctus2",
        "rctus3",
        "rctus4",
        "rctus5"];

    this.invalidMsgTitle = "Invalid";
    this.invalidSiteMsgTitle = "Not a valid site";
    this.invalidSiteMsg = "<p>You cannot create a request for this site. The site domain must be one of the following:</p><ul class='errorList'><li>" + this.validSites.join("<li>") + "</li></ul>";
    this.ebMsgHTML = 1;
};

Constants.prototype.getButtons = function(){
    return this.buttons;
};

Constants.prototype.getEbYes = function(){
    return this.ebYes
};

Constants.prototype.getEbNo = function(){
    return this.ebNo
};

Constants.prototype.getPriority = function(){
    return this.priority;
};

Constants.prototype.getSeverity = function(){
    return this.severity;
};

Constants.prototype.getImpactLayer = function(){
    return this.impactLayer;
};


module.exports = Constants;

},{}],6:[function(require,module,exports){
//var _dechromeify = require('../../../node_modules/chrome-tool/CustomContextMenuItem');
//var _dechromeify = require('../../../ChromeWare/vendor/chrome_extensions');
var _transition = require("./transitions");
var _constants = new (require("./constants"));

var ContextMenu = function(transition){
    this.transition = transition;
    this.requestURL = "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=";
    this.requirementURL = "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=";
    this.testfileURL = "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=";

};

ContextMenu.prototype.initialize = function(){
    var title = "Find Software Request";
    var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
        "onclick": this.openRequest});

    var title = "Find Software Requirement";
    var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
        "onclick": this.openRequirement});

    var title = "Find Software Test File";
    var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
        "onclick": this.openTestFile});
};
ContextMenu.prototype.initInWindow = function(){
    if(this.validNumber(this.getClipboard().replace("FT", ""))){
        $("#inputSoftware").val(this.getClipboard());
        // $("#" + buttons.gotoRequest).attr("disabled","disabled");
    }
};
ContextMenu.prototype.validNumber = function(content){
    var number = content.replace(/"/g, "");
    return (parseInt(number, 10) > 0)
};
ContextMenu.prototype.openRequest = function(info, tab){
    var content = JSON.stringify(info.selectionText);
    var number = content.replace(/"/g, "");
    if(parseInt(number, 10) > 0)
        chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number, index: (tab.index + 1), openerTabId: tab.id});
};
ContextMenu.prototype.openRequirement = function(info, tab){
    var content = JSON.stringify(info.selectionText);
    var number = content.replace(/"/g, "");
    if(parseInt(number, 10) > 0)
        chrome.tabs.create({ url: "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number, index: (tab.index + 1), openerTabId: tab.id });
};
ContextMenu.prototype.openTestFile = function(info, tab){
    var content = JSON.stringify(info.selectionText);
    var number = content.replace(/"/g, "");
    if(number.indexOf("FT") >=0) {
        number = number.replace("FT", "");
        if (parseInt(number, 10) > 0)
            chrome.tabs.create({
                url: "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number,
                index: (tab.index + 1),
                openerTabId: tab.id
            });
    };
};
ContextMenu.prototype.getClipboard = function(){
    var el = document.createElement('textarea');
    document.body.appendChild(el);
    el.focus();
    document.execCommand('paste');
    var value = el.value;
    document.body.removeChild(el)
    return value;
};
ContextMenu.prototype.clearClipboard = function(){
    var el = document.createElement('textarea');
    var text = document.createTextNode("\0");
    el.appendChild(text);
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
ContextMenu.prototype.gotoRequest = function(){
    var self = this;
    return function(){
        var number = $("#inputSoftware").val();
        if(self.validNumber(number)){
            var url = "https://software.enablon.com/Software/?u=%2FReferent%2FRqtes&rid=" + number;
            self.transition.hideQuickLinks();
            self.clearClipboard()
            chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
        }
    }
};
ContextMenu.prototype.gotoRequirement = function(){
    var self = this;
    return function(){
        var number = $("#inputSoftware").val();
        if(self.validNumber(number)){
            var url = "https://software.enablon.com/Software/?u=%2FReferent%2FProreq&rid=" + number;
            self.transition.hideQuickLinks();
            self.clearClipboard()
            chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
        }
    }
};
ContextMenu.prototype.gotoTestFile = function(){
    var self = this;
    return function(){
        var number = $("#inputSoftware").val();
        if(self.validNumber(number.replace("FT", ""))){
            var url = "https://software.enablon.com/Software/?u=%2FReferent%2FFTs&rid=" + number.replace("FT", "");
            self.transition.hideQuickLinks();
            self.clearClipboard()
            chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: url, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
        }
    }
};
ContextMenu.prototype.quickLinksEvents = function(){
    var self = this;
    //$("#" + buttons.gotoRequest).click(this.gotoRequest());
    $("#" + _constants.buttons.softwareRequest).click(this.gotoRequest());
    $("#" + _constants.buttons.softwareRequirement).click(this.gotoRequirement());
    $("#" + _constants.buttons.softwareTestFile).click(this.gotoTestFile());

    $("#software-clearField").click(function(){ self.clearClipboard(); $("#inputSoftware").val("")});
    $("#" + _constants.buttons.quickLinks).click(function(){ self.transition.showQuickLinks()});
    $("#" + _constants.buttons.softwareBack).click(function(){ self.transition.hideQuickLinks()});

    $(document).keypress(function(e) {
        if(e.which == 13 && localStorage.getItem("currentWindow") == "quickLinks") {
            $("#" + _constants.buttons.softwareRequest).click();
        }
    });
};

module.exports = ContextMenu;

},{"./constants":5,"./transitions":12}],7:[function(require,module,exports){
//var jQuery = require("../../vendor/jquery");
//
//window.buttons = {
//			logout: "btn-logout",
//			login: "signin",
//			request: "btn-createRequest",
//			cancelRequest: "btn-cancel",
//			createRequest: "btn-create",
//			screenshot: "btn-screenshot",
//			gotoRequest: "btn-gotoRequest",
//			quickLinks: "btn-quickLinks",
//			softwareRequest: "btn-softwareRequest",
//			softwareRequirement: "btn-softwareRequirement",
//			softwareTestFile: "btn-softwareTestFile",
//			softwareBack: "btn-softwareBack"
//		};
//window.ebYes = 2;
//window.ebNo = 1;
//window.priority = {
//			immediate: "1",
//			at_the_earliest: "2",
//			normal: "3",
//			later: "4"
//		};
//window.severity = {
//			severe: "1",
//			major: "2",
//			minor: "3"
//		};
//window.type = {
//			bug: "BG",
//			enhancement: "EV",
//			product_opening: "OR",
//			question: "QU"
//		};
//window.impactLayer = {
//			product: "2",
//			as: "1"
//		};
//
//window.validSites = [	"inno",
//						"inno2",
//						"innous",
//						"innous2",
//						"localhost",
//						"demo",
//						"demo2",
//						"demous",
//						"demous2",
//						"devus",
//						"devus1",
//						"devus2",
//						"devus3",
//						"devus4",
//						"rctus",
//						"rctus1",
//						"rctus2",
//						"rctus3",
//						"rctus4",
//						"rctus5"];
//
//window.invalidMsgTitle = "Invalid";
//window.invalidSiteMsg = "You cannot create a request for this site. The site domain must be one of the following: " + window.validSites.join(", ");


var _transition = require("./transitions");
var _requestFields = require("./requestFields");
var _url = require("./urlManagement");
var _contextMenu = require("./contextMenu");
var _logger = require("./logger");
var _version = require("./version");

window.onload = function(){

	//This is used to grab Release and Product Component from Software. Needs Request #95456
	//var url = new _url();
	//url.storeSoftwareData();
	//url.storeTempSoftwareData();
	var transition = new _transition();
	transition.initialize();

	var version = new _version();

	var requestFields = new _requestFields(transition);
	requestFields.initialize();

	var logger = new _logger(null, transition);
	logger.checkLogin();// check and log if needed

	var contextMenu = new _contextMenu(transition);
	contextMenu.initInWindow();
	contextMenu.quickLinksEvents();
};
},{"./contextMenu":6,"./logger":8,"./requestFields":10,"./transitions":12,"./urlManagement":13,"./version":14}],8:[function(require,module,exports){
var _lazyCrypt = require("../crypto/lazyCrypt");
var _transition = require('./transitions');
var _constants = new (require('./constants'));
var _modal = require('./modal');

var Logger = function(params, transition){
    var self = this;
    var params = params || {};
    this.transition = transition || new _transition();
    this.pingUrl = "https://software.enablon.com/Software/?u=ver&pm=6&aformat=1";
    this.swUrl = 'https://software.enablon.com/enablon/?OStId=Software';
    this.Crypt = params.Crypt || new _lazyCrypt();

    $("#" + _constants.buttons.login).click(function(){self.login()});
    $("#" + _constants.buttons.logout).click(function(){self.logout()});
};

Logger.prototype.checkLogin = function() {
    var self = this;
    this.ping().then(
        function(response, statusText, xhrObj){
            var nError = response.indexOf("error");
            if(nError == -1){
                self.transition.loggedIn();
            }
            else{
                if(localStorage.getItem("currentWindow") == "request"){
                    new _modal("warning", "You have been logged out!", "Please login to continue").display();
                };

                self.transition.loggedOut();
            }
        }, function(xhrObj, textStatus, err) {
            new _modal("danger", "Software is Offline", "Please check your connection").display();
            console.warn(err);
            self.transition.loggedOut();
        }
    )

};

Logger.prototype.login = function(){
    var user = $("input[id='inputUsername']").val();
    var pwd = $("input[id='inputPassword']").val();

    if(!(user && pwd)){
        new _modal("danger", "Invalid Credentials", "Please enter valid Software credentials").display();
    }else{
        this.connect(user, pwd);
    };
};

Logger.prototype.logout = function(){
    $.post("https://software.enablon.com/Software/?u=logoff");
    this.transition.logOut();
};

Logger.prototype.connect = function(user, password){
    this.transition.checkLogin();
    var data= {uid:user, sid:'enablon', Var_BuilderKeyAutoLogin: '', pwd:password, LogIn:'OK', LogIn:'Log In'};

    var self = this;
    $.ajax({
        type: 'POST',
        url: self.swUrl,
        data: data,
        async: true,
        timeout: 6000,
        success:function(data) {
            var nConnected = data.indexOf('<TITLE>Dashboards</TITLE>');
            if(!(nConnected > 0))
            {
                if(localStorage.getItem('currentWindow') == ("main" || null))
                {
                    self.transition.loggedOut();
                }
                else {
                    self.transition.loggedOut();
                    new _modal("danger", "Invalid Credentials.", "Please enter valid Software credentials").display();
                }
            }else{
                self.transition.loginSuccess();
            }
        },
        error:function(){
            if(localStorage.getItem('currentWindow') == ("main" || null))
            {
                self.transition.loggedOut();
            }else{
                new _modal("danger", "Invalid Credentials.", "Please enter valid Software credentials").display();
            };
            self.transition.states.hideLoading();
        }
    });
};

Logger.prototype.ping = function(){
    return Promise.resolve($.ajax({
            url: this.pingUrl,
            type: 'GET',
            timeout: 5000,
            cache: false
        })
    );
};

module.exports = Logger;










},{"../crypto/lazyCrypt":3,"./constants":5,"./modal":9,"./transitions":12}],9:[function(require,module,exports){
var _constants = new (require('./constants'));

var Modal = function(type, title, message, flag){
	this.type = type;
	this.title = title;
	this.message = message;
	this.flag = flag;
	this.modalData = $("#myModal");

	this.modalData.on('hidden.bs.modal', function (e) {
		$(this).find(".modal-body").empty();
	})
};

Modal.prototype.setType = function(){
	switch(this.type){
		case "warning":
			this.modalData.find(".modal-content").addClass("warning")
			break;
		case "danger":
			this.modalData.find(".modal-content").addClass("danger")
			break;
		case "success":
			this.modalData.find(".modal-content").addClass("success")
			break;
		default:
			break;
	}
};
Modal.prototype.setTitle = function(){
	this.modalData.find(".modal-title").text(this.title)
};
Modal.prototype.setMessage = function(){
	if(this.flag == _constants.ebMsgHTML){
		this.modalData.find(".modal-body").append(this.message)
	}else{
		this.modalData.find(".modal-body").text(this.message)
	}
};
Modal.prototype.display = function(){
	this.setType();
	this.setTitle();
	this.setMessage();

	this.modalData.modal('show');
};

module.exports = Modal;

},{"./constants":5}],10:[function(require,module,exports){
var _screenshotTool = new (require('./screenshot'));
var _url = new (require('./urlManagement'));
var _constants = new (require('./constants'));

var _transitions = require('./transitions');
var _modal = require('./modal');

var RequestFields = function(transition){
	this.transition = transition || new _transitions();
};

RequestFields.prototype.initialize = function(){
	var fieldsObj = this.getFields() == undefined ? {} : this.getFields();
	this.setFields(fieldsObj);

	this.defaultFieldValues();
	this.fillFields();
	this.initLinks();
	this.rememberFields();
	this.initFieldPopover();
	this.initSectionTracking();
	this.fieldSetHandler();
	this.initFieldEvents();
	this.handleRequiredFields("required");
};

RequestFields.prototype.initLinks = function(){
	function init($field, callback){
		$field.on("keyup", function(){
			var self = this;
			var $self = $(this);
			var input = $self.val();
			
			if(input.length >= 3){
				callback(input).then(function(response){
					self.collection = JSON.parse(response);
					$self.autocomplete({
						source: Object.keys(self.collection)
					}).focusout(function(){
						if(Object.keys(self.collection).indexOf($self.val()) < 0){
							var element = $(':focus');
							$self.val("");
							self.setFieldValue($self.attr("id"), "");
							self.handleRequiredFields("required");
							element.focus();
						} else{
							$self.attr("data-value", JSON.stringify(self.collection[$self.val()]))
						}
					})
				})
			} else{
				$self.autocomplete({
					source: {}
				}).autocomplete( "close" );
				delete self.collection
			}
		});
	}

	init($("#Fld__xml_Release"), _url.getReleaseData)
	init($("#Fld__xml_ProductComponent"), _url.getProductComponentData)
	
}

RequestFields.prototype.rememberFields = function(){
	//All input text fields have this class
	var self = this;

	function rememberTextFields(){
		function storeFieldTextValue(element){
			var fieldId = $(element).attr('id');
			var fieldValue = $(element).val();
			self.setFieldValue(fieldId, fieldValue)
		}

		var formField = ".form-control";
		$("#request").find(formField).each(function() {
			storeFieldTextValue(this)
		}).focusout(function() {
			storeFieldTextValue(this);
			self.handleRequiredFields("required");
		});
	}

	function rememberRadioFields(){
		$("input:radio").click(function(){
			var fieldId = $(this).attr('name');
			var fieldValue = $(this).val();
			self.setFieldValue(fieldId, fieldValue);
		})
			.each(function(){
				var fieldId = $(this).attr('name');
				var fieldValue = $(this).val();
				self.setFieldValue(fieldId, fieldValue);
			});
	}

	function rememberCheckboxFields(){
		$("input:checkbox").click(function(){
			var fieldId = $(this).attr('id');
			var fieldValue = ($(this).prop("checked") == true) ? _constants.ebYes:_constants.ebNo;
			self.setFieldValue(fieldId, fieldValue)
		});
	}

	rememberTextFields();
	rememberRadioFields();
	rememberCheckboxFields();
};
RequestFields.prototype.fillFields = function(){
	var formField = ".form-control";
	var fieldsObj = this.getFields()

	$("#request").find(formField).each(function() {
		var fieldId = $(this).attr('id');
		var fieldValue = fieldsObj[fieldId];
		if(fieldValue != null && fieldId != "filename")
		{
			$(this).val(fieldValue);
		}
	});

	$("input:radio").each(function(){
		switch(fieldsObj["Fld__xml_ImpactedLayer"]){
			case _constants.impactLayer.product:
				$("#productLayer").prop("checked", true);
				break;
			case _constants.impactLayer.as:
				$("#asLayer").prop("checked", true);
				break;
			default:
				fieldsObj["Fld__xml_ImpactedLayer"] = _constants.impactLayer.product;
		}
	});

	$("input:checkbox").each(function(){
		var fieldId = $(this).attr('id');
		var fieldValue = fieldsObj[fieldId];
		$(this).prop("checked", (fieldValue == _constants.impactLayer.product));
	});
	this.fillImages();
};
RequestFields.prototype.clearFields = function(){
	this.setFields({});

	var formField = ".form-control";
	$("#request").find(formField).each(function() {
		var fieldId = $(this).attr('id');

		if(["Fld__xml_Type", "Fld__xml_Severity", "Fld__xml_Priority"].indexOf(fieldId) > -1){
			switch(fieldId){
				case "Fld__xml_Type":
					$(this).val(_constants.type.bug);
					break;
				case "Fld__xml_Severity":
					$(this).val(_constants.severity.minor);
					break;
				case "Fld__xml_Priority":
					$(this).val(_constants.priority.normal);
					break;
			};
		}
		else{
			$(this).val("");
		}
	});
	$(".requiredErrorHeader").remove();
	$(".requiredError").removeClass("requiredError");
	$("#productLayer").prop("checked", true);
	$("#Fld__xml_Regression").prop("checked", false);
	var regressionFieldParent = $("#Fld__xml_RegressionFrom").parent();
	if(!regressionFieldParent.hasClass("hide")){
		regressionFieldParent.addClass("hide");
	}


	_screenshotTool.clearScreenshots();
};
RequestFields.prototype.defaultFieldValues = function(){
	if(this.getFields() == {}){
		this.setFieldValue("Fld__xml_ImpactedLayer", _constants.impactLayer.product);
		this.setFieldValue("Fld__xml_Type", _constants.type.bug);
		this.setFieldValue("Fld__xml_Severity", _constants.severity.minor);
		this.setFieldValue("Fld__xml_Priority", _constants.priority.normal);
	}
};
RequestFields.prototype.handleRequiredFields = function(classAttr){
	var self = this;
	var err = false;
	$("#request").find("[data-required]").each(function(){
		var element = $(this);
		var fieldSets = element.data("required");
		var value = self.getFieldValue(element.attr("id"));
		if(value == "" || value == undefined){
			if(fieldSets == ""){
				err = true;
				if(!element.hasClass(classAttr)){
					element.addClass(classAttr);
				}
			}else{
				var tempErr = true;
				for(var fieldId in fieldSets){
					var triggerValue = fieldSets[fieldId];
					if(Array.isArray(triggerValue)){
						tempErr = tempErr && (triggerValue.indexOf(self.getFieldValue(fieldId)) > -1);
					}else{
						tempErr = tempErr && (self.getFieldValue(fieldId) == triggerValue)
					};
				};
				if(tempErr){
					err = true;
					if(!element.hasClass(classAttr)){
						element.addClass(classAttr);
					}
				}else{
					element.removeClass(classAttr);
				}
			}
		}else{
			element.removeClass(classAttr);
		}
	});
	return err;
};
RequestFields.prototype.validateFields = function(){
	var err = this.handleRequiredFields("requiredError");
	$(".panel").each(function(){
		var element = $(this);
		var errCount = element.find(".requiredError").length;
		var errHeaderCount = element.find(".requiredErrorHeader").length;
		if(errCount > 0){
			if(errHeaderCount == 0){
				$(element.find(".panel-title")[0]).append("<span class='glyphicon glyphicon-exclamation-sign requiredErrorHeader' aria-hidden='true'></span>");
			}
		}else{
			element.find(".requiredErrorHeader").remove();
		}
	});
	if(err){
		new _modal("danger", "Invalid Fields!", "There are some errors in the form, please fix them to submit the form again.").display();
	};
	return err
};
RequestFields.prototype.fillImages = function(){
	var objImages = JSON.parse(localStorage.getItem("Screenshots")) || {};
	//
	$.get("screenshotListItem.html", function(data){
		for(var fileName in objImages){
			if(objImages.hasOwnProperty(fileName)){
				var appendData = $($(data)[0]).attr("data-screenshot-name", fileName)[0];
				if(fileName.length > 30){
					appendData = $(appendData).append(fileName.slice(0, 30) + "...");
				}else{
					appendData = $(appendData).append(fileName);
				};
				$(".screenshot-group").append(appendData);
			}
		};

		_screenshotTool.initScreenshotEvents();
	});
};
RequestFields.prototype.initFieldEvents = function(){
	//Be aware of the order
	var self = this;
	//$("#" + buttons.request).attr("disabled","disabled");
	localStorage.setItem("RequestCreationAllowed", false);
	localStorage.setItem("LoggedOut", true);

	$("#" + _constants.buttons.cancelRequest).click(function(){
		self.resetSections();
		self.clearFields();
		self.defaultFieldValues();
		self.transition.cancelRequest()
	});

	$("#" + _constants.buttons.createRequest).click(function(){
		if(!self.validateFields()){
			self.createRequest();
		}
	});

	$("#" + _constants.buttons.screenshot).click(this.takeScreenshot);
	$("#" + _constants.buttons.request).click(function(){
		// if(localStorage.getItem("LoggedOut") == "true"){
		// 	new _modal("danger", _constants.invalidMsgTitle, "You are signed out of this site. Please log back in and try again").display();
		// }else{
			self.transition.createRequest();
			self.storeBuildData();
			self.fieldSetHandler();
			self.handleRequiredFields("required");
		// }
	});
};
RequestFields.prototype.fieldSetHandler = function(){
	$('[data-fieldset]').each(function(){
		var selfData = $(this);
		var myFieldId = selfData.find(".form-control").attr("id");
		var myFieldParentData = $("#" + myFieldId).parent();
		var fieldSets = selfData.data("fieldset");
		for(var fieldId in fieldSets){
			var triggerValue = fieldSets[fieldId];
			var fieldData = $("#" + fieldId);
			if(fieldData.prop("type") == "checkbox"){
				if(fieldData.prop("checked") == true)
					myFieldParentData.removeClass("hide");
				$("#" + fieldId).change(function(){
					if($(this).prop("checked") == true)
						myFieldParentData.removeClass("hide");
					if($(this).prop("checked") == false)
						myFieldParentData.addClass("hide");
				});
			}
		}
	})
};
RequestFields.prototype.initFieldPopover = function(){
	var formField = ".form-control";
	$("#request").find(formField).hover(function() {
		//Retrieve the value of the field for comparison
		var popupValue = $(this).val();
		if(popupValue !== ""){
			//If the field is not empty, then it will apply
			//the popover
			var popupName = $(this).prev().text();
			$(this)
				.popover({content: popupName, placement:"top", container: 'body', trigger: 'focus'});
		}
		else{
			//Else, if the field is empty then the field
			//destroys the popover
			$(this).popover('destroy');
		};
	});
};
RequestFields.prototype.initSectionTracking = function(){
	var section = ".panel-collapse";
	this.loadLastSection();
	$(section).on('shown.bs.collapse', function () {
		var sectionId = $(this).attr("id");
		localStorage.setItem("lastSection", sectionId);
	});
};
RequestFields.prototype.loadLastSection = function(){
	var sectionId = localStorage.getItem("lastSection");
	if(sectionId != null)
	{
		$('#'+ sectionId).collapse({parent: "#accordion"})
	}
	else{
		this.resetSections();
	}
};
RequestFields.prototype.resetSections = function(){
	$('#collapseOne').addClass('in')
		.css({height: 'auto'});
	$('#collapseTwo').removeClass('in')
		.css({height: '0px'});
	$('#collapseThree').removeClass('in')
		.css({height: '0px'});
	$('#collapseFour').removeClass('in')
		.css({height: '0px'});
	localStorage.setItem("lastSection", 'collapseOne');
};
RequestFields.prototype.createRequest = function(){
	var self = this;
	function getSoftwareData(){
		return new Promise(function(resolve, reject){
			var fieldsObj = self.getFields();
			var returnObj = {};
			_url.getReleaseData(fieldsObj["Fld__xml_Release"]).then(function(response){
				returnObj["releases"] = JSON.parse(response);
				_url.getProductComponentData(fieldsObj["Fld__xml_ProductComponent"]).then(function(response){
					returnObj["product-components"] = JSON.parse(response);
					resolve(JSON.stringify(returnObj));
				}, function(error){
					console.log("failed!", error);
				});

			}, function(error){
				console.log("failed!", error);
			});
		});
	};

	getSoftwareData().then(function(response){
		var requestURL = _url.createRequestURL();
		var dataObj = JSON.parse(response);
		var releaseObj = dataObj["releases"];
		var prodCompObj = dataObj["product-components"];

		var fieldsObj = self.getFields();
		for(var fieldXML in fieldsObj){
			var fieldVal = fieldsObj[fieldXML];
			if(fieldVal != "" && fieldVal != undefined){
				if(fieldXML == "Fld__xml_ProductComponent"){
					requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(prodCompObj[fieldVal].path || "")
				}else if(fieldXML == "Fld__xml_Release"){
					requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(releaseObj[fieldVal].key || "")
				}else if(fieldXML == "Fld__xml_NeedDate"){
					var dateArray = fieldVal.split('-')[1] + "/"+ fieldVal.split('-')[2] + "/"+ fieldVal.split('-')[0];
					requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(dateArray && "")
				}
				else{
					requestURL = requestURL + "&" + fieldXML + "=" + encodeURIComponent(fieldVal);
				};
			}
		};
		self.downloadScreenshots();
		self.clearFields();
		self.resetSections();
		self.transition.cancelRequest();
		chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: requestURL, index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
	}, function(error){
		console.log("failed!", error);
	});
};
RequestFields.prototype.storeBuildData = function(){
	var self = this;

	function extractBuilds(data){
		var builds = "N/A";
		if($('.VPACK b', data).length > 0){
			builds = $(' .VPACK b', data).parent().text();
		}

		self.setFieldValue("Fld__xml_EnvironmentBuilds", builds)
		return builds;
	}

	_url.getCurrentTabURL().then(function(url){
		var versionUrl = _url.getVersionPageUrl(url);
		return _url.getSiteData(versionUrl);
	}).then(function(data){
		extractBuilds(data)
	})
};
RequestFields.prototype.takeScreenshot = function(){
	_screenshotTool.takeScreenshot();
};
RequestFields.prototype.downloadScreenshots = function(){
	_screenshotTool.downloadScreenshots();
	_screenshotTool.clearScreenshots();
};

RequestFields.prototype.getFields = function(){
	return JSON.parse(localStorage.getItem("requestFields"))
};
RequestFields.prototype.setFields = function(fields){
	localStorage.setItem("requestFields", JSON.stringify(fields))
};
RequestFields.prototype.getFieldValue = function(field){
	return JSON.parse(localStorage.getItem("requestFields"))[field];
};
RequestFields.prototype.setFieldValue = function(field, value){
	var obj = JSON.parse(localStorage.getItem("requestFields"));
	obj[field] = value;
	localStorage.setItem("requestFields", JSON.stringify(obj))
};

module.exports = RequestFields;

},{"./constants":5,"./modal":9,"./screenshot":11,"./transitions":12,"./urlManagement":13}],11:[function(require,module,exports){
var _modal = require("./modal");
var _constants = new (require("./constants"));

var Screenshot = function(){};

Screenshot.prototype.takeScreenshot = function takeScreenshot(){
	self = this;
	chrome.tabs.captureVisibleTab(null, function(img) {
		filename = $("#filename").val();
		var objImages = JSON.parse(localStorage.getItem("Screenshots"));

		if(objImages == null)
			objImages = {};
		if(Object.keys(objImages).length < 3){
			if(filename == ""){
				new _modal("danger", "Sorry!", "Please enter in a filename before generating a screenshot").display();
			}else{
				var imgUrl = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
				var link = document.createElement("a");
				link.download = filename + ".jpg";
				//link.href = imgUrl;
				link.href = img;

				var imageVersion = 1;
				while(objImages[filename] != null){
					imageVersion++;
					filename = filename + imageVersion;
				};
				objImages[filename] = img;
				localStorage.setItem("Screenshots", JSON.stringify(objImages));
				$("#filename").val("");

				$.get("screenshotListItem.html", function(data){
					var appendData = $($(data)[0]).attr("data-screenshot-name", filename)[0];
					if(filename.length > 30){
						appendData = $(appendData).append(filename.slice(0, 30) + "...");
					}else{
						appendData = $(appendData).append(filename);
					}
					$(".screenshot-group").append(appendData);
					self.initScreenshotEvents();
				});
			}
		}else{
			new _modal("danger", "Sorry!", "Only 3 screenshots are allowed. Please remove one and try again.").display();
		}
	});
};
Screenshot.prototype.downloadScreenshots = function downloadScreenshots(){
	var objImages = JSON.parse(localStorage.getItem("Screenshots"));
	console.log(objImages);
	jQuery.ajaxSetup({async:false});
	for(var fileName in objImages){
		var img = objImages[fileName];
		var link = document.createElement("a");
		link.download = fileName + ".jpg";
		link.href = img;
		link.click();
	};
	jQuery.ajaxSetup({async:true});
};
Screenshot.prototype.clearScreenshots = function clearScreenshots(){
	localStorage.removeItem("Screenshots");
	$(".screenshot-group").children().remove();
};
Screenshot.prototype.validateTakeScreenshot = function validateTakeScreenshot(){
	$("#filename").each(function(){
		selfData = $(this);
		// if(selfData.val() == "" || selfData.val() == undefined){
		// $("#" + buttons.screenshot).attr("disabled", "disabled")
		// };

		selfData.keyup(function(){
			// if(selfData.val() == "" || selfData.val() == undefined){
			// $("#" + buttons.screenshot).attr("disabled", "disabled")
			// }else{
			//Download file cannot contain invalid characters: \/:*?<>|
			var sString = selfData.val().substring(selfData.val().length -1, selfData.val().length);
			if(["\\", "/", ":", "*", "?", "<", ">", "|"].indexOf(sString) != -1){
				selfData.val(selfData.val().substring(0, selfData.val().length -1));
				return
			};
			// }
		});
	});
};
Screenshot.prototype.initScreenshotEvents = function initScreenshotEvents(){
	this.validateTakeScreenshot();

	$(".screenshot-edit").click(function(event){
		event.preventDefault();
		localStorage.setItem("editImageIndex", $(this).parent().attr("data-screenshot-name"));
		chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: "../html/edit.html", index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
	});

	$(".screenshot-save").click(function(event){
		event.preventDefault();
		var objImages = JSON.parse(localStorage.getItem("Screenshots"));
		var filename = $(this).parent().attr("data-screenshot-name");
		var img = objImages[filename];
		var link = document.createElement("a");
		link.download = filename + ".jpg";
		link.href = img;
		link.click();
	});

	$(".screenshot-remove").click(function(event){
		event.preventDefault();
		var objImages = JSON.parse(localStorage.getItem("Screenshots"));
		var filename = $(this).parent().attr("data-screenshot-name");
		delete objImages[filename];
		if(!(Object.keys(objImages).length > 2)){
			$("#" + _constants.buttons.screenshot).attr("disabled", false);
		};
		localStorage.setItem("Screenshots", JSON.stringify(objImages));
		$(this).parent().remove();
	});
};

module.exports = Screenshot;

//var Screenshot = (function (){
//
//	return {
//		takeScreenshot: function(){
//			self = this;
//			chrome.tabs.captureVisibleTab(null, function(img) {
//				var date = new Date();
//				var screenshotUrl = img;
//				var viewTabUrl = chrome.extension.getURL('screenshot.html');
//				filename = $("#filename").val();
//				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//
//				if(objImages == null)
//					objImages = {};
//				if(Object.keys(objImages).length < 3){
//					if(filename == ""){
//						new Modal("danger", "Sorry!", "Please enter in a filename before generating a screenshot").display();
//					}else{
//						var imgUrl = img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
//						var link = document.createElement("a");
//						link.download = filename + ".jpg";
//						//link.href = imgUrl;
//						link.href = img;
//
//						var imageVersion = 1;
//						while(objImages[filename] != null){
//							imageVersion++;
//							filename = filename + imageVersion;
//						};
//						objImages[filename] = img;
//						localStorage.setItem("Screenshots", JSON.stringify(objImages));
//						$("#filename").val("");
//
//						$.get("screenshotListItem.html", function(data){
//							var appendData = $($(data)[0]).attr("data-screenshot-name", filename)[0];
//							appendData = $(appendData).append(filename);
//							$(".screenshot-group").append(appendData);
//							self.initScreenshotEvents();
//						});
//					}
//				}else{
//					new Modal("danger", "Sorry!", "Only 3 screenshots are allowed. Please remove one and try again.").display();
//				}
//			});
//		},
//		downloadScreenshots: function(){
//			var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//			console.log(objImages);
//			jQuery.ajaxSetup({async:false});
//			for(var fileName in objImages){
//				var img = objImages[fileName];
//				var link = document.createElement("a");
//				link.download = fileName + ".jpg";
//				link.href = img;
//				link.click();
//			};
//			jQuery.ajaxSetup({async:true});
//		},
//		clearScreenshots: function(){
//			localStorage.removeItem("Screenshots");
//			$(".screenshot-group").children().remove();
//		},
//		validateTakeScreenshot: function validateTakeScreenshot(){
//			$("#filename").each(function(){
//				selfData = $(this);
//				// if(selfData.val() == "" || selfData.val() == undefined){
//					// $("#" + buttons.screenshot).attr("disabled", "disabled")
//				// };
//
//				selfData.keyup(function(){
//					// if(selfData.val() == "" || selfData.val() == undefined){
//						// $("#" + buttons.screenshot).attr("disabled", "disabled")
//					// }else{
//						//Download file cannot contain invalid characters: \/:*?<>|
//						var sString = selfData.val().substring(selfData.val().length -1, selfData.val().length);
//						if(["\\", "/", ":", "*", "?", "<", ">", "|"].indexOf(sString) != -1){
//							selfData.val(selfData.val().substring(0, selfData.val().length -1));
//							return
//						};
//					// }
//				});
//			});
//		},
//		initScreenshotEvents: function(){
//			this.validateTakeScreenshot();
//
//			$(".screenshot-edit").click(function(event){
//				event.preventDefault();
//				localStorage.setItem("editImageIndex", $(this).parent().attr("data-screenshot-name"));
//				chrome.tabs.query({currentWindow: true,active: true},function(tabs){chrome.tabs.create({ url: "../html/edit.html", index: (tabs[0].index + 1), openerTabId: tabs[0].id });});
//			});
//
//			$(".screenshot-save").click(function(event){
//				event.preventDefault();
//				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//				var filename = $(this).parent().attr("data-screenshot-name");
//				var img = objImages[filename];
//				var link = document.createElement("a");
//				link.download = filename + ".jpg";
//				link.href = img;
//				link.click();
//			});
//
//			$(".screenshot-remove").click(function(event){
//				event.preventDefault();
//				var objImages = JSON.parse(localStorage.getItem("Screenshots"));
//				var filename = $(this).parent().attr("data-screenshot-name");
//				delete objImages[filename];
//				if(!(Object.keys(objImages).length > 2)){
//					$("#" + buttons.screenshot).attr("disabled", false);
//				};
//				localStorage.setItem("Screenshots", JSON.stringify(objImages));
//				$(this).parent().remove();
//			});
//		}
//
//	}
//
//});
},{"./constants":5,"./modal":9}],12:[function(require,module,exports){
var _window = require('./windows');

var Transitions = function(){
    this.states = _window;
    this.states.initWindows();
};

Transitions.prototype.initialize = function(){
    var initialWindow = localStorage.getItem("currentWindow") == undefined ? this.states.defaultId : localStorage.getItem("currentWindow");
    switch (initialWindow) {
        case "loginWindow":
            this.states.hideLoading();
            this.states.showWindowNow(initialWindow, "slideInLeft");
            localStorage.setItem("currentWindow", initialWindow);
            break;
        case "main":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("request", "slideOutRight");
            this.states.hideWindowNow("quickLinks", "slideOutRight");
            this.states.hideWindowNow("bookmarks", "slideOutRight");
            localStorage.setItem("currentWindow", "main");
            break;
        case "request":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("quickLinks", "slideOutRight");
            this.states.hideWindowNow("bookmarks", "slideOutRight");
            localStorage.setItem("currentWindow", "request");
            break;
        case "quickLinks":
            this.states.hideLoading();
            this.states.hideWindowNow("loginWindow", "slideOutLeft");
            this.states.hideWindowNow("request", "slideOutRight");
            localStorage.setItem("currentWindow", "quickLinks");
            break;
        default:
            console.warn("showWindow has not been implemented for window: " + initialWindow);
            break;
    };
};
Transitions.prototype.loginSuccess = function(){
    this.states.hideLoading();
    if(localStorage.getItem("currentWindow") == "loginWindow"){
        this.states.hideWindow("loginWindow", "slideOutLeft");
        this.states.hideWindowNow("request", "slideOutRight");
        this.states.hideWindowNow("quickLinks", "slideOutRight");
        localStorage.setItem("currentWindow", "main");
    };
};
Transitions.prototype.checkLogin = function(){
    this.states.showLoading();
};
Transitions.prototype.loginFail = function(){
    this.states.hideLoading();
};
Transitions.prototype.loggedOut = function(){
    //Ideally we want to show a modal for this login instead of going to the orig login
    var initialWindow = localStorage.getItem("currentWindow");
    this.states.showWindowNow("loginWindow", "slideInLeft");
    this.states.hideLoading();
    if(initialWindow == "request"){
        localStorage.setItem("currentWindow", "request")
    }
};
Transitions.prototype.loggedIn = function(){
    this.states.hideLoading();
    this.states.hideWindowNow("loginWindow", "slideOutLeft");
    if(localStorage.getItem("currentWindow") == "loginWindow"){
        this.states.hideWindowNow("request", "slideOutRight");
        this.states.hideWindowNow("quickLinks", "slideOutRight");
        localStorage.setItem("currentWindow", "main");
    }
};
Transitions.prototype.logOut = function(){
    this.states.hideLoading();
    this.states.showWindow("loginWindow", "slideInLeft");
    localStorage.setItem("currentWindow", "loginWindow");
};
Transitions.prototype.createRequest = function(){
    this.states.showWindow("request", "slideInRight");
    localStorage.setItem("currentWindow", "request");
};
Transitions.prototype.cancelRequest = function(){
    this.states.showWindow("request", "slideOutRight");
    localStorage.setItem("currentWindow", "main");
};
Transitions.prototype.showQuickLinks = function(){
    this.states.showWindow("quickLinks", "slideInRight");
    localStorage.setItem("currentWindow", "quickLinks");
};
Transitions.prototype.hideQuickLinks = function(){
    this.states.showWindow("quickLinks", "slideOutRight");
    localStorage.setItem("currentWindow", "main");
};
Transitions.prototype.showBookmarks = function(){
    this.states.showWindow("bookmarks", "slideInRight");
    localStorage.setItem("currentWindow", "bookmarks");
};
Transitions.prototype.hideBookmarks = function(){
    this.states.showWindow("bookmarks", "slideOutRight");
    localStorage.setItem("currentWindow", "main");
};

module.exports = Transitions;
},{"./windows":15}],13:[function(require,module,exports){
var _constants = new (require("./constants"));

var URLManagement = function(){
    this.softwareURL = "https://software.enablon.com/Software/?u=";
    this.requestPath = "/Referent/Rqtes";
    this.addMode = "&tm=1&ext=1";
};

URLManagement.prototype.createRequestURL = function(){
    return (this.softwareURL + this.requestPath + this.addMode);
};

URLManagement.prototype.getCurrentTabURL = function(){
	return new Promise(function(resolve, reject){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            var url = decodeURI(tabs[0].url).toLowerCase();
            resolve(url)
        });
	})
};

URLManagement.prototype.whenLoggedIn = function whenLoggedIn(siteUrl, callback){
	var self = this;
	this.getSiteBuilds(siteUrl).then(function(data){
		var $loginForm = $(data).filter("#LoginForm");
		if(!(loginForm.length > 0)){
			callback(data)
		} else{
			console.warn("You are logged out.")
		}
	});
}

URLManagement.prototype.getSiteData = function getSiteData(siteUrl){
	return new Promise(function(resolve, reject){
		$.get(siteUrl, function (data, status) {
			if(status === 'success') {
				resolve(data);
			} else{
				reject(new Error("Unable to connect to: " + siteUrl))
			}
		})
	})
}

URLManagement.prototype.getVersionPageUrl = function getVersionPageUrl(siteUrl){
	var versionUrl;
	var urlSplit = siteUrl.split("/");

	var isValidUrl = siteUrl.indexOf("enablon.com/") > -1 || siteUrl.indexOf("localhost/") > -1;

	if(isValidUrl){
		var domain = urlSplit[2].toLowerCase().split(".")[0];
		if(domain != "localhost"){
			versionUrl = urlSplit.slice(0, 5).join("/");
		}else{
			versionUrl = urlSplit.slice(0, 4).join("/");
		}

		versionUrl += '/?u=/ver'
	};

	return versionUrl;
}

URLManagement.prototype.getReleaseData = function(input){
	var self = this;
	return new Promise(function(resolve, reject){
		var appVerPageUrl = "https://software.enablon.com/Software/?u=/Referent/PCaRel";
		$.ajax({
			url: appVerPageUrl,
			type: "POST",
			data: JSON.stringify({
				fct_name: "ocGetReleases",
				"params": {sName: input}
			}),
			contentType: "application/json",
			dataType: "json",
			success: function (data) {
				if(data.status == "OK") {
					var releases = data.data;
					var invReleases = {}
					for(var obj in releases){
						invReleases[releases[obj].Name] = {key: obj, funcComponents: releases[obj].FunctionalComponents}
					}

					resolve(JSON.stringify(invReleases))
				}else{
					this.error(data);
				}
			},
			error: function (data) {
				resolve({err: data.error})
			}
		});
	});
};

URLManagement.prototype.getProductComponentData = function(input){
	var self = this;
	return new Promise(function(resolve, reject){
		var appVerPageUrl = "https://software.enablon.com/Software/?u=/Referent/PCaRel";
		$.ajax({
			url: appVerPageUrl,
			type: "POST",
			data: JSON.stringify({
				fct_name: "ocGetProductComponents",
				"params": {sName: input}
			}),
			contentType: "application/json",
			dataType: "json",
			success: function (data) {
				if(data.status == "OK") {
					var components = data.data;
					var invComponents = {}
					for(var obj in components){
						invComponents[components[obj].Name] = {key: obj, path: components[obj].Path}
					}

					resolve(JSON.stringify(invComponents))
				}else{
					this.error(data);
				}
			},
			error: function (data) {
				resolve({err: data.error})
			}
		});
	});
};

module.exports = URLManagement;
},{"./constants":5}],14:[function(require,module,exports){
/**
 * Created by pnarielwala on 4/6/2016.
 */
var _modal = require('./modal');
var _constants = new (require('./constants'));

var Version = function(){
    function onInstall() {
        console.log("Extension Installed");
        chrome.browserAction.setBadgeText({text: ""});
        var updateHTML = "Thanks for using ChromeWare!"
        new _modal("success", "ChromeWare Installed!", updateHTML).display();
    }

    function onUpdate() {
        console.log("Extension Updated");
        chrome.browserAction.setBadgeText({text: ""});
        var updateHTML =
            "<div>" +
                "<h4>Changes:</h4>" +
                "<ul class='errorList'>" +
                    "<li>Added badge to indicate update</li>" +
                    "<li>Fixed a remembering dropdowns issue</li>" +
                "</ul>" +
            "<div>";
        new _modal("success", "ChromeWare has Updated!", updateHTML, _constants.ebMsgHTML).display();
    }

    function getVersion() {
        var details = chrome.app.getDetails();
        return details.version;
    }

    // Check if the version has changed.
    var currVersion = getVersion();
    var prevVersion = localStorage['version']
    if (currVersion != prevVersion) {
        // Check if we just installed this extension.
        if (typeof prevVersion == 'undefined') {
            onInstall();
        } else {
            onUpdate();
        }
        localStorage['version'] = currVersion;
    }
};

module.exports = Version;
},{"./constants":5,"./modal":9}],15:[function(require,module,exports){
var Windows = function(){
    this.defaultId = undefined;
    this.loadingId = undefined;
};

Windows.prototype.initWindows = function(){
    jQuery.ajaxSetup({async:false});
    $.get("body.html")
        .done(function(data){
            $("#app").append(data)
        });
    $.get("login.html")
        .done(function(data){
            $("#loginWindow").append(data)
        });
    $.get("main.html")
        .done(function(data){
            $("#main").append(data)
        });
    $.get("request.html")
        .done(function(data){
            $("#request").append(data)
        });
    $.get("modal.html")
        .done(function(data){
            $("#modal").append(data)
        });
    $.get("quickLinks.html")
        .done(function(data){
            $("#quickLinks").append(data)
        });
    $.get("bookmarks.html")
        .done(function(data){
            $("#bookmarks").append(data)
        });
    jQuery.ajaxSetup({async:true});
    this.setLoadingWindow();
    this.setDefaultWindow();
};
Windows.prototype.setDefaultWindow = function(){
    if($(".default").length === 1){
        var defaultWindow = $(".default").attr("id");
        if(defaultWindow !== undefined && defaultWindow !== null){
            this.defaultId = defaultWindow;
        }else{
            console.warn("Default window has no id assigned: " + defaultWindow)
        }
    }else{
        console.warn("Default window has not been defined")
    }
};
Windows.prototype.setLoadingWindow = function(){
    if($(".loading-window").length === 1){
        var loadingWindow = $(".loading-window").attr("id");
        if(loadingWindow !== undefined && loadingWindow !== null){
            loadingId = loadingWindow;
        }else{
            console.warn("Loading window has no id assigned")
        }
    }else{
        console.warn("Loading window has not been defined")
    }
};
Windows.prototype.hideWindow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated").addClass(animation);
};
Windows.prototype.hideWindowNow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated-now").addClass(animation);
};
Windows.prototype.showWindow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated").addClass(animation);
    localStorage.setItem("currentWindow", id);
};
Windows.prototype.showWindowNow = function(id, animation){
    this.removeClasses(id);
    $("#" + id).addClass("animated-now").addClass(animation);
    localStorage.setItem("currentWindow", id);
};
Windows.prototype.removeClasses = function(id){
    $("#" + id).removeClass("animated-now")
        .removeClass("animated")
        .removeClass("slideInLeft")
        .removeClass("slideInRight")
        .removeClass("slideOutLeft")
        .removeClass("slideOutRight");
};
Windows.prototype.showLoading = function(){
    $("#" + loadingId).show();
};
Windows.prototype.hideLoading = function(){
    $("#" + loadingId).hide();
};
Windows.prototype.loadCurrentWindow = function(){
    this.showWindow(localStorage.getItem("currentWindow") == undefined ? this.defaultId : localStorage.getItem("currentWindow"))
};

module.exports = new Windows();
},{}]},{},[7])