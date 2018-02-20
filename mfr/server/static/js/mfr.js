/*! pym.js - v1.3.1 - 2017-07-25 */
!function(a){"function"==typeof define&&define.amd?define(a):"undefined"!=typeof module&&module.exports?module.exports=a():window.pym=a.call(this)}(function(){var a="xPYMx",b={},c=function(a){var b=document.createEvent("Event");b.initEvent("pym:"+a,!0,!0),document.dispatchEvent(b)},d=function(a){var b=new RegExp("[\\?&]"+a.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]")+"=([^&#]*)"),c=b.exec(location.search);return null===c?"":decodeURIComponent(c[1].replace(/\+/g," "))},e=function(a,b){if(("*"===b.xdomain||a.origin.match(new RegExp(b.xdomain+"$")))&&"string"==typeof a.data)return!0},f=function(b,c,d){var e=["pym",b,c,d];return e.join(a)},g=function(b){var c=["pym",b,"(\\S+)","(.*)"];return new RegExp("^"+c.join(a)+"$")},h=Date.now||function(){return(new Date).getTime()},i=function(a,b,c){var d,e,f,g=null,i=0;c||(c={});var j=function(){i=c.leading===!1?0:h(),g=null,f=a.apply(d,e),g||(d=e=null)};return function(){var k=h();i||c.leading!==!1||(i=k);var l=b-(k-i);return d=this,e=arguments,l<=0||l>b?(g&&(clearTimeout(g),g=null),i=k,f=a.apply(d,e),g||(d=e=null)):g||c.trailing===!1||(g=setTimeout(j,l)),f}},j=function(){for(var a=b.autoInitInstances.length,c=a-1;c>=0;c--){var d=b.autoInitInstances[c];d.el.getElementsByTagName("iframe").length&&d.el.getElementsByTagName("iframe")[0].contentWindow||b.autoInitInstances.splice(c,1)}};return b.autoInitInstances=[],b.autoInit=function(a){var d=document.querySelectorAll("[data-pym-src]:not([data-pym-auto-initialized])"),e=d.length;j();for(var f=0;f<e;++f){var g=d[f];g.setAttribute("data-pym-auto-initialized",""),""===g.id&&(g.id="pym-"+f+"-"+Math.random().toString(36).substr(2,5));var h=g.getAttribute("data-pym-src"),i={xdomain:"string",title:"string",name:"string",id:"string",sandbox:"string",allowfullscreen:"boolean",parenturlparam:"string",parenturlvalue:"string",optionalparams:"boolean",trackscroll:"boolean",scrollwait:"number"},k={};for(var l in i)if(null!==g.getAttribute("data-pym-"+l))switch(i[l]){case"boolean":k[l]=!("false"===g.getAttribute("data-pym-"+l));break;case"string":k[l]=g.getAttribute("data-pym-"+l);break;case"number":var m=Number(g.getAttribute("data-pym-"+l));isNaN(m)||(k[l]=m);break;default:console.err("unrecognized attribute type")}var n=new b.Parent(g.id,h,k);b.autoInitInstances.push(n)}return a||c("pym-initialized"),b.autoInitInstances},b.Parent=function(a,b,c){this.id=a,this.url=b,this.el=document.getElementById(a),this.iframe=null,this.settings={xdomain:"*",optionalparams:!0,parenturlparam:"parentUrl",parenturlvalue:window.location.href,trackscroll:!1,scrollwait:100},this.messageRegex=g(this.id),this.messageHandlers={},c=c||{},this._constructIframe=function(){var a=this.el.offsetWidth.toString();this.iframe=document.createElement("iframe");var b="",c=this.url.indexOf("#");for(c>-1&&(b=this.url.substring(c,this.url.length),this.url=this.url.substring(0,c)),this.url.indexOf("?")<0?this.url+="?":this.url+="&",this.iframe.src=this.url+"initialWidth="+a+"&childId="+this.id,this.settings.optionalparams&&(this.iframe.src+="&parentTitle="+encodeURIComponent(document.title),this.iframe.src+="&"+this.settings.parenturlparam+"="+encodeURIComponent(this.settings.parenturlvalue)),this.iframe.src+=b,this.iframe.setAttribute("width","100%"),this.iframe.setAttribute("scrolling","no"),this.iframe.setAttribute("marginheight","0"),this.iframe.setAttribute("frameborder","0"),this.settings.title&&this.iframe.setAttribute("title",this.settings.title),void 0!==this.settings.allowfullscreen&&this.settings.allowfullscreen!==!1&&this.iframe.setAttribute("allowfullscreen",""),void 0!==this.settings.sandbox&&"string"==typeof this.settings.sandbox&&this.iframe.setAttribute("sandbox",this.settings.sandbox),this.settings.id&&(document.getElementById(this.settings.id)||this.iframe.setAttribute("id",this.settings.id)),this.settings.name&&this.iframe.setAttribute("name",this.settings.name);this.el.firstChild;)this.el.removeChild(this.el.firstChild);this.el.appendChild(this.iframe),window.addEventListener("resize",this._onResize),this.settings.trackscroll&&window.addEventListener("scroll",this._throttleOnScroll)},this._onResize=function(){this.sendWidth(),this.settings.trackscroll&&this.sendViewportAndIFramePosition()}.bind(this),this._onScroll=function(){this.sendViewportAndIFramePosition()}.bind(this),this._fire=function(a,b){if(a in this.messageHandlers)for(var c=0;c<this.messageHandlers[a].length;c++)this.messageHandlers[a][c].call(this,b)},this.remove=function(){window.removeEventListener("message",this._processMessage),window.removeEventListener("resize",this._onResize),this.el.removeChild(this.iframe),j()},this._processMessage=function(a){if(e(a,this.settings)&&"string"==typeof a.data){var b=a.data.match(this.messageRegex);if(!b||3!==b.length)return!1;var c=b[1],d=b[2];this._fire(c,d)}}.bind(this),this._onHeightMessage=function(a){var b=parseInt(a);this.iframe.setAttribute("height",b+"px")},this._onNavigateToMessage=function(a){document.location.href=a},this._onScrollToChildPosMessage=function(a){var b=document.getElementById(this.id).getBoundingClientRect().top+window.pageYOffset,c=b+parseInt(a);window.scrollTo(0,c)},this.onMessage=function(a,b){a in this.messageHandlers||(this.messageHandlers[a]=[]),this.messageHandlers[a].push(b)},this.sendMessage=function(a,b){this.el.getElementsByTagName("iframe").length&&(this.el.getElementsByTagName("iframe")[0].contentWindow?this.el.getElementsByTagName("iframe")[0].contentWindow.postMessage(f(this.id,a,b),"*"):this.remove())},this.sendWidth=function(){var a=this.el.offsetWidth.toString();this.sendMessage("width",a)},this.sendViewportAndIFramePosition=function(){var a=this.iframe.getBoundingClientRect(),b=window.innerWidth||document.documentElement.clientWidth,c=window.innerHeight||document.documentElement.clientHeight,d=b+" "+c;d+=" "+a.top+" "+a.left,d+=" "+a.bottom+" "+a.right,this.sendMessage("viewport-iframe-position",d)};for(var d in c)this.settings[d]=c[d];return this._throttleOnScroll=i(this._onScroll.bind(this),this.settings.scrollwait),this.onMessage("height",this._onHeightMessage),this.onMessage("navigateTo",this._onNavigateToMessage),this.onMessage("scrollToChildPos",this._onScrollToChildPosMessage),this.onMessage("parentPositionInfo",this.sendViewportAndIFramePosition),window.addEventListener("message",this._processMessage,!1),this._constructIframe(),this},b.Child=function(b){this.parentWidth=null,this.id=null,this.parentTitle=null,this.parentUrl=null,this.settings={renderCallback:null,xdomain:"*",polling:0,parenturlparam:"parentUrl"},this.timerId=null,this.messageRegex=null,this.messageHandlers={},b=b||{},this.onMessage=function(a,b){a in this.messageHandlers||(this.messageHandlers[a]=[]),this.messageHandlers[a].push(b)},this._fire=function(a,b){if(a in this.messageHandlers)for(var c=0;c<this.messageHandlers[a].length;c++)this.messageHandlers[a][c].call(this,b)},this._processMessage=function(a){if(e(a,this.settings)&&"string"==typeof a.data){var b=a.data.match(this.messageRegex);if(b&&3===b.length){var c=b[1],d=b[2];this._fire(c,d)}}}.bind(this),this._onWidthMessage=function(a){var b=parseInt(a);b!==this.parentWidth&&(this.parentWidth=b,this.settings.renderCallback&&this.settings.renderCallback(b),this.sendHeight())},this.sendMessage=function(a,b){window.parent.postMessage(f(this.id,a,b),"*")},this.sendHeight=function(){var a=document.getElementsByTagName("body")[0].offsetHeight.toString();return this.sendMessage("height",a),a}.bind(this),this.getParentPositionInfo=function(){this.sendMessage("parentPositionInfo")},this.scrollParentTo=function(a){this.sendMessage("navigateTo","#"+a)},this.navigateParentTo=function(a){this.sendMessage("navigateTo",a)},this.scrollParentToChildEl=function(a){var b=document.getElementById(a).getBoundingClientRect().top+window.pageYOffset;this.scrollParentToChildPos(b)},this.scrollParentToChildPos=function(a){this.sendMessage("scrollToChildPos",a.toString())};var g=function(a){var b,d=document.getElementsByTagName("html")[0],e=d.className;try{b=window.self!==window.top?"embedded":"not-embedded"}catch(a){b="embedded"}e.indexOf(b)<0&&(d.className=e?e+" "+b:b,a&&a(b),c("marked-embedded"))};this.remove=function(){window.removeEventListener("message",this._processMessage),this.timerId&&clearInterval(this.timerId)};for(var h in b)this.settings[h]=b[h];this.id=d("childId")||b.id,this.messageRegex=new RegExp("^pym"+a+this.id+a+"(\\S+)"+a+"(.*)$");var i=parseInt(d("initialWidth"));return this.parentUrl=d(this.settings.parenturlparam),this.parentTitle=d("parentTitle"),this.onMessage("width",this._onWidthMessage),window.addEventListener("message",this._processMessage,!1),this.settings.renderCallback&&this.settings.renderCallback(i),this.sendHeight(),this.settings.polling&&(this.timerId=window.setInterval(this.sendHeight,this.settings.polling)),g(b.onMarkedEmbeddedStatus),this},"undefined"!=typeof document&&b.autoInit(!0),b});
/*
* Mfr.js is a library which renders common file formats to be displayed in an iframe.
*/

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        window.mfr = factory.call(this);
    }
})(function() {
    var lib = {};

    function _hasClass(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return (-1 < el.className.indexOf(className));
        }
    }

    function _addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else if (!_hasClass(el, className)) {
            var classes = el.className.split(' ');
            classes.push(className);
            el.className = classes.join(' ');
        }
        return el;
    }

    function _removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            var classes = el.className.split(' ');
            classes.splice(classes.indexOf(className), 1);
            el.className = classes.join(' ');
        }
        return el;
    }

    function _createSpinner(url, imgName) {
        var parser = document.createElement('a');
        parser.href = url;

        var spinner = document.createElement('div');
        var img = document.createElement('img');
        spinner.setAttribute('class', 'mfr-logo-spin text-center');
        imgName = imgName || 'loading.png';
        img.setAttribute('src', parser.protocol + '//' + parser.host + '/static/images/' + imgName);
        spinner.appendChild(img);
        return spinner;
    }

    /**
     * The Render file iframe widget
     *
     * @class Render
     * @param {String} id The id of the div into which the iframe will be rendered.
     * @param {String} url The url of the iframe source.
     * @param {Object} config Configuration to override the default settings.
     * @param {String} imgName The filename of an image in mfr/server/static/images/ to use as a loading spinner
     */
    lib.Render = function (id, url, config, imgName) {
        var self = this;
        self.id = id;
        self.url = url;
        self.config = config;
        self.spinner = _createSpinner(url, imgName);

        self.init = function () {


`
 <script>
        function loadHypothesis() {
            var scriptTag = document.createElement('script');
            scriptTag.src = 'https://hypothes.is/embed.js';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
        }
    </script>

    <button style="padding:10px; margin:10px auto; display:block; font-weight:bold;" onclick="loadHypothesis()">Load Annotations</button>

    <div id="outerContainer">

      <div id="sidebarContainer">
        <div id="toolbarSidebar">
          <div class="splitToolbarButton toggled">
            <button id="viewThumbnail" class="toolbarButton group toggled" title="Show Thumbnails" tabindex="2" data-l10n-id="thumbs">
               <span data-l10n-id="thumbs_label">Thumbnails</span>
            </button>
            <button id="viewOutline" class="toolbarButton group" title="Show Document Outline" tabindex="3" data-l10n-id="outline">
               <span data-l10n-id="outline_label">Document Outline</span>
            </button>
            <button id="viewAttachments" class="toolbarButton group" title="Show Attachments" tabindex="4" data-l10n-id="attachments">
               <span data-l10n-id="attachments_label">Attachments</span>
            </button>
          </div>
        </div>
        <div id="sidebarContent">
          <div id="thumbnailView">
          </div>
          <div id="outlineView" class="hidden">
          </div>
          <div id="attachmentsView" class="hidden">
          </div>
        </div>
      </div>  <!-- sidebarContainer -->

      <div id="mainContainer">
        <div class="findbar hidden doorHanger hiddenSmallView" id="findbar">
          <label for="findInput" class="toolbarLabel" data-l10n-id="find_label">Find:</label>
          <input id="findInput" class="toolbarField" tabindex="91">
          <div class="splitToolbarButton">
            <button class="toolbarButton findPrevious" title="" id="findPrevious" tabindex="92" data-l10n-id="find_previous">
              <span data-l10n-id="find_previous_label">Previous</span>
            </button>
            <div class="splitToolbarButtonSeparator"></div>
            <button class="toolbarButton findNext" title="" id="findNext" tabindex="93" data-l10n-id="find_next">
              <span data-l10n-id="find_next_label">Next</span>
            </button>
          </div>
          <input type="checkbox" id="findHighlightAll" class="toolbarField">
          <label for="findHighlightAll" class="toolbarLabel" tabindex="94" data-l10n-id="find_highlight">Highlight all</label>
          <input type="checkbox" id="findMatchCase" class="toolbarField">
          <label for="findMatchCase" class="toolbarLabel" tabindex="95" data-l10n-id="find_match_case_label">Match case</label>
          <span id="findMsg" class="toolbarLabel"></span>
        </div>  <!-- findbar -->

        <div id="secondaryToolbar" class="secondaryToolbar hidden doorHangerRight">
          <div id="secondaryToolbarButtonContainer">
            <button id="secondaryPresentationMode" class="secondaryToolbarButton presentationMode visibleLargeView" title="Switch to Presentation Mode" tabindex="51" data-l10n-id="presentation_mode">
              <span data-l10n-id="presentation_mode_label">Presentation Mode</span>
            </button>

            <button id="secondaryOpenFile" class="secondaryToolbarButton openFile visibleLargeView hidden" title="Open File" tabindex="52" data-l10n-id="open_file">
              <span data-l10n-id="open_file_label">Open</span>
            </button>

            <button id="secondaryPrint" class="secondaryToolbarButton print visibleMediumView" title="Print" tabindex="53" data-l10n-id="print">
              <span data-l10n-id="print_label">Print</span>
            </button>

            <button id="secondaryDownload" class="secondaryToolbarButton download visibleMediumView hidden" title="Download" tabindex="54" data-l10n-id="download">
              <span data-l10n-id="download_label">Download</span>
            </button>

            <a href="#" id="secondaryViewBookmark" class="secondaryToolbarButton bookmark visibleSmallView hidden" title="Current view (copy or open in new window)" tabindex="55" data-l10n-id="bookmark">
              <span data-l10n-id="bookmark_label">Current View</span>
            </a>

            <div class="horizontalToolbarSeparator visibleLargeView"></div>

            <button id="firstPage" class="secondaryToolbarButton firstPage" title="Go to First Page" tabindex="56" data-l10n-id="first_page">
              <span data-l10n-id="first_page_label">Go to First Page</span>
            </button>
            <button id="lastPage" class="secondaryToolbarButton lastPage" title="Go to Last Page" tabindex="57" data-l10n-id="last_page">
              <span data-l10n-id="last_page_label">Go to Last Page</span>
            </button>

            <div class="horizontalToolbarSeparator"></div>

            <button id="pageRotateCw" class="secondaryToolbarButton rotateCw" title="Rotate Clockwise" tabindex="58" data-l10n-id="page_rotate_cw">
              <span data-l10n-id="page_rotate_cw_label">Rotate Clockwise</span>
            </button>
            <button id="pageRotateCcw" class="secondaryToolbarButton rotateCcw" title="Rotate Counterclockwise" tabindex="59" data-l10n-id="page_rotate_ccw">
              <span data-l10n-id="page_rotate_ccw_label">Rotate Counterclockwise</span>
            </button>

            <div class="horizontalToolbarSeparator"></div>

            <button id="toggleHandTool" class="secondaryToolbarButton handTool" title="Enable hand tool" tabindex="60" data-l10n-id="hand_tool_enable">
              <span data-l10n-id="hand_tool_enable_label">Enable hand tool</span>
            </button>

            <div class="horizontalToolbarSeparator"></div>

            <button id="documentProperties" class="secondaryToolbarButton documentProperties" title="Document Properties..." tabindex="61" data-l10n-id="document_properties">
              <span data-l10n-id="document_properties_label">Document Properties...</span>
            </button>
          </div>
        </div>  <!-- secondaryToolbar -->

        <div class="toolbar">
          <div id="toolbarContainer">
            <div id="toolbarViewer">
              <div id="toolbarViewerLeft">
                <button id="sidebarToggle" class="toolbarButton" title="Toggle Sidebar" tabindex="11" data-l10n-id="toggle_sidebar">
                  <span data-l10n-id="toggle_sidebar_label">Toggle Sidebar</span>
                </button>
                <div class="toolbarButtonSpacer"></div>
                <button id="viewFind" class="toolbarButton group hiddenSmallView" title="Find in Document" tabindex="12" data-l10n-id="findbar">
                   <span data-l10n-id="findbar_label">Find</span>
                </button>
                <div class="splitToolbarButton">
                  <button class="toolbarButton pageUp" title="Previous Page" id="previous" tabindex="13" data-l10n-id="previous">
                    <span data-l10n-id="previous_label">Previous</span>
                  </button>
                  <div class="splitToolbarButtonSeparator"></div>
                  <button class="toolbarButton pageDown" title="Next Page" id="next" tabindex="14" data-l10n-id="next">
                    <span data-l10n-id="next_label">Next</span>
                  </button>
                </div>
                <label id="pageNumberLabel" class="toolbarLabel" for="pageNumber" data-l10n-id="page_label">Page: </label>
                <input type="number" id="pageNumber" class="toolbarField pageNumber" value="1" size="4" min="1" tabindex="15">
                <span id="numPages" class="toolbarLabel"></span>
              </div>
              <div id="toolbarViewerRight">
                <button id="presentationMode" class="toolbarButton presentationMode hiddenLargeView" title="Switch to Presentation Mode" tabindex="31" data-l10n-id="presentation_mode">
                  <span data-l10n-id="presentation_mode_label">Presentation Mode</span>
                </button>

                <button id="openFile" class="toolbarButton openFile hiddenLargeView hidden" title="Open File" tabindex="32" data-l10n-id="open_file">
                  <span data-l10n-id="open_file_label">Open</span>
                </button>

                <button id="print" class="toolbarButton print hiddenMediumView" title="Print" tabindex="33" data-l10n-id="print">
                  <span data-l10n-id="print_label">Print</span>
                </button>

                <button id="download" class="toolbarButton download hiddenMediumView hidden" title="Download" tabindex="34" data-l10n-id="download">
                  <span data-l10n-id="download_label">Download</span>
                </button>
                <!-- <div class="toolbarButtonSpacer"></div> -->
                <a href="#" id="viewBookmark" class="toolbarButton bookmark hiddenSmallView hidden" title="Current view (copy or open in new window)" tabindex="35" data-l10n-id="bookmark">
                  <span data-l10n-id="bookmark_label">Current View</span>
                </a>

                <div class="verticalToolbarSeparator hiddenSmallView"></div>

                <button id="secondaryToolbarToggle" class="toolbarButton" title="Tools" tabindex="36" data-l10n-id="tools">
                  <span data-l10n-id="tools_label">Tools</span>
                </button>
              </div>
              <div class="outerCenter">
                <div class="innerCenter" id="toolbarViewerMiddle">
                  <div class="splitToolbarButton">
                    <button id="zoomOut" class="toolbarButton zoomOut" title="Zoom Out" tabindex="21" data-l10n-id="zoom_out">
                      <span data-l10n-id="zoom_out_label">Zoom Out</span>
                    </button>
                    <div class="splitToolbarButtonSeparator"></div>
                    <button id="zoomIn" class="toolbarButton zoomIn" title="Zoom In" tabindex="22" data-l10n-id="zoom_in">
                      <span data-l10n-id="zoom_in_label">Zoom In</span>
                     </button>
                  </div>
                  <span id="scaleSelectContainer" class="dropdownToolbarButton">
                     <select id="scaleSelect" title="Zoom" tabindex="23" data-l10n-id="zoom">
                      <option id="pageAutoOption" title="" value="auto" selected="selected" data-l10n-id="page_scale_auto">Automatic Zoom</option>
                      <option id="pageActualOption" title="" value="page-actual" data-l10n-id="page_scale_actual">Actual Size</option>
                      <option id="pageFitOption" title="" value="page-fit" data-l10n-id="page_scale_fit">Fit Page</option>
                      <option id="pageWidthOption" title="" value="page-width" data-l10n-id="page_scale_width">Full Width</option>
                      <option id="customScaleOption" title="" value="custom"></option>
                      <option title="" value="0.5" data-l10n-id="page_scale_percent" data-l10n-args='{ "scale": 50 }'>50%</option>
                      <option title="" value="0.75" data-l10n-id="page_scale_percent" data-l10n-args='{ "scale": 75 }'>75%</option>
                      <option title="" value="1" data-l10n-id="page_scale_percent" data-l10n-args='{ "scale": 100 }'>100%</option>
                      <option title="" value="1.25" data-l10n-id="page_scale_percent" data-l10n-args='{ "scale": 125 }'>125%</option>
                      <option title="" value="1.5" data-l10n-id="page_scale_percent" data-l10n-args='{ "scale": 150 }'>150%</option>
                      <option title="" value="2" data-l10n-id="page_scale_percent" data-l10n-args='{ "scale": 200 }'>200%</option>
                      <option title="" value="3" data-l10n-id="page_scale_percent" data-l10n-args='{ "scale": 300 }'>300%</option>
                      <option title="" value="4" data-l10n-id="page_scale_percent" data-l10n-args='{ "scale": 400 }'>400%</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
            <div id="loadingBar">
              <div class="progress">
                <div class="glimmer">
                </div>
              </div>
            </div>
          </div>
        </div>

        <menu type="context" id="viewerContextMenu">
          <menuitem id="contextFirstPage" label="First Page"
                    data-l10n-id="first_page"></menuitem>
          <menuitem id="contextLastPage" label="Last Page"
                    data-l10n-id="last_page"></menuitem>
          <menuitem id="contextPageRotateCw" label="Rotate Clockwise"
                    data-l10n-id="page_rotate_cw"></menuitem>
          <menuitem id="contextPageRotateCcw" label="Rotate Counter-Clockwise"
                    data-l10n-id="page_rotate_ccw"></menuitem>
        </menu>

        <div id="viewerContainer" tabindex="0">
          <div id="viewer" class="pdfViewer"></div>
        </div>

        <div id="errorWrapper" hidden='true'>
          <div id="errorMessageLeft">
            <span id="errorMessage"></span>
            <button id="errorShowMore" data-l10n-id="error_more_info">
              More Information
            </button>
            <button id="errorShowLess" data-l10n-id="error_less_info" hidden='true'>
              Less Information
            </button>
          </div>
          <div id="errorMessageRight">
            <button id="errorClose" data-l10n-id="error_close">
              Close
            </button>
          </div>
          <div class="clearBoth"></div>
          <textarea id="errorMoreInfo" hidden='true' readonly="readonly"></textarea>
        </div>
      </div> <!-- mainContainer -->

      <div id="overlayContainer" class="hidden">
        <div id="passwordOverlay" class="container hidden">
          <div class="dialog">
            <div class="row">
              <p id="passwordText" data-l10n-id="password_label">Enter the password to open this PDF file:</p>
            </div>
            <div class="row">
              <input type="password" id="password" class="toolbarField" />
            </div>
            <div class="buttonRow">
              <button id="passwordCancel" class="overlayButton"><span data-l10n-id="password_cancel">Cancel</span></button>
              <button id="passwordSubmit" class="overlayButton"><span data-l10n-id="password_ok">OK</span></button>
            </div>
          </div>
        </div>
        <div id="documentPropertiesOverlay" class="container hidden">
          <div class="dialog">
            <div class="row">
              <span data-l10n-id="document_properties_file_name">File name:</span> <p id="fileNameField">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_file_size">File size:</span> <p id="fileSizeField">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
              <span data-l10n-id="document_properties_title">Title:</span> <p id="titleField">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_author">Author:</span> <p id="authorField">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_subject">Subject:</span> <p id="subjectField">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_keywords">Keywords:</span> <p id="keywordsField">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_creation_date">Creation Date:</span> <p id="creationDateField">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_modification_date">Modification Date:</span> <p id="modificationDateField">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_creator">Creator:</span> <p id="creatorField">-</p>
            </div>
            <div class="separator"></div>
            <div class="row">
              <span data-l10n-id="document_properties_producer">PDF Producer:</span> <p id="producerField">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_version">PDF Version:</span> <p id="versionField">-</p>
            </div>
            <div class="row">
              <span data-l10n-id="document_properties_page_count">Page Count:</span> <p id="pageCountField">-</p>
            </div>
            <div class="buttonRow">
              <button id="documentPropertiesClose" class="overlayButton"><span data-l10n-id="document_properties_close">Close</span></button>
            </div>
          </div>
        </div>
      </div>  <!-- overlayContainer -->

    </div> <!-- outerContainer -->
    <div id="printContainer"></div>
<div id="mozPrintCallback-shim" hidden>
  <style scoped>
#mozPrintCallback-shim {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999999;

  display: block;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
}
#mozPrintCallback-shim[hidden] {
  display: none;
}
@media print {
  #mozPrintCallback-shim {
    display: none;
  }
}

#mozPrintCallback-shim .mozPrintCallback-dialog-box {
  display: inline-block;
  margin: -50px auto 0;
  position: relative;
  top: 45%;
  left: 0;
  min-width: 220px;
  max-width: 400px;

  padding: 9px;

  border: 1px solid hsla(0, 0%, 0%, .5);
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

  background-color: #474747;

  color: hsl(0, 0%, 85%);
  font-size: 16px;
  line-height: 20px;
}
#mozPrintCallback-shim .progress-row {
  clear: both;
  padding: 1em 0;
}
#mozPrintCallback-shim progress {
  width: 100%;
}
#mozPrintCallback-shim .relative-progress {
  clear: both;
  float: right;
}
#mozPrintCallback-shim .progress-actions {
  clear: both;
}
  </style>
  <div class="mozPrintCallback-dialog-box">
    <!-- TODO: Localise the following strings -->
    Preparing document for printing...
    <div class="progress-row">
      <progress value="0" max="100"></progress>
      <span class="relative-progress">0%</span>
    </div>
    <div class="progress-actions">
      <input type="button" value="Cancel" class="mozPrintCallback-cancel">
    </div>
  </div>
</div>

    <style type="text/css">
        #viewerContainer {
             border-bottom: solid 1px #404040;
        }
    </style>
    <script src="/static/js/mfr.js"></script>
    <script src="/static/js/mfr.child.js"></script>
    <script>
        var DEFAULT_URL = '${url}';
    </script>
  </body>
</html>
`

            self.pymParent = new pym.Parent(self.id, self.url, self.config);
            self.pymParent.iframe.setAttribute('allowfullscreen', '');
            self.pymParent.iframe.setAttribute('webkitallowfullscreen', '');
            self.pymParent.iframe.setAttribute('scrolling', 'yes');
            self.pymParent.iframe.setAttribute("seamless", "true");
            self.pymParent.iframe.setAttribute('sandbox', 'allow-scripts allow-popups allow-same-origin');

            self.pymParent.el.appendChild(self.spinner);
            $(self.pymParent.iframe).on('load', function () {
                self.pymParent.el.removeChild(self.spinner);
            });

            self.pymParent.onMessage('embed', function(message) {
                _addClass(self.pymParent.el, 'embed-responsive');
                _addClass(self.pymParent.el, message);
                _addClass(self.pymParent.iframe, 'embed-responsive-item');
            });

            self.pymParent.onMessage('location', function(message) {
                window.location = message;
            });
        };

        self.init();

        self.reload = function () {
            while (self.pymParent.el.firstChild) {
                self.pymParent.el.removeChild(self.pymParent.el.firstChild);
            }

            self.init();
        };

        self.resize = function () {
            self.pymParent.sendMessage('resize', 'x');
        };

        return self;
    };

    return lib;
});
