(this["webpackJsonp@banana-cake-pop/main"]=this["webpackJsonp@banana-cake-pop/main"]||[]).push([[96],{770:function(e,t,n){"use strict";n.r(t),n.d(t,"getJavaScriptWorker",(function(){return le})),n.d(t,"getTypeScriptWorker",(function(){return de})),n.d(t,"setupJavaScript",(function(){return ce})),n.d(t,"setupTypeScript",(function(){return ue}));var r=n(468),i=n(241),a=n(4),s=n(5),o=n(10),u=n.n(o),c=n(470),l=n(0),d=n(1),p=n(6),f=n(87),g=Object.defineProperty,b=Object.getOwnPropertyDescriptor,h=Object.getOwnPropertyNames,m=Object.prototype.hasOwnProperty,v={};g(v,"__esModule",{value:!0}),function(e,t,n){if(t&&"object"===typeof t||"function"===typeof t){var r,i=Object(p.a)(h(t));try{var a=function(){var i=r.value;m.call(e,i)||"default"===i||g(e,i,{get:function(){return t[i]},enumerable:!(n=b(t,i))||n.enumerable})};for(i.s();!(r=i.n()).done;)a()}catch(s){i.e(s)}finally{i.f()}}}(v,f);var y,k,x,_,O,S,w,j,C,D,L=function(){function e(t,n){var r=this;Object(l.a)(this,e),this._modeId=t,this._defaults=n,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange((function(){return r._stopWorker()})),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange((function(){return r._updateExtraLibs()}))}return Object(d.a)(e,[{key:"_stopWorker",value:function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}},{key:"dispose",value:function(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()}},{key:"_updateExtraLibs",value:function(){var e=Object(c.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._worker){e.next=2;break}return e.abrupt("return");case 2:return t=++this._updateExtraLibsToken,e.next=5,this._worker.getProxy();case 5:if(n=e.sent,this._updateExtraLibsToken===t){e.next=8;break}return e.abrupt("return");case 8:n.updateExtraLibs(this._defaults.getExtraLibs());case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"_getClient",value:function(){var e=this;if(!this._client){this._worker=v.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath,inlayHintsOptions:this._defaults.inlayHintsOptions}});var t=this._worker.getProxy();this._defaults.getEagerModelSync()&&(t=t.then((function(t){return e._worker?e._worker.withSyncedResources(v.editor.getModels().filter((function(t){return t.getLanguageId()===e._modeId})).map((function(e){return e.uri}))):t}))),this._client=t}return this._client}},{key:"getLanguageServiceWorker",value:function(){for(var e,t=this,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return this._getClient().then((function(t){e=t})).then((function(e){if(t._worker)return t._worker.withSyncedResources(r)})).then((function(t){return e}))}}]),e}();(k=y||(y={}))[k.None=0]="None",k[k.CommonJS=1]="CommonJS",k[k.AMD=2]="AMD",k[k.UMD=3]="UMD",k[k.System=4]="System",k[k.ES2015=5]="ES2015",k[k.ESNext=99]="ESNext",(_=x||(x={}))[_.None=0]="None",_[_.Preserve=1]="Preserve",_[_.React=2]="React",_[_.ReactNative=3]="ReactNative",_[_.ReactJSX=4]="ReactJSX",_[_.ReactJSXDev=5]="ReactJSXDev",(S=O||(O={}))[S.CarriageReturnLineFeed=0]="CarriageReturnLineFeed",S[S.LineFeed=1]="LineFeed",(j=w||(w={}))[j.ES3=0]="ES3",j[j.ES5=1]="ES5",j[j.ES2015=2]="ES2015",j[j.ES2016=3]="ES2016",j[j.ES2017=4]="ES2017",j[j.ES2018=5]="ES2018",j[j.ES2019=6]="ES2019",j[j.ES2020=7]="ES2020",j[j.ESNext=99]="ESNext",j[j.JSON=100]="JSON",j[j.Latest=99]="Latest",(D=C||(C={}))[D.Classic=1]="Classic",D[D.NodeJs=2]="NodeJs";var E=function(){function e(t,n,r,i){Object(l.a)(this,e),this._onDidChange=new v.Emitter,this._onDidExtraLibsChange=new v.Emitter,this._extraLibs=Object.create(null),this._removedExtraLibs=Object.create(null),this._eagerModelSync=!1,this.setCompilerOptions(t),this.setDiagnosticsOptions(n),this.setWorkerOptions(r),this.setInlayHintsOptions(i),this._onDidExtraLibsChangeTimeout=-1}return Object(d.a)(e,[{key:"onDidChange",get:function(){return this._onDidChange.event}},{key:"onDidExtraLibsChange",get:function(){return this._onDidExtraLibsChange.event}},{key:"workerOptions",get:function(){return this._workerOptions}},{key:"inlayHintsOptions",get:function(){return this._inlayHintsOptions}},{key:"getExtraLibs",value:function(){return this._extraLibs}},{key:"addExtraLib",value:function(e,t){var n,r=this;if(n="undefined"===typeof t?"ts:extralib-".concat(Math.random().toString(36).substring(2,15)):t,this._extraLibs[n]&&this._extraLibs[n].content===e)return{dispose:function(){}};var i=1;return this._removedExtraLibs[n]&&(i=this._removedExtraLibs[n]+1),this._extraLibs[n]&&(i=this._extraLibs[n].version+1),this._extraLibs[n]={content:e,version:i},this._fireOnDidExtraLibsChangeSoon(),{dispose:function(){var e=r._extraLibs[n];e&&e.version===i&&(delete r._extraLibs[n],r._removedExtraLibs[n]=i,r._fireOnDidExtraLibsChangeSoon())}}}},{key:"setExtraLibs",value:function(e){for(var t in this._extraLibs)this._removedExtraLibs[t]=this._extraLibs[t].version;if(this._extraLibs=Object.create(null),e&&e.length>0){var n,r=Object(p.a)(e);try{for(r.s();!(n=r.n()).done;){var i=n.value,a=i.filePath||"ts:extralib-".concat(Math.random().toString(36).substring(2,15)),s=i.content,o=1;this._removedExtraLibs[a]&&(o=this._removedExtraLibs[a]+1),this._extraLibs[a]={content:s,version:o}}}catch(u){r.e(u)}finally{r.f()}}this._fireOnDidExtraLibsChangeSoon()}},{key:"_fireOnDidExtraLibsChangeSoon",value:function(){var e=this;-1===this._onDidExtraLibsChangeTimeout&&(this._onDidExtraLibsChangeTimeout=window.setTimeout((function(){e._onDidExtraLibsChangeTimeout=-1,e._onDidExtraLibsChange.fire(void 0)}),0))}},{key:"getCompilerOptions",value:function(){return this._compilerOptions}},{key:"setCompilerOptions",value:function(e){this._compilerOptions=e||Object.create(null),this._onDidChange.fire(void 0)}},{key:"getDiagnosticsOptions",value:function(){return this._diagnosticsOptions}},{key:"setDiagnosticsOptions",value:function(e){this._diagnosticsOptions=e||Object.create(null),this._onDidChange.fire(void 0)}},{key:"setWorkerOptions",value:function(e){this._workerOptions=e||Object.create(null),this._onDidChange.fire(void 0)}},{key:"setInlayHintsOptions",value:function(e){this._inlayHintsOptions=e||Object.create(null),this._onDidChange.fire(void 0)}},{key:"setMaximumWorkerIdleTime",value:function(e){}},{key:"setEagerModelSync",value:function(e){this._eagerModelSync=e}},{key:"getEagerModelSync",value:function(){return this._eagerModelSync}}]),e}(),T=new E({allowNonTsExtensions:!0,target:99},{noSemanticValidation:!1,noSyntaxValidation:!1,onlyVisible:!1},{},{}),F=new E({allowNonTsExtensions:!0,allowJs:!0,target:99},{noSemanticValidation:!0,noSyntaxValidation:!1,onlyVisible:!1},{},{});function I(){return Promise.resolve().then(n.bind(null,770))}v.languages.typescript={ModuleKind:y,JsxEmit:x,NewLineKind:O,ScriptTarget:w,ModuleResolutionKind:C,typescriptVersion:"4.4.4",typescriptDefaults:T,javascriptDefaults:F,getTypeScriptWorker:function(){return I().then((function(e){return e.getTypeScriptWorker()}))},getJavaScriptWorker:function(){return I().then((function(e){return e.getJavaScriptWorker()}))}},v.languages.onLanguage("typescript",(function(){return I().then((function(e){return e.setupTypeScript(T)}))})),v.languages.onLanguage("javascript",(function(){return I().then((function(e){return e.setupJavaScript(F)}))}));var N,P,A={};function M(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if("string"===typeof e)return e;if(void 0===e)return"";var r="";if(n){r+=t;for(var i=0;i<n;i++)r+="  "}if(r+=e.messageText,n++,e.next){var a,s=Object(p.a)(e.next);try{for(s.s();!(a=s.n()).done;){var o=a.value;r+=M(o,t,n)}}catch(u){s.e(u)}finally{s.f()}}return r}function R(e){return e?e.map((function(e){return e.text})).join(""):""}A["lib.d.ts"]=!0,A["lib.dom.d.ts"]=!0,A["lib.dom.iterable.d.ts"]=!0,A["lib.es2015.collection.d.ts"]=!0,A["lib.es2015.core.d.ts"]=!0,A["lib.es2015.d.ts"]=!0,A["lib.es2015.generator.d.ts"]=!0,A["lib.es2015.iterable.d.ts"]=!0,A["lib.es2015.promise.d.ts"]=!0,A["lib.es2015.proxy.d.ts"]=!0,A["lib.es2015.reflect.d.ts"]=!0,A["lib.es2015.symbol.d.ts"]=!0,A["lib.es2015.symbol.wellknown.d.ts"]=!0,A["lib.es2016.array.include.d.ts"]=!0,A["lib.es2016.d.ts"]=!0,A["lib.es2016.full.d.ts"]=!0,A["lib.es2017.d.ts"]=!0,A["lib.es2017.full.d.ts"]=!0,A["lib.es2017.intl.d.ts"]=!0,A["lib.es2017.object.d.ts"]=!0,A["lib.es2017.sharedmemory.d.ts"]=!0,A["lib.es2017.string.d.ts"]=!0,A["lib.es2017.typedarrays.d.ts"]=!0,A["lib.es2018.asyncgenerator.d.ts"]=!0,A["lib.es2018.asynciterable.d.ts"]=!0,A["lib.es2018.d.ts"]=!0,A["lib.es2018.full.d.ts"]=!0,A["lib.es2018.intl.d.ts"]=!0,A["lib.es2018.promise.d.ts"]=!0,A["lib.es2018.regexp.d.ts"]=!0,A["lib.es2019.array.d.ts"]=!0,A["lib.es2019.d.ts"]=!0,A["lib.es2019.full.d.ts"]=!0,A["lib.es2019.object.d.ts"]=!0,A["lib.es2019.string.d.ts"]=!0,A["lib.es2019.symbol.d.ts"]=!0,A["lib.es2020.bigint.d.ts"]=!0,A["lib.es2020.d.ts"]=!0,A["lib.es2020.full.d.ts"]=!0,A["lib.es2020.intl.d.ts"]=!0,A["lib.es2020.promise.d.ts"]=!0,A["lib.es2020.sharedmemory.d.ts"]=!0,A["lib.es2020.string.d.ts"]=!0,A["lib.es2020.symbol.wellknown.d.ts"]=!0,A["lib.es2021.d.ts"]=!0,A["lib.es2021.full.d.ts"]=!0,A["lib.es2021.promise.d.ts"]=!0,A["lib.es2021.string.d.ts"]=!0,A["lib.es2021.weakref.d.ts"]=!0,A["lib.es5.d.ts"]=!0,A["lib.es6.d.ts"]=!0,A["lib.esnext.d.ts"]=!0,A["lib.esnext.full.d.ts"]=!0,A["lib.esnext.intl.d.ts"]=!0,A["lib.esnext.promise.d.ts"]=!0,A["lib.esnext.string.d.ts"]=!0,A["lib.esnext.weakref.d.ts"]=!0,A["lib.scripthost.d.ts"]=!0,A["lib.webworker.d.ts"]=!0,A["lib.webworker.importscripts.d.ts"]=!0,A["lib.webworker.iterable.d.ts"]=!0,(P=N||(N={}))[P.None=0]="None",P[P.Block=1]="Block",P[P.Smart=2]="Smart";var K,H,V=function(){function e(t){Object(l.a)(this,e),this._worker=t}return Object(d.a)(e,[{key:"_textSpanToRange",value:function(e,t){var n=e.getPositionAt(t.start),r=e.getPositionAt(t.start+t.length);return{startLineNumber:n.lineNumber,startColumn:n.column,endLineNumber:r.lineNumber,endColumn:r.column}}}]),e}(),W=function(){function e(t){Object(l.a)(this,e),this._worker=t,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}return Object(d.a)(e,[{key:"isLibFile",value:function(e){return!!e&&(0===e.path.indexOf("/lib.")&&!!A[e.path.slice(1)])}},{key:"getOrCreateModel",value:function(e){var t=v.Uri.parse(e),n=v.editor.getModel(t);if(n)return n;if(this.isLibFile(t)&&this._hasFetchedLibFiles)return v.editor.createModel(this._libFiles[t.path.slice(1)],"typescript",t);var r=T.getExtraLibs()[e];return r?v.editor.createModel(r.content,"typescript",t):null}},{key:"_containsLibFile",value:function(e){var t,n=Object(p.a)(e);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(this.isLibFile(r))return!0}}catch(i){n.e(i)}finally{n.f()}return!1}},{key:"fetchLibFilesIfNecessary",value:function(){var e=Object(c.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._containsLibFile(t)){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this._fetchLibFiles();case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_fetchLibFiles",value:function(){var e=this;return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then((function(e){return e.getLibFiles()})).then((function(t){e._hasFetchedLibFiles=!0,e._libFiles=t}))),this._fetchLibFilesPromise}}]),e}();(H=K||(K={}))[H.Warning=0]="Warning",H[H.Error=1]="Error",H[H.Suggestion=2]="Suggestion",H[H.Message=3]="Message";var J=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(e,r,i,a){var s;Object(l.a)(this,n),(s=t.call(this,a))._libFiles=e,s._defaults=r,s._selector=i,s._disposables=[],s._listener=Object.create(null);var o=function(e){if(e.getLanguageId()===i){var t,n=function(){s._defaults.getDiagnosticsOptions().onlyVisible?e.isAttachedToEditor()&&s._doValidate(e):s._doValidate(e)},r=e.onDidChangeContent((function(){clearTimeout(t),t=window.setTimeout(n,500)})),a=e.onDidChangeAttached((function(){s._defaults.getDiagnosticsOptions().onlyVisible&&(e.isAttachedToEditor()?n():v.editor.setModelMarkers(e,s._selector,[]))}));s._listener[e.uri.toString()]={dispose:function(){r.dispose(),a.dispose(),clearTimeout(t)}},n()}},u=function(e){v.editor.setModelMarkers(e,s._selector,[]);var t=e.uri.toString();s._listener[t]&&(s._listener[t].dispose(),delete s._listener[t])};s._disposables.push(v.editor.onDidCreateModel((function(e){return o(e)}))),s._disposables.push(v.editor.onWillDisposeModel(u)),s._disposables.push(v.editor.onDidChangeModelLanguage((function(e){u(e.model),o(e.model)}))),s._disposables.push({dispose:function(){var e,t=Object(p.a)(v.editor.getModels());try{for(t.s();!(e=t.n()).done;){var n=e.value;u(n)}}catch(r){t.e(r)}finally{t.f()}}});var c=function(){var e,t=Object(p.a)(v.editor.getModels());try{for(t.s();!(e=t.n()).done;){var n=e.value;u(n),o(n)}}catch(r){t.e(r)}finally{t.f()}};return s._disposables.push(s._defaults.onDidChange(c)),s._disposables.push(s._defaults.onDidExtraLibsChange(c)),v.editor.getModels().forEach((function(e){return o(e)})),s}return Object(d.a)(n,[{key:"dispose",value:function(){this._disposables.forEach((function(e){return e&&e.dispose()})),this._disposables=[]}},{key:"_doValidate",value:function(){var e=Object(c.a)(u.a.mark((function e(t){var n,r,i,a,s,o,c,l,d,p=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this._worker(t.uri);case 2:if(n=e.sent,!t.isDisposed()){e.next=5;break}return e.abrupt("return");case 5:return r=[],i=this._defaults.getDiagnosticsOptions(),a=i.noSyntaxValidation,s=i.noSemanticValidation,o=i.noSuggestionDiagnostics,a||r.push(n.getSyntacticDiagnostics(t.uri.toString())),s||r.push(n.getSemanticDiagnostics(t.uri.toString())),o||r.push(n.getSuggestionDiagnostics(t.uri.toString())),e.next=12,Promise.all(r);case 12:if((c=e.sent)&&!t.isDisposed()){e.next=15;break}return e.abrupt("return");case 15:return l=c.reduce((function(e,t){return t.concat(e)}),[]).filter((function(e){return-1===(p._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code)})),d=l.map((function(e){return e.relatedInformation||[]})).reduce((function(e,t){return t.concat(e)}),[]).map((function(e){return e.file?v.Uri.parse(e.file.fileName):null})),e.next=19,this._libFiles.fetchLibFilesIfNecessary(d);case 19:if(!t.isDisposed()){e.next=21;break}return e.abrupt("return");case 21:v.editor.setModelMarkers(t,this._selector,l.map((function(e){return p._convertDiagnostics(t,e)})));case 22:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"_convertDiagnostics",value:function(e,t){var n=t.start||0,r=t.length||1,i=e.getPositionAt(n),a=i.lineNumber,s=i.column,o=e.getPositionAt(n+r),u=o.lineNumber,c=o.column,l=[];return t.reportsUnnecessary&&l.push(v.MarkerTag.Unnecessary),t.reportsDeprecated&&l.push(v.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:a,startColumn:s,endLineNumber:u,endColumn:c,message:M(t.messageText,"\n"),code:t.code.toString(),tags:l,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}}},{key:"_convertRelatedInformation",value:function(e,t){var n=this;if(!t)return[];var r=[];return t.forEach((function(t){var i=e;if(t.file&&(i=n._libFiles.getOrCreateModel(t.file.fileName)),i){var a=t.start||0,s=t.length||1,o=i.getPositionAt(a),u=o.lineNumber,c=o.column,l=i.getPositionAt(a+s),d=l.lineNumber,p=l.column;r.push({resource:i.uri,startLineNumber:u,startColumn:c,endLineNumber:d,endColumn:p,message:M(t.messageText,"\n")})}})),r}},{key:"_tsDiagnosticCategoryToMarkerSeverity",value:function(e){switch(e){case 1:return v.MarkerSeverity.Error;case 3:return v.MarkerSeverity.Info;case 0:return v.MarkerSeverity.Warning;case 2:return v.MarkerSeverity.Hint}return v.MarkerSeverity.Info}}]),n}(V),B=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"triggerCharacters",get:function(){return["."]}},{key:"provideCompletionItems",value:function(){var e=Object(c.a)(u.a.mark((function e(t,r,i,a){var s,o,c,l,d,p,f;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.getWordUntilPosition(r),o=new v.Range(r.lineNumber,s.startColumn,r.lineNumber,s.endColumn),c=t.uri,l=t.getOffsetAt(r),e.next=6,this._worker(c);case 6:if(d=e.sent,!t.isDisposed()){e.next=9;break}return e.abrupt("return");case 9:return e.next=11,d.getCompletionsAtPosition(c.toString(),l);case 11:if((p=e.sent)&&!t.isDisposed()){e.next=14;break}return e.abrupt("return");case 14:return f=p.entries.map((function(e){var i,a=o;if(e.replacementSpan){var s=t.getPositionAt(e.replacementSpan.start),u=t.getPositionAt(e.replacementSpan.start+e.replacementSpan.length);a=new v.Range(s.lineNumber,s.column,u.lineNumber,u.column)}var d=[];return-1!==(null===(i=e.kindModifiers)||void 0===i?void 0:i.indexOf("deprecated"))&&d.push(v.languages.CompletionItemTag.Deprecated),{uri:c,position:r,offset:l,range:a,label:e.name,insertText:e.name,sortText:e.sortText,kind:n.convertKind(e.kind),tags:d}})),e.abrupt("return",{suggestions:f});case 16:case"end":return e.stop()}}),e,this)})));return function(t,n,r,i){return e.apply(this,arguments)}}()},{key:"resolveCompletionItem",value:function(){var e=Object(c.a)(u.a.mark((function e(t,r){var i,a,s,o,c,l;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=(i=t).uri,s=i.position,o=i.offset,e.next=6,this._worker(a);case 6:return c=e.sent,e.next=9,c.getCompletionEntryDetails(a.toString(),o,i.label);case 9:if(l=e.sent){e.next=12;break}return e.abrupt("return",i);case 12:return e.abrupt("return",{uri:a,position:s,label:l.name,kind:n.convertKind(l.kind),detail:R(l.displayParts),documentation:{value:n.createDocumentationString(l)}});case 13:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}],[{key:"convertKind",value:function(e){switch(e){case Z.primitiveType:case Z.keyword:return v.languages.CompletionItemKind.Keyword;case Z.variable:case Z.localVariable:return v.languages.CompletionItemKind.Variable;case Z.memberVariable:case Z.memberGetAccessor:case Z.memberSetAccessor:return v.languages.CompletionItemKind.Field;case Z.function:case Z.memberFunction:case Z.constructSignature:case Z.callSignature:case Z.indexSignature:return v.languages.CompletionItemKind.Function;case Z.enum:return v.languages.CompletionItemKind.Enum;case Z.module:return v.languages.CompletionItemKind.Module;case Z.class:return v.languages.CompletionItemKind.Class;case Z.interface:return v.languages.CompletionItemKind.Interface;case Z.warning:return v.languages.CompletionItemKind.File}return v.languages.CompletionItemKind.Property}},{key:"createDocumentationString",value:function(e){var t=R(e.documentation);if(e.tags){var n,r=Object(p.a)(e.tags);try{for(r.s();!(n=r.n()).done;){var i=n.value;t+="\n\n".concat(U(i))}}catch(a){r.e(a)}finally{r.f()}}return t}}]),n}(V);function U(e){var t="*@".concat(e.name,"*");if("param"===e.name&&e.text){var n=Object(i.a)(e.text),r=n[0],a=n.slice(1);t+="`".concat(r.text,"`"),a.length>0&&(t+=" \u2014 ".concat(a.map((function(e){return e.text})).join(" ")))}else Array.isArray(e.text)?t+=" \u2014 ".concat(e.text.map((function(e){return e.text})).join(" ")):e.text&&(t+=" \u2014 ".concat(e.text));return t}var z=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){var e;return Object(l.a)(this,n),(e=t.apply(this,arguments)).signatureHelpTriggerCharacters=["(",","],e}return Object(d.a)(n,[{key:"provideSignatureHelp",value:function(){var e=Object(c.a)(u.a.mark((function e(t,r,i,a){var s,o,c,l,d;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,o=t.getOffsetAt(r),e.next=4,this._worker(s);case 4:if(c=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,c.getSignatureHelpItems(s.toString(),o,{triggerReason:n._toSignatureHelpTriggerReason(a)});case 9:if((l=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return d={activeSignature:l.selectedItemIndex,activeParameter:l.argumentIndex,signatures:[]},l.items.forEach((function(e){var t={label:"",parameters:[]};t.documentation={value:R(e.documentation)},t.label+=R(e.prefixDisplayParts),e.parameters.forEach((function(n,r,i){var a=R(n.displayParts),s={label:a,documentation:{value:R(n.documentation)}};t.label+=a,t.parameters.push(s),r<i.length-1&&(t.label+=R(e.separatorDisplayParts))})),t.label+=R(e.suffixDisplayParts),d.signatures.push(t)})),e.abrupt("return",{value:d,dispose:function(){}});case 15:case"end":return e.stop()}}),e,this)})));return function(t,n,r,i){return e.apply(this,arguments)}}()}],[{key:"_toSignatureHelpTriggerReason",value:function(e){switch(e.triggerKind){case v.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case v.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};case v.languages.SignatureHelpTriggerKind.Invoke:default:return{kind:"invoked"}}}}]),n}(V),X=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"provideHover",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n,r){var i,a,s,o,c,l,d;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,a=t.getOffsetAt(n),e.next=4,this._worker(i);case 4:if(s=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,s.getQuickInfoAtPosition(i.toString(),a);case 9:if((o=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return c=R(o.documentation),l=o.tags?o.tags.map((function(e){return U(e)})).join("  \n\n"):"",d=R(o.displayParts),e.abrupt("return",{range:this._textSpanToRange(t,o.textSpan),contents:[{value:"```typescript\n"+d+"\n```\n"},{value:c+(l?"\n\n"+l:"")}]});case 16:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()}]),n}(V),G=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"provideDocumentHighlights",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n,r){var i,a,s,o,c=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,a=t.getOffsetAt(n),e.next=4,this._worker(i);case 4:if(s=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,s.getOccurrencesAtPosition(i.toString(),a);case 9:if((o=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.abrupt("return",o.map((function(e){return{range:c._textSpanToRange(t,e.textSpan),kind:e.isWriteAccess?v.languages.DocumentHighlightKind.Write:v.languages.DocumentHighlightKind.Text}})));case 13:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()}]),n}(V),q=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(e,r){var i;return Object(l.a)(this,n),(i=t.call(this,r))._libFiles=e,i}return Object(d.a)(n,[{key:"provideDefinition",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n,r){var i,a,s,o,c,l,d,f,g;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=t.uri,a=t.getOffsetAt(n),e.next=4,this._worker(i);case 4:if(s=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,s.getDefinitionAtPosition(i.toString(),a);case 9:if((o=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,this._libFiles.fetchLibFilesIfNecessary(o.map((function(e){return v.Uri.parse(e.fileName)})));case 14:if(!t.isDisposed()){e.next=16;break}return e.abrupt("return");case 16:c=[],l=Object(p.a)(o);try{for(l.s();!(d=l.n()).done;)f=d.value,(g=this._libFiles.getOrCreateModel(f.fileName))&&c.push({uri:g.uri,range:this._textSpanToRange(g,f.textSpan)})}catch(r){l.e(r)}finally{l.f()}return e.abrupt("return",c);case 20:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()}]),n}(V),Q=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(e,r){var i;return Object(l.a)(this,n),(i=t.call(this,r))._libFiles=e,i}return Object(d.a)(n,[{key:"provideReferences",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n,r,i){var a,s,o,c,l,d,f,g,b;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,s=t.getOffsetAt(n),e.next=4,this._worker(a);case 4:if(o=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,o.getReferencesAtPosition(a.toString(),s);case 9:if((c=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.next=14,this._libFiles.fetchLibFilesIfNecessary(c.map((function(e){return v.Uri.parse(e.fileName)})));case 14:if(!t.isDisposed()){e.next=16;break}return e.abrupt("return");case 16:l=[],d=Object(p.a)(c);try{for(d.s();!(f=d.n()).done;)g=f.value,(b=this._libFiles.getOrCreateModel(g.fileName))&&l.push({uri:b.uri,range:this._textSpanToRange(b,g.textSpan)})}catch(r){d.e(r)}finally{d.f()}return e.abrupt("return",l);case 20:case"end":return e.stop()}}),e,this)})));return function(t,n,r,i){return e.apply(this,arguments)}}()}]),n}(V),Y=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"provideDocumentSymbols",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n){var r,i,a,s,o,c=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.uri,e.next=3,this._worker(r);case 3:if(i=e.sent,!t.isDisposed()){e.next=6;break}return e.abrupt("return");case 6:return e.next=8,i.getNavigationBarItems(r.toString());case 8:if((a=e.sent)&&!t.isDisposed()){e.next=11;break}return e.abrupt("return");case 11:return s=function e(n,r,i){var a={name:r.text,detail:"",kind:$[r.kind]||v.languages.SymbolKind.Variable,range:c._textSpanToRange(t,r.spans[0]),selectionRange:c._textSpanToRange(t,r.spans[0]),tags:[]};if(i&&(a.containerName=i),r.childItems&&r.childItems.length>0){var s,o=Object(p.a)(r.childItems);try{for(o.s();!(s=o.n()).done;){e(n,s.value,a.name)}}catch(u){o.e(u)}finally{o.f()}}n.push(a)},o=[],a.forEach((function(e){return s(o,e)})),e.abrupt("return",o);case 15:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),n}(V),Z=function e(){Object(l.a)(this,e)};Z.unknown="",Z.keyword="keyword",Z.script="script",Z.module="module",Z.class="class",Z.interface="interface",Z.type="type",Z.enum="enum",Z.variable="var",Z.localVariable="local var",Z.function="function",Z.localFunction="local function",Z.memberFunction="method",Z.memberGetAccessor="getter",Z.memberSetAccessor="setter",Z.memberVariable="property",Z.constructorImplementation="constructor",Z.callSignature="call",Z.indexSignature="index",Z.constructSignature="construct",Z.parameter="parameter",Z.typeParameter="type parameter",Z.primitiveType="primitive type",Z.label="label",Z.alias="alias",Z.const="const",Z.let="let",Z.warning="warning";var $=Object.create(null);$[Z.module]=v.languages.SymbolKind.Module,$[Z.class]=v.languages.SymbolKind.Class,$[Z.enum]=v.languages.SymbolKind.Enum,$[Z.interface]=v.languages.SymbolKind.Interface,$[Z.memberFunction]=v.languages.SymbolKind.Method,$[Z.memberVariable]=v.languages.SymbolKind.Property,$[Z.memberGetAccessor]=v.languages.SymbolKind.Property,$[Z.memberSetAccessor]=v.languages.SymbolKind.Property,$[Z.variable]=v.languages.SymbolKind.Variable,$[Z.const]=v.languages.SymbolKind.Variable,$[Z.localVariable]=v.languages.SymbolKind.Variable,$[Z.variable]=v.languages.SymbolKind.Variable,$[Z.function]=v.languages.SymbolKind.Function,$[Z.localFunction]=v.languages.SymbolKind.Function;var ee,te,ne=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"_convertTextChanges",value:function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}}}],[{key:"_convertOptions",value:function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:2,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}}}]),n}(V),re=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"provideDocumentRangeFormattingEdits",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n,r,i){var a,s,o,c,l,d=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,s=t.getOffsetAt({lineNumber:n.startLineNumber,column:n.startColumn}),o=t.getOffsetAt({lineNumber:n.endLineNumber,column:n.endColumn}),e.next=5,this._worker(a);case 5:if(c=e.sent,!t.isDisposed()){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,c.getFormattingEditsForRange(a.toString(),s,o,ne._convertOptions(r));case 10:if((l=e.sent)&&!t.isDisposed()){e.next=13;break}return e.abrupt("return");case 13:return e.abrupt("return",l.map((function(e){return d._convertTextChanges(t,e)})));case 14:case"end":return e.stop()}}),e,this)})));return function(t,n,r,i){return e.apply(this,arguments)}}()}]),n}(ne),ie=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"autoFormatTriggerCharacters",get:function(){return[";","}","\n"]}},{key:"provideOnTypeFormattingEdits",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n,r,i,a){var s,o,c,l,d=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.uri,o=t.getOffsetAt(n),e.next=4,this._worker(s);case 4:if(c=e.sent,!t.isDisposed()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,c.getFormattingEditsAfterKeystroke(s.toString(),o,r,ne._convertOptions(i));case 9:if((l=e.sent)&&!t.isDisposed()){e.next=12;break}return e.abrupt("return");case 12:return e.abrupt("return",l.map((function(e){return d._convertTextChanges(t,e)})));case 13:case"end":return e.stop()}}),e,this)})));return function(t,n,r,i,a){return e.apply(this,arguments)}}()}]),n}(ne),ae=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"provideCodeActions",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n,r,i){var a,s,o,c,l,d,p,f,g=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,s=t.getOffsetAt({lineNumber:n.startLineNumber,column:n.startColumn}),o=t.getOffsetAt({lineNumber:n.endLineNumber,column:n.endColumn}),c=ne._convertOptions(t.getOptions()),l=r.markers.filter((function(e){return e.code})).map((function(e){return e.code})).map(Number),e.next=7,this._worker(a);case 7:if(d=e.sent,!t.isDisposed()){e.next=10;break}return e.abrupt("return");case 10:return e.next=12,d.getCodeFixesAtPosition(a.toString(),s,o,l,c);case 12:if((p=e.sent)&&!t.isDisposed()){e.next=15;break}return e.abrupt("return",{actions:[],dispose:function(){}});case 15:return f=p.filter((function(e){return 0===e.changes.filter((function(e){return e.isNewFile})).length})).map((function(e){return g._tsCodeFixActionToMonacoCodeAction(t,r,e)})),e.abrupt("return",{actions:f,dispose:function(){}});case 17:case"end":return e.stop()}}),e,this)})));return function(t,n,r,i){return e.apply(this,arguments)}}()},{key:"_tsCodeFixActionToMonacoCodeAction",value:function(e,t,n){var r,i=[],a=Object(p.a)(n.changes);try{for(a.s();!(r=a.n()).done;){var s,o=r.value,u=Object(p.a)(o.textChanges);try{for(u.s();!(s=u.n()).done;){var c=s.value;i.push({resource:e.uri,edit:{range:this._textSpanToRange(e,c.span),text:c.newText}})}}catch(l){u.e(l)}finally{u.f()}}}catch(l){a.e(l)}finally{a.f()}return{title:n.description,edit:{edits:i},diagnostics:t.markers,kind:"quickfix"}}}]),n}(ne),se=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(e,r){var i;return Object(l.a)(this,n),(i=t.call(this,r))._libFiles=e,i}return Object(d.a)(n,[{key:"provideRenameEdits",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n,r,i){var a,s,o,c,l,d,f,g,b,h,m;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,s=a.toString(),o=t.getOffsetAt(n),e.next=5,this._worker(a);case 5:if(c=e.sent,!t.isDisposed()){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,c.getRenameInfo(s,o,{allowRenameOfImportPath:!1});case 10:if(!1!==(l=e.sent).canRename){e.next=13;break}return e.abrupt("return",{edits:[],rejectReason:l.localizedErrorMessage});case 13:if(void 0===l.fileToRename){e.next=15;break}throw new Error("Renaming files is not supported.");case 15:return e.next=17,c.findRenameLocations(s,o,!1,!1,!1);case 17:if((d=e.sent)&&!t.isDisposed()){e.next=20;break}return e.abrupt("return");case 20:f=[],g=Object(p.a)(d),e.prev=22,g.s();case 24:if((b=g.n()).done){e.next=34;break}if(h=b.value,!(m=this._libFiles.getOrCreateModel(h.fileName))){e.next=31;break}f.push({resource:m.uri,edit:{range:this._textSpanToRange(m,h.textSpan),text:r}}),e.next=32;break;case 31:throw new Error("Unknown file ".concat(h.fileName,"."));case 32:e.next=24;break;case 34:e.next=39;break;case 36:e.prev=36,e.t0=e.catch(22),g.e(e.t0);case 39:return e.prev=39,g.f(),e.finish(39);case 42:return e.abrupt("return",{edits:f});case 43:case"end":return e.stop()}}),e,this,[[22,36,39,42]])})));return function(t,n,r,i){return e.apply(this,arguments)}}()}]),n}(V),oe=function(e){Object(a.a)(n,e);var t=Object(s.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"provideInlayHints",value:function(){var e=Object(c.a)(u.a.mark((function e(t,n,i){var a,s,o,c,l,d,p=this;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.uri,s=a.toString(),o=t.getOffsetAt({lineNumber:n.startLineNumber,column:n.startColumn}),c=t.getOffsetAt({lineNumber:n.endLineNumber,column:n.endColumn}),e.next=6,this._worker(a);case 6:if(l=e.sent,!t.isDisposed()){e.next=9;break}return e.abrupt("return",[]);case 9:return e.next=11,l.provideInlayHints(s,o,c);case 11:return d=e.sent,e.abrupt("return",d.map((function(e){return Object(r.a)(Object(r.a)({},e),{},{position:t.getPositionAt(e.position),kind:p._convertHintKind(e.kind)})})));case 13:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"_convertHintKind",value:function(e){switch(e){case"Parameter":return v.languages.InlayHintKind.Parameter;case"Type":return v.languages.InlayHintKind.Type;default:return v.languages.InlayHintKind.Other}}}]),n}(V);function ue(e){te=pe(e,"typescript")}function ce(e){ee=pe(e,"javascript")}function le(){return new Promise((function(e,t){if(!ee)return t("JavaScript not registered!");e(ee)}))}function de(){return new Promise((function(e,t){if(!te)return t("TypeScript not registered!");e(te)}))}function pe(e,t){var n=new L(t,e),r=function(){return n.getLanguageServiceWorker.apply(n,arguments)},i=new W(r);return v.languages.registerCompletionItemProvider(t,new B(r)),v.languages.registerSignatureHelpProvider(t,new z(r)),v.languages.registerHoverProvider(t,new X(r)),v.languages.registerDocumentHighlightProvider(t,new G(r)),v.languages.registerDefinitionProvider(t,new q(i,r)),v.languages.registerReferenceProvider(t,new Q(i,r)),v.languages.registerDocumentSymbolProvider(t,new Y(r)),v.languages.registerDocumentRangeFormattingEditProvider(t,new re(r)),v.languages.registerOnTypeFormattingEditProvider(t,new ie(r)),v.languages.registerCodeActionProvider(t,new ae(r)),v.languages.registerRenameProvider(t,new se(i,r)),v.languages.registerInlayHintsProvider(t,new oe(r)),new J(i,e,t,r),r}}}]);