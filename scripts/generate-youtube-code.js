(function (window) {

    'use strict';

    window.code = window.code || {};

    window.code.generateYoutubeCode = function () {

        var dataYoutubeGenerateButton = '[data-youtube-generate-button]';
        var dataYoutubeUrl = '[data-youtube-url]';
        var dataPreview = '[data-preview]';
        var dataCode = '[data-code]';
        var dataCodeBox = '[data-code-box]';
        var dataYoutubeError = '[data-youtube-error]';

        var generateButton = document.querySelector(dataYoutubeGenerateButton);
        var youtubeUrl = document.querySelector(dataYoutubeUrl);
        var preview = document.querySelector(dataPreview);
        var code = document.querySelector(dataCode);
        var codeBox = document.querySelector(dataCodeBox);
        var youtubeError = document.querySelector(dataYoutubeError);

        function init() {
            bindEventListeners();
            youtubeError.style.display = 'none';
        }

        function bindEventListeners() {
            generateButton.addEventListener('click', handleYoutubeGeneration)
        }

        function handleYoutubeGeneration() {
            createPreview();
        }

        function createPreview() {
            var id = youtubeParser(document.querySelector(dataYoutubeUrl).value);

            if (id === false) {
                youtubeError.style.display = 'block';
                return;
            }
            
            var codeTemplate = Handlebars.templates['youtube-embed-template.hbs'];
            var viewTemplate = Handlebars.templates['youtube-visual-template.hbs'];

            var previewHeading = '<label class="form__label">Preview:</label>';
            var codeHeading = '<label class="form__label">Code:</label>';

            preview.innerHTML = previewHeading + viewTemplate({url:id});
            code.innerHTML = codeHeading;
            codeBox.innerHTML = codeTemplate({url:id});
            codeBox.style.display = 'block';
            youtubeError.style.display = 'none';
            createEmbed();
	    }

        function youtubeParser(url){
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = url.match(regExp);
            return (match&&match[7].length==11)? match[7] : false;
        }

        function createEmbed() {
            var button = document.querySelector('[data-youtube-button]');

            button.addEventListener('click', createIframe);
        }

        function createIframe(event) {  
            var url = event.target.dataset.youtubeButton;
            var youtubePlaceholder = event.target.parentNode;

            var htmlString = '<div class="video__youtube"> <iframe class="video__iframe" src="' + url + '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';

            youtubePlaceholder.style.display = 'none';
            youtubePlaceholder.insertAdjacentHTML('beforebegin', htmlString);
            youtubePlaceholder.parentNode.removeChild(youtubePlaceholder);
        }

        return {
           init: init
        }
    };

})(window)

ready();

function ready() {
    var generateYoutubeCode = new code.generateYoutubeCode()

    if (document.readyState != 'loading') {
        page.init()
    } else {
        document.addEventListener('DOMContentLoaded', generateYoutubeCode.init);
    }
}