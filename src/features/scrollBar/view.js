import {createElement} from "../appSettings/commonFunctions.js"
export const View = {
    drawScrollBar : (setting , scrollEvent , scrollBarID , progressBarID) => {
        const scrollbarSet = setting.scrollbar;
        const progressbarSet = setting.progressbar;

        const container = new createElement({
            tagname : 'div',
            attr : {
                style : {
                    ...scrollbarSet,
                    position : 'fixed',
                    "z-index": 100000
                },
                id : scrollBarID
            }
        });
        const progressBar = new createElement({
            tagname : 'div' ,
            attr : {
                style : {
                    ...progressbarSet,
                    position : 'absolute',
                    width : '0'
                },
                id: progressBarID
            }
        });
        const existedScrollBar = document.getElementById(scrollBarID);
        if (existedScrollBar !== null){
            existedScrollBar.remove();
        };
        window.addEventListener('scroll' , scrollEvent)
        container.append(progressBar);
        return container;
    }
}