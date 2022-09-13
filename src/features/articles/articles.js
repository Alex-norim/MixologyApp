import { Model } from "./model";
import { View } from "./view";

export const Articles = {
    init : function(_root) {
        // dom elements
        const root = _root;
        const contentRoot = root.querySelector('.article');
        const renderErrorMessage = View.renderErrorMessage;
        const ArticleNest = contentRoot.querySelector('.article-text')
        const errorNest = contentRoot;
        // 
        const RenderArticles = View.renderArticles;
        const ArticleMenu = root.querySelector('.article-menu');
        // menu
        const initLocalMenu = Model.initArticleMenu;
        const MenuItemhandler = Model.menuItemHandler;
        const bindSlider = Model.articleMenuSlider;
        const getWidthSum = Model.childWidthSum;
        //
        const showHighRatingArticle = Model.bestArticle;
        // initialize menu
        initLocalMenu({
            element : ArticleMenu , 
            childHandler : MenuItemhandler ,
            calculateWidth : getWidthSum,
            drawArticles : RenderArticles,
            makeSlider : bindSlider,
            articleNest : ArticleNest
        });
        // show Article
        showHighRatingArticle( {
            renderList : RenderArticles,
            renderError : renderErrorMessage ,
            listRoot : ArticleNest ,
            errorRoot : errorNest
        });
    }
}