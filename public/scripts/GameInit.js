const init = (context) => {
    context.totestElement = context.rootElement.querySelector(
        context.selectors.totestElement
    );
    context.shareElement = context.rootElement.querySelector(
        context.selectors.shareElement
    );
    context.card = context.rootElement.querySelector(context.selectors.card);
    context.pretestLoader = context.rootElement.querySelector(
        context.selectors.pretestLoader
    );
    context.pretestMessages = context.pretestLoader.querySelectorAll(
        context.selectors.pretestMessage
    );
    context.topMenu = context.rootElement.querySelector(
        context.selectors.topMenu
    );
    context.header = context.rootElement.querySelector(
        context.selectors.header
    );

    context.testWindow = context.rootElement.querySelector(
        context.selectors.testWindow
    );
    context.headerAlt = context.rootElement.querySelector(
        context.selectors.headerAlt
    );
    context.testPreview = context.rootElement.querySelector(
        context.selectors.testPreview
    );
    context.htmlElement = document.querySelector(context.selectors.htmlElement);
    context.modal = context.rootElement.querySelector(context.selectors.modal);
    context.modalContent = context.modal.querySelector(
        context.selectors.modalContent
    );
    context.modalTitle = context.modalContent.querySelector(
        context.selectors.modalTitle
    );
    context.modalDescription = context.modalContent.querySelector(
        context.selectors.modalDescription
    );
    context.modalYes = context.modalContent.querySelector(
        context.selectors.modalYes
    );
    context.modalNo = context.modalContent.querySelector(
        context.selectors.modalNo
    );
    context.userAvatarPreviewElememt = context.card.querySelector(
        context.selectors.userAvatarPreviewElememt
    );
    context.userNamePreviewElememt = context.card.querySelector(
        context.selectors.userNamePreviewElememt
    );
    context.previewImage = context.card.querySelector(
        context.selectors.previewImage
    );
    context.previewType = context.card.querySelector(
        context.selectors.previewType
    );
    context.previewTitle = context.card.querySelector(
        context.selectors.previewTitle
    );
    context.previewGrade = context.card.querySelector(
        context.selectors.previewGrade
    )        
    context.previewRating = context.card.querySelector(
        context.selectors.previewRating
    )
    context.previewVisitors = context.card.querySelector(
        context.selectors.previewVisitors
    )
    context.previewDescription = context.card.querySelector(
        context.selectors.previewDescription
    );
    context.previewQuestionsAmount = context.card.querySelector(
        context.selectors.previewQuestionsAmount
    );
    context.siteTitle = context.htmlElement.querySelector(
        context.selectors.title
    );
    context.headerAltName = context.headerAlt.querySelector(context.selectors.headerAltName)
};
export { init };
