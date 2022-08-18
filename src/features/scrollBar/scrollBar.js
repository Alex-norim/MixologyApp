import { Model } from "./model";
import { View } from "./view";
const scrollBar = {
    init(settings){
        const scrollBarID = 'scrollbar';
        const progressBarID = 'progressBar';
        const defSetting = {
            scrollbar : {
                top : '0',
                left : '0',
                background : 'white',
                width : "100%",
                height : '4px'
            },
            progressbar : {
                background : 'red',
                height : '100%',
                width : '0' ,
            }
        };
        const userSetting = settings ? settings : defSetting; 

        // 
        const scrollEvent = Model.scrollEvent;
        const drawScrollBar = View.drawScrollBar;
        const windowBiggerDoc = Model.filledProgressBar();
        //
        const bar = drawScrollBar( userSetting , scrollEvent, scrollBarID , progressBarID);
        //
        document.body.append(bar);
        if(windowBiggerDoc){
            const progressBar = document.getElementById(progressBarID);
            progressBar.style.width = '100%';
        }
    }
}

export default scrollBar;