import createElement from '../appSettings/createElement.js';

export const View = {
    renderArticles : (arrayArticles , rootElement) => {
        const Error = typeof arrayArticles === 'string' ? true : false;
        rootElement.innerHTML = '';
        if ( Error ) {
            rootElement.innerHTML = `<p class="article-error">${arrayArticles}</p>`;
            return false;
        }
        for (const article of arrayArticles) {
            const title = new createElement({
                tagname : 'h4' ,
                attr : {
                    class : 'article-name',
                },
                content : article.articlename
            });
            const articleText = new createElement({
                tagname : 'p' ,
                attr : {
                    class : 'article-content'
                },
                content : article.text + 'webpack 5.71.0 compiled successfully in 73 ms asset index.js 256 KiB [emitted] (name: main) cached modules 190 KiB [cached] 46 modules runtime modules 937 bytes 4 modules ./src/features/articles/view.js 2.81 KiB [built] [code generated] webpack 5.71.0 compiled successfully in 265 ms asset index.js 256 KiB [emitted] (name: main) cached modules 189 KiB [cached] 45 modules runtime modules 937 bytes 4 modules javascript modules 4.56 KiB ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/public/css/style.css 2.84 KiB [built] ./node_modules/css-loader/dist/cjs.js!./src/public/css/mainmenuContent/article.css 1.71 KiB [built] [code generated] webpack 5.71.0 compiled successfully in 134 ms '
            });
            const authorName = new createElement({
                tagname : 'p' ,
                attr : {
                    class : 'article-author',
                },
                content : "Author: " + article.author
            });
            const wrap = new createElement({
                tagname : 'div' ,
                attr : {
                    class : 'article-wrap',
                }
            });
            wrap.append(title , articleText ,authorName);
            rootElement.append(wrap);
        }

    }
}