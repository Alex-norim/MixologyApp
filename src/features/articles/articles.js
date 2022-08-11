import { Model } from "./model";
import { View } from "./view";

export const Articles = {
    init : function(_root) {
        // dom elements
        const root = _root;
        const contentRoot = root.querySelector('.article');
        const ArticleMenuItems = contentRoot.getElementsByClassName('article-menu-item');
        const ArticleNest = contentRoot.querySelector('.article-text')
        // binder of handlers
        const Binder = Model.bindHandlersTo;
        // 
        const MenuItemhandler = Model.menuItemHandler;
        const RenderArticles = View.renderArticles;

        Binder(ArticleMenuItems , (e) => {
            MenuItemhandler(e , RenderArticles , ArticleNest)
        } , 'click');
    }
}